package com.ssafy.live.house.controller;

import com.ssafy.live.house.controller.dto.ItemRequest;
import com.ssafy.live.house.service.ItemService;
import java.io.IOException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@RestController
@RequestMapping("/items")
public class ItemController {

    private final ItemService itemService;

    @PostMapping
    private ResponseEntity<?> registItem(
        Authentication authentication,
        @RequestPart ItemRequest.ItemRegistRequest itemRegistRequest,
        @RequestPart(value = "files", required = false) List<MultipartFile> files) throws IOException {
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        return itemService.registItem(principal, itemRegistRequest, files);
    }

    @GetMapping("/{itemNo}")
    private ResponseEntity<?> findItemDetail(@PathVariable Long itemNo) {
        return itemService.findItemDetail(itemNo);
    }

    @PutMapping("/{itemNo}")
    private ResponseEntity<?> updateItemDetail(
        Authentication authentication,
        @RequestPart ItemRequest.ItemUpdateRequest itemUpdateRequest,
        @RequestPart List<MultipartFile> files) throws IOException {
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        return itemService.updateItemDetail(principal, itemUpdateRequest, files);
    }

    @PostMapping("/regions")
    public ResponseEntity<?> itemsByBuildingName(Authentication authentication,
        @RequestBody ItemRequest.ItemsByBuildingName request) {
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        return itemService.itemsByBuildingName(principal, request);
    }

    @GetMapping("/realtor")
    public ResponseEntity<?> findItemsByRealtor(
        Authentication authentication
    ) {
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        return itemService.findItemsByRealtor(principal);
    }
}
