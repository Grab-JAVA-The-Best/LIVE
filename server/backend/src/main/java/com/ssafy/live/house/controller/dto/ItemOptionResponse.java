package com.ssafy.live.house.controller.dto;

import com.ssafy.live.house.domain.entity.ItemOption;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class ItemOptionResponse {

    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    @AllArgsConstructor(access = AccessLevel.PROTECTED)
    public static class ItemOptionDetailResponse {

        private Long itemNo;
        private boolean bed;
        private boolean washingMachine;
        private boolean airConditioner;
        private boolean desk;
        private boolean closet;
        private boolean sink;
        private boolean cctv;
        private boolean diningTable;
        private boolean sofa;
        private boolean shoeRack;
        private boolean refrigerator;
        private boolean dryingMachine;
        private boolean bathtub;
        private boolean bidet;
        private boolean dishwasher;
        private boolean gasStove;
        private boolean inductionCooktop;
        private boolean microwave;
        private boolean oven;
        private boolean guard;
        private boolean intercom;
        private boolean keycard;
        private boolean elevator;
        private boolean fireAlarm;
        private boolean veranda;
        private boolean terrace;
        private boolean garden;
        private boolean parkingLot;

        public static ItemOptionDetailResponse toDto(ItemOption itemOption) {
            return ItemOptionDetailResponse.builder()
                .itemNo(itemOption.getItemNo())
                .bed(itemOption.isBed())
                .washingMachine(itemOption.isWashingMachine())
                .airConditioner(itemOption.isAirConditioner())
                .desk(itemOption.isDesk())
                .closet(itemOption.isCloset())
                .sink(itemOption.isSink())
                .cctv(itemOption.isCctv())
                .diningTable(itemOption.isDiningTable())
                .sofa(itemOption.isSofa())
                .shoeRack(itemOption.isShoeRack())
                .refrigerator(itemOption.isRefrigerator())
                .dryingMachine(itemOption.isDryingMachine())
                .bathtub(itemOption.isBathtub())
                .bidet(itemOption.isBidet())
                .dishwasher(itemOption.isDishwasher())
                .gasStove(itemOption.isGasStove())
                .inductionCooktop(itemOption.isInductionCooktop())
                .microwave(itemOption.isMicrowave())
                .oven(itemOption.isOven())
                .guard(itemOption.isGuard())
                .intercom(itemOption.isIntercom())
                .keycard(itemOption.isKeycard())
                .elevator(itemOption.isElevator())
                .fireAlarm(itemOption.isFireAlarm())
                .veranda(itemOption.isVeranda())
                .terrace(itemOption.isTerrace())
                .garden(itemOption.isGarden())
                .parkingLot(itemOption.isParkingLot())
                .build();
        }

    }


}
