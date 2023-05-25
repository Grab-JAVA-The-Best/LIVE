package com.ssafy.live.house.controller;

import com.ssafy.live.house.service.HouseService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/houses")
@Slf4j
public class HouseController {

    private final HouseService houseService;

    @GetMapping
    private ResponseEntity<?> findHouseByAddress(
        @RequestParam String address,
        @RequestParam String addressDetail) {
        return houseService.findHouseByAddress(address, addressDetail);
    }


}
