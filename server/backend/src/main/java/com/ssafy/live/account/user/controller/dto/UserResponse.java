package com.ssafy.live.account.user.controller.dto;

import com.ssafy.live.account.user.domain.entity.Users;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class UserResponse {

    @Getter
    @Builder
    @AllArgsConstructor
    public static class Update {

        private String phone;
        private String email;
        private String imageSrc;
        private String region;

        public static UserResponse.Update toDto(Users user) {
            return Update.builder()
                .phone(user.getPhone())
                .email(user.getEmail())
                .imageSrc(user.getImageSrc())
                .region(user.getRegion())
                .build();
        }
    }

    @Builder
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class FindDetail {

        private String id;
        private String name;
        private String email;
        private String phone;
        private String region;
        private String gender;
        private float score;
        private String imageSrc;
        private Long count;

        public static UserResponse.FindDetail toResponse(Users user, Long count) {
            return FindDetail.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .region(user.getRegion())
                .gender(user.getGender())
                .score(user.getScore())
                .imageSrc(user.getImageSrc())
                .count(count)
                .build();
        }
    }
}
