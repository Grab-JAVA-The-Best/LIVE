package com.ssafy.live.account.user.service;

import com.ssafy.live.account.auth.jwt.JwtTokenProvider;
import com.ssafy.live.account.auth.security.SecurityUtil;
import com.ssafy.live.account.common.domain.Authority;
import com.ssafy.live.account.common.dto.CommonResponse;
import com.ssafy.live.account.common.service.EmailService;
import com.ssafy.live.account.common.service.S3Service;
import com.ssafy.live.account.user.controller.dto.UserRequest;
import com.ssafy.live.account.user.controller.dto.UserRequest.FindPassword;
import com.ssafy.live.account.user.controller.dto.UserRequest.IdDuplcate;
import com.ssafy.live.account.user.controller.dto.UserRequest.Update;
import com.ssafy.live.account.user.controller.dto.UserResponse;
import com.ssafy.live.account.user.domain.entity.Users;
import com.ssafy.live.account.user.domain.repository.UsersRepository;
import com.ssafy.live.common.domain.Response;
import com.ssafy.live.common.domain.SMSContent;
import com.ssafy.live.common.service.SMSService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Collections;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Slf4j
@RequiredArgsConstructor
@Service
public class UserService {

    private final UsersRepository usersRepository;
    private final PasswordEncoder passwordEncoder;
    private final Response response;
    private final JwtTokenProvider jwtTokenProvider;
    private final RedisTemplate redisTemplate;
    private final EmailService emailService;
    private final S3Service s3Service;
    private final AuthenticationManager authenticationManager;
    private final SMSService smsService;

    public ResponseEntity<?> signUp(UserRequest.SignUp signUp, MultipartFile file)
            throws IOException {
        if (usersRepository.existsById(signUp.getId())) {
            return response.fail("이미 회원가입된 아이디입니다.", HttpStatus.BAD_REQUEST);
        }
        String imgSrc = s3Service.upload(file);
        usersRepository.save(UserRequest.SignUp.toEntity(signUp, passwordEncoder.encode(signUp.getPassword()),  imgSrc));

        smsService.sendSMS(users.getName()+"님 " + SMSContent.NEW_USER.getMessage(), users.getPhone());
        return response.success("회원가입에 성공했습니다.");
    }

    public ResponseEntity<?> login(UserRequest.Login login) {
        Users users = usersRepository.findById(login.getId()).get();
        if (users == null) {
            return response.fail("해당하는 유저가 존재하지 않습니다.", HttpStatus.BAD_REQUEST);
        }
        if(!login.getPassword().equals(users.getPassword())) {
            return response.fail("비밀번호가 일치하지 않습니다.", HttpStatus.BAD_REQUEST);
        }

        UsernamePasswordAuthenticationToken authenticationToken = login.toAuthentication();
        Authentication authentication = authenticationManager.authenticate(authenticationToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        CommonResponse.TokenInfo tokenInfo = jwtTokenProvider.generateToken(authentication);

        redisTemplate.opsForValue()
                .set("RT:" + authentication.getName(), tokenInfo.getRefreshToken(), tokenInfo.getRefreshTokenExpirationTime(), TimeUnit.MILLISECONDS);
        return response.success(tokenInfo, "로그인에 성공했습니다.", HttpStatus.OK);
    }

    public ResponseEntity<?> logout(Authentication authentication) {
        if (redisTemplate.opsForValue().get("RT:" + authentication.getName()) != null) {
            redisTemplate.delete("RT:" + authentication.getName());
        }
//        Long expiration = jwtTokenProvider.getExpiration(logout.getAccessToken());
//        redisTemplate.opsForValue()
//                .set(logout.getAccessToken(), "logout", expiration, TimeUnit.MILLISECONDS);
        return response.success("로그아웃 되었습니다.");
    }

    public ResponseEntity<?> findUserDetail(UserDetails user) {
        Users users = usersRepository.findById(user.getUsername()).get();
//                .orElseThrow(()-> new BadRequestException(USER_NOT_FOUND));
        UserResponse.FindDetail detail = UserResponse.FindDetail.toDto(users);
        return response.success(detail, "회원 정보를 조회하였습니다.", HttpStatus.OK);
    }

    public ResponseEntity<?> withdrawal(UserDetails user) {
        Users users = usersRepository.findById(user.getUsername()).get();
        if(users == null) {
            return response.fail("해당하는 회원을 찾을 수 없습니다.", HttpStatus.BAD_REQUEST);
        }
        usersRepository.deleteById(users.getNo());
        return response.success("회원탈퇴 되었습니다.");
    }

    public ResponseEntity<?> temporaryPassword(FindPassword request) {
        Users users = usersRepository.findByEmailAndId(request.getEmail(), request.getId());
        if(users == null) {
            return response.fail("해당하는 사용자 정보를 찾을 수 없습니다.", HttpStatus.BAD_REQUEST);
        }
        String temporaryPwd = users.generateRandomPassword();
        users.updatePassword(passwordEncoder.encode(temporaryPwd));
        usersRepository.save(users);
        emailService.joinEmail(users.getEmail(), temporaryPwd, users.getName());
        return response.success("비밀번호 찾기 이메일을 전송하였습니다.", HttpStatus.OK);
    }

    public ResponseEntity<?> idDuplicate(IdDuplcate idDuplcate) {
        if(usersRepository.existsById(idDuplcate.getId())) {
            return response.success(false, "이미 사용 중인 아이디입니다.", HttpStatus.OK);
        }
        return response.success(true, "사용 가능한 아이디입니다.", HttpStatus.OK);
    }

    public ResponseEntity<?> updateUser(UserDetails user, Update request, MultipartFile file) throws IOException {
        Users users = usersRepository.findById(user.getUsername()).get();
        if(users == null) {
            return response.fail("해당하는 사용자를 찾을 수 없습니다.", HttpStatus.BAD_REQUEST);
        }
        String preImg = users.getImageSrc();
        if(file != null) {
            s3Service.deleteFile(preImg);
        }
        String imgSrc = s3Service.upload(file);
        users.updateUser(request, passwordEncoder.encode(request.getPassword()), imgSrc);
        usersRepository.save(users);
        UserResponse.Update updateUser = UserResponse.Update.builder()
            .phone(users.getPhone())
            .email(users.getEmail())
            .imageSrc(users.getImageSrc())
            .region(users.getRegion())
            .build();
        return response.success(updateUser, "회원 정보 수정을 완료했습니다.", HttpStatus.OK);
    }

    public ResponseEntity<?> reissue(UserRequest.Reissue reissue) {
        if (!jwtTokenProvider.validateToken(reissue.getRefreshToken())) {
            return response.fail("Refresh Token 정보가 유효하지 않습니다.", HttpStatus.BAD_REQUEST);
        }

        Authentication authentication = jwtTokenProvider.getAuthentication(reissue.getAccessToken());
        String refreshToken = (String)redisTemplate.opsForValue().get("RT:" + authentication.getName());

        if(ObjectUtils.isEmpty(refreshToken)) {
            return response.fail("잘못된 요청입니다.", HttpStatus.BAD_REQUEST);
        }

        if(!refreshToken.equals(reissue.getRefreshToken())) {
            return response.fail("Refresh Token 정보가 일치하지 않습니다.", HttpStatus.BAD_REQUEST);
        }

        CommonResponse.TokenInfo tokenInfo = jwtTokenProvider.generateToken(authentication);

        redisTemplate.opsForValue()
                .set("RT:" + authentication.getName(), tokenInfo.getRefreshToken(), tokenInfo.getRefreshTokenExpirationTime(), TimeUnit.MILLISECONDS);

        return response.success(tokenInfo, "Token 정보가 갱신되었습니다.", HttpStatus.OK);
    }

    public ResponseEntity<?> authority() {
        String userId = SecurityUtil.getCurrentUserId();
        Users users = usersRepository.findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("No authentication information."));

        // add ROLE_USER
        users.getRoles().add(Authority.USER.name());
        usersRepository.save(users);

        return response.success();
    }
}
