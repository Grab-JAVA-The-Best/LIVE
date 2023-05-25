package com.ssafy.live.review.service;

import static com.ssafy.live.common.exception.ErrorCode.REALTOR_NOT_FOUND;

import com.ssafy.live.account.realtor.domain.entity.Realtor;
import com.ssafy.live.account.realtor.domain.repository.RealtorRepository;
import com.ssafy.live.account.user.domain.entity.Users;
import com.ssafy.live.account.user.domain.repository.UsersRepository;
import com.ssafy.live.common.domain.Response;
import com.ssafy.live.common.exception.BadRequestException;
import com.ssafy.live.consulting.domain.entity.Consulting;
import com.ssafy.live.consulting.domain.repository.ConsultingRepository;
import com.ssafy.live.review.controller.dto.ReviewRequest;
import com.ssafy.live.review.controller.dto.ReviewResponse;
import com.ssafy.live.review.domain.entity.Review;
import com.ssafy.live.review.domain.repository.ReviewRepository;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final UsersRepository usersRepository;
    private final RealtorRepository realtorRepository;
    private final ConsultingRepository consultingRepository;
    private final Response response;

    public ResponseEntity<?> regist(ReviewRequest.Regist regist) {
        Realtor realtor = realtorRepository.findById(regist.getRealtorNo())
            .orElseThrow(() -> new BadRequestException(REALTOR_NOT_FOUND));
        Users users = usersRepository.findById(regist.getUserNo()).get();
        users.updateScore(5);
        usersRepository.save(users);
        Consulting consulting = consultingRepository.findById(regist.getConsultingNo()).get();
        reviewRepository.save(
            ReviewRequest.Regist.toEntity(realtor, users, consulting, regist.getReviewInfo(),
                regist.getRatingScore()));
        Long count = reviewRepository.countBy(realtor.getNo());
        realtor.updateRatingScore(count, regist.getRatingScore());
        realtorRepository.save(realtor);
        return response.success("리뷰를 등록하였습니다.", HttpStatus.OK);
    }

    public ResponseEntity<?> allReview(UserDetails user) {
        List<ReviewResponse.Reviews> list;
        List<Review> reviews;
        if (user.getAuthorities().contains(new SimpleGrantedAuthority("USER"))) {
            reviews = reviewRepository.findByUsersOrderByCreatedDateDesc(
                usersRepository.findById(user.getUsername()).get());
            list = reviews.stream()
                .map((review) -> ReviewResponse.Reviews.toEntity(review.getRealtor(), review))
                .collect(Collectors.toList());
        } else {
            reviews = reviewRepository.findByRealtorOrderByCreatedDateDesc(
                realtorRepository.findByBusinessNumber(user.getUsername()).get());
            list = reviews.stream()
                .map((review) -> ReviewResponse.Reviews.toEntity(review.getUsers(), review))
                .collect(Collectors.toList());
        }
        return response.success(list, "리뷰 목록을 조회하였습니다.", HttpStatus.OK);
    }
}
