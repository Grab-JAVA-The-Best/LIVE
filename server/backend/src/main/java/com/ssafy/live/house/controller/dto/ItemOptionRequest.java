package com.ssafy.live.house.controller.dto;

import com.ssafy.live.house.domain.entity.ItemOption;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class ItemOptionRequest {

    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    @AllArgsConstructor(access = AccessLevel.PROTECTED)
    public static class ItemOptionRegistRequest {

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


        public ItemOption toEntity(Long itemNo) {
            return ItemOption.builder()
                .itemNo(itemNo)
                .bed(bed)
                .washingMachine(washingMachine)
                .airConditioner(airConditioner)
                .desk(desk)
                .closet(closet)
                .sink(sink)
                .cctv(cctv)
                .diningTable(diningTable)
                .sofa(sofa)
                .shoeRack(shoeRack)
                .refrigerator(refrigerator)
                .dryingMachine(dryingMachine)
                .bathtub(bathtub)
                .bidet(bidet)
                .dishwasher(dishwasher)
                .gasStove(gasStove)
                .inductionCooktop(inductionCooktop)
                .microwave(microwave)
                .oven(oven)
                .guard(guard)
                .intercom(intercom)
                .keycard(keycard)
                .elevator(elevator)
                .fireAlarm(fireAlarm)
                .veranda(veranda)
                .terrace(terrace)
                .garden(garden)
                .parkingLot(parkingLot)
                .build();
        }

    }


}
