package com.ssafy.live.account.user.controller.dto;

import com.ssafy.live.account.common.domain.Authority;
import com.ssafy.live.account.user.domain.entity.Users;
import java.util.Collections;
import javax.validation.constraints.NotEmpty;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

public class UserRequest {

    @Getter
    @Setter
    public static class SignUp {

        @NotEmpty(message = "아이디는 필수 입력값입니다.")
        private String id;
        @NotEmpty(message = "비밀번호는 필수 입력값입니다.")
        private String password;
        @NotEmpty(message = "이메일은 필수 입력값입니다.")
        private String email;
        private String name;
        private String phone;
        private String region;
        private String gender;
        private String imageSrc;

        public static Users toEntity(UserRequest.SignUp signUp, String password, String imageSrc) {
            return Users.builder()
                .id(signUp.getId())
                .password(password)
                .name(signUp.getName())
                .email(signUp.getEmail())
                .phone(signUp.getPhone())
                .region(signUp.getRegion())
                .gender(signUp.getGender())
                .imageSrc(imageSrc)
                .roles(Collections.singletonList(Authority.USER.name()))
                .build();
        }
    }

    @Getter
    @Setter
    public static class Login {

        @NotEmpty(message = "아이디는 필수 입력값입니다.")
        private String id;
        @NotEmpty(message = "비밀번호는 필수 입력값입니다.")
        private String password;

        public UsernamePasswordAuthenticationToken toAuthentication() {
            return new UsernamePasswordAuthenticationToken(id, password);
        }
    }

    @Getter
    @Setter
    public static class Reissue {

        @NotEmpty(message = "accessToken 을 입력해주세요.")
        private String accessToken;
        @NotEmpty(message = "refreshToken 을 입력해주세요.")
        private String refreshToken;
    }

    @Getter
    @Setter
    public static class Logout {

        @NotEmpty(message = "잘못된 요청입니다.")
        private String accessToken;
        @NotEmpty(message = "잘못된 요청입니다.")
        private String refreshToken;
    }

    @Getter
    @Setter
    public static class withdrawl {

        @NotEmpty(message = "해당하는 user_no가 없습니다.")
        private Long no;
    }

    @Getter
    @Setter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class Update {

        private String phone;
        private String password;
        private String email;
        private String region;
        private String imageSrc;
    }

    @Getter
    @Builder
    @AllArgsConstructor(access = AccessLevel.PROTECTED)
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class FindPassword {

        private String id;
        private String email;
    }

    @Getter
    @Builder
    @AllArgsConstructor(access = AccessLevel.PROTECTED)
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class IdDuplcate {

        private String id;
    }
}
