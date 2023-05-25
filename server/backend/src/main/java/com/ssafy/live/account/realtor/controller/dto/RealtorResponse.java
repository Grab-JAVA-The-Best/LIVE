package com.ssafy.live.account.realtor.controller.dto;

import com.ssafy.live.account.realtor.domain.entity.Realtor;
import com.ssafy.live.review.domain.entity.Review;
import java.time.LocalDateTime;
import java.util.List;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class RealtorResponse {

    @Builder
    @Getter
    @AllArgsConstructor
    public static class TokenInfo {

        private String grantType;
        private String accessToken;
        private String refreshToken;
        private Long refreshTokenExpirationTime;
    }

    @Getter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class UpdateRealtor {

        private String name;
        private String email;
        private String phone;
        private String description;
        private String imageSrc;

        public static RealtorResponse.UpdateRealtor toDTO(Realtor realtor) {
            return UpdateRealtor.builder()
                .name(realtor.getName())
                .email(realtor.getEmail())
                .phone(realtor.getPhone())
                .description(realtor.getDescription())
                .imageSrc(realtor.getImageSrc())
                .build();
        }
    }

    @Builder
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class FindByRegion {

        private Long realtorNo;
        private String name;
        private String phone;
        private String corp;
        private String description;
        private String businessAddress;
        private float ratingScore;
        private String imageSrc;

        public static RealtorResponse.FindByRegion toEntity(Realtor realtor) {
            return RealtorResponse.FindByRegion.builder()
                .realtorNo(realtor.getNo())
                .name(realtor.getName())
                .phone(realtor.getPhone())
                .corp(realtor.getCorp())
                .description(realtor.getDescription())
                .businessAddress(realtor.getBusinessAddress())
                .ratingScore(realtor.getRatingScore())
                .imageSrc(realtor.getImageSrc())
                .build();
        }
    }

    @Builder
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class FindDetail {

        private String name;
        private String email;
        private String phone;
        private String description;
        private float ratingScore;
        private String businessAddress;
        private String imageSrc;

        public static RealtorResponse.FindDetail toEntity(Realtor realtor) {
            return FindDetail.builder()
                .name(realtor.getName())
                .email(realtor.getEmail())
                .phone(realtor.getPhone())
                .description(realtor.getDescription())
                .imageSrc(realtor.getImageSrc())
                .businessAddress(realtor.getBusinessAddress())
                .ratingScore(realtor.getRatingScore())
                .build();
        }
    }

    @Builder
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class FindAllDetail {

        private RealtorInfo realtorInfo;
        private List<Items> itemsList;
        private List<Reviews> reviewsList;

        @Getter
        @Builder
        public static class RealtorInfo {

            private Long no;
            private String name;
            private String email;
            private String phone;
            private String imageSrc;
            private String businessNumber;
            private String corp;
            private String registrationNumber;
            private String description;
            private String businessAddress;

            private static RealtorInfo toEntity(Realtor realtor) {
                return RealtorInfo.builder()
                    .no(realtor.getNo())
                    .name(realtor.getName())
                    .email(realtor.getEmail())
                    .phone(realtor.getPhone())
                    .imageSrc(realtor.getImageSrc())
                    .businessNumber(realtor.getBusinessNumber())
                    .businessAddress(realtor.getBusinessAddress())
                    .corp(realtor.getCorp())
                    .registrationNumber(realtor.getRegistrationNumber())
                    .description(realtor.getDescription())
                    .build();
            }
        }

        @Getter
        @Builder
        public static class Items {

            private Long itemNo;
            private String imageSrc;
            private int deposit;
            private int monthlyRent;
            private String address;
            private int floor;
            private String buildingName;
            private float exclusivePrivateArea;

            public static Items toEntity(RealtorByRegionProjectionInterface item) {
                return Items.builder()
                    .itemNo(item.getItemNo())
                    .imageSrc(item.getImageSrc())
                    .deposit(item.getDeposit())
                    .monthlyRent(item.getRent())
                    .address(item.getAddress())
                    .floor(item.getFloor())
                    .buildingName(item.getBuildingName())
                    .exclusivePrivateArea(item.getArea())
                    .build();
            }
        }

        @Getter
        @Builder
        public static class Reviews {

            private Long reviewNo;
            private String reviewInfo;
            private float ratingScore;
            private LocalDateTime createDate;
            private String userName;

            public static Reviews toEntity(Review review) {
                return Reviews.builder()
                    .reviewNo(review.getNo())
                    .reviewInfo(review.getReviewInfo())
                    .ratingScore(review.getRatingScore())
                    .createDate(review.getCreatedDate())
                    .userName(review.getUsers().getName())
                    .build();
            }
        }

        public static FindAllDetail toResponse(Realtor realtor, List<Items> itemsList,
            List<Reviews> reviewsList) {
            return RealtorResponse.FindAllDetail.builder()
                .realtorInfo(RealtorInfo.toEntity(realtor))
                .itemsList(itemsList)
                .reviewsList(reviewsList)
                .build();
        }
    }
}
