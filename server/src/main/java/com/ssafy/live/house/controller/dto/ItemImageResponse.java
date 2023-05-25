package com.ssafy.live.house.controller.dto;

import com.ssafy.live.house.domain.entity.ItemImage;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class ItemImageResponse {

    private Long itemImageNo;
    private String imageSrc;

    public static ItemImageResponse toDto(ItemImage itemImage) {
        return ItemImageResponse.builder()
            .itemImageNo(itemImage.getNo())
            .imageSrc(itemImage.getImageSrc())
            .build();
    }
}
