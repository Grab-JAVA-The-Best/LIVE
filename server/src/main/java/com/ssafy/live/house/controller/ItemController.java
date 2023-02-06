package com.ssafy.live.house.controller;

import com.ssafy.live.house.controller.dto.ItemRequest;
import com.ssafy.live.account.common.error.ErrorHandler;
import com.ssafy.live.house.controller.dto.ItemDto;
import com.ssafy.live.house.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/items")
public class ItemController {

    private final ItemService itemService;
    @PostMapping("")
    private ResponseEntity<?> registItem(
            @RequestPart(value = "ItemRegistRequest") ItemRequest.ItemRegistRequest itemRegistRequest,
            @RequestPart(value = "files") List<MultipartFile> files) throws IOException {
        return itemService.registItem(itemRegistRequest, files);
    }

    @GetMapping("/{itemNo}")
    private ResponseEntity<?> inquiryItemDetail(@PathVariable Long itemNo){
        return itemService.findItemDetail(itemNo);
    }

    @PutMapping("/{itemNo}")
    private ResponseEntity<?> updateItemDetail(
            @RequestPart ItemRequest.ItemUpdateRequest itemUpdateRequest,
            @RequestPart List<MultipartFile> files) throws IOException {
        return itemService.updateItemDetail(itemUpdateRequest, files);
    }

    @GetMapping("/regions")
    public ResponseEntity<?> itemsByBuildingName(@RequestBody ItemDto.ItemsByBuildingName request, Errors errors)  {
        return itemService.itemsByBuildingName(request);
    }
}