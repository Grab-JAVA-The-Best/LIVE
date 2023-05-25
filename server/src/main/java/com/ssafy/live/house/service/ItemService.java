package com.ssafy.live.house.service;

import static com.ssafy.live.common.exception.ErrorCode.ITEM_NOT_FOUND;
import static com.ssafy.live.common.exception.ErrorCode.REALTOR_NOT_FOUND;
import static com.ssafy.live.common.exception.ErrorCode.USER_MISMATCH;

import com.ssafy.live.account.common.service.S3Service;
import com.ssafy.live.account.realtor.domain.entity.Realtor;
import com.ssafy.live.account.realtor.domain.repository.RealtorRepository;
import com.ssafy.live.common.domain.Response;
import com.ssafy.live.common.exception.BadRequestException;
import com.ssafy.live.house.controller.dto.ItemRequest;
import com.ssafy.live.house.controller.dto.ItemResponse;
import com.ssafy.live.house.domain.entity.House;
import com.ssafy.live.house.domain.entity.Item;
import com.ssafy.live.house.domain.entity.ItemImage;
import com.ssafy.live.house.domain.entity.ItemOption;
import com.ssafy.live.house.domain.repository.HouseRepository;
import com.ssafy.live.house.domain.repository.ItemImageRepository;
import com.ssafy.live.house.domain.repository.ItemRepository;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@Service
@RequiredArgsConstructor
public class ItemService {

    private final ItemImageRepository itemImageRepository;

    private final S3Service s3Service;
    private final Response response;
    private final ItemRepository itemRepository;
    private final HouseRepository houseRepository;
    private final RealtorRepository realtorRepository;

    public ResponseEntity<?> registItem(UserDetails user,
        ItemRequest.ItemRegistRequest itemRegistRequest, List<MultipartFile> files)
        throws IOException {
        Realtor realtor = realtorRepository.findByBusinessNumber(user.getUsername())
            .orElseThrow(() -> new BadRequestException(REALTOR_NOT_FOUND));

        Long houseNo = 0L;
        House house = null;
        houseNo = itemRegistRequest.getHouse().getHouseNo();
        if (houseNo != null) {
            house = houseRepository.findById(houseNo).orElse(null);
        }
        if (house == null) {
            house = itemRegistRequest.getHouse().toEntity();
            houseRepository.save(house);
        }

        Item item = itemRegistRequest.toEntity(realtor, house);
        ItemOption itemOption = itemRegistRequest.getItemOption().toEntity(item.getNo());
        itemOption.setItem(item);
        item.setOption(itemOption);

        List<ItemImage> itemImages = new ArrayList<>();
        for (MultipartFile file : files) {
            String imageSrc = s3Service.upload(file);
            ItemImage itemImage = ItemImage.builder()
                .item(item)
                .imageSrc(imageSrc)
                .build();
            itemImages.add(itemImage);
        }
        item.setItemImages(itemImages);

        itemRepository.save(item);
        return response.success("매물이 등록되었습니다.", HttpStatus.OK);
    }

    public ResponseEntity<?> findItemDetail(Long itemNo) {
        Item item = itemRepository.findById(itemNo)
            .orElseThrow(() -> new BadRequestException(ITEM_NOT_FOUND));

        ItemResponse.ItemDetailResponse itemDetailResponse = ItemResponse.ItemDetailResponse.toDto(
            item);
        return response.success(itemDetailResponse, "매물 상세 정보가 조회되었습니다.", HttpStatus.OK);
    }

    public ResponseEntity<?> updateItemDetail(UserDetails user,
        ItemRequest.ItemUpdateRequest itemUpdateRequest, List<MultipartFile> files)
        throws IOException {
        Realtor realtor = realtorRepository.findByBusinessNumber(user.getUsername())
            .orElseThrow(() -> new BadRequestException(REALTOR_NOT_FOUND));

        Item item = itemRepository.findById(itemUpdateRequest.getItemNo())
            .orElseThrow(() -> new BadRequestException(ITEM_NOT_FOUND));

        if (item.getRealtor().getNo() != realtor.getNo()) {
            throw new BadRequestException(USER_MISMATCH);
        }

        Item updatedItem = itemUpdateRequest.toEntity();
        updatedItem.setRealtor(realtor);

        updatedItem.setHouse(item.getHouse());
        updatedItem.getHouse().setContracted(itemUpdateRequest.isContracted());

        List<ItemImage> itemImages = itemImageRepository.findByItemNo(item.getNo());
        List<ItemImage> newImages = new ArrayList<>();
        Set<Long> newImageNoSet = itemUpdateRequest.getItemImages();
        for (ItemImage img : itemImages) {
            if (!newImageNoSet.contains(img.getNo())) {
                s3Service.deleteFile(img.getImageSrc());
                itemImageRepository.deleteById(img.getNo());
            } else {
                newImages.add(img);
            }
        }

        for (MultipartFile file : files) {
            if (!file.isEmpty()) {
                String imageSrc = s3Service.upload(file);
                ItemImage itemImage = ItemImage.builder()
                    .item(item)
                    .imageSrc(imageSrc)
                    .build();
                newImages.add(itemImage);
            }
        }
        updatedItem.setItemImages(newImages);

        itemRepository.save(updatedItem);
        return response.success("매물 정보가 수정되었습니다.", HttpStatus.OK);
    }

    public ResponseEntity<?> itemsByBuildingName(UserDetails user,
        ItemRequest.ItemsByBuildingName request) {
        Realtor realtor = realtorRepository.findByBusinessNumber(user.getUsername())
            .orElseThrow(() -> new BadRequestException(REALTOR_NOT_FOUND));

        List<ItemResponse.ItemSimpleResponse> itemList = itemRepository.findByRealtorLikeBuildingName(
                request.getWord(), realtor.getNo(), request.getRegionCode())
            .stream()
            .map(ItemResponse.ItemSimpleResponse::toDto)
            .collect(Collectors.toList());
        return response.success(itemList, "매물 목록이 조회되었습니다.", HttpStatus.OK);
    }

    public ResponseEntity<?> findItemsByRealtor(UserDetails user) {

        Realtor realtor = realtorRepository.findByBusinessNumber(user.getUsername())
            .orElseThrow(() -> new BadRequestException(REALTOR_NOT_FOUND));

        List<ItemResponse.ItemSimpleResponse> itemList = itemRepository.findByRealtor(realtor.getNo())
            .stream()
            .map(ItemResponse.ItemSimpleResponse::toDto)
            .collect(Collectors.toList());

        return response.success(itemList, "매물 목록이 조회되었습니다.", HttpStatus.OK);
    }
}
