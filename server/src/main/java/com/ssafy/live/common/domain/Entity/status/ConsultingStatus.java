package com.ssafy.live.common.domain.Entity.status;

import com.amazonaws.services.kms.model.NotFoundException;
import java.util.Arrays;
import lombok.Getter;

@Getter
public enum ConsultingStatus {

    RESERVERVATION_PROCESSING(0),
    REALTOR_RESPONSE_COMPLETE(1),
    CONSULTING_CONFIRMED(2),
    CONSULTING_PROCESSING(3),
    CONSULTING_PAST(4),
    CONSULTING_CANCLED(5);
    private final int value;

    public static ConsultingStatus[] setStatus(int status) {
        if (status == 0) {
            return new ConsultingStatus[]{RESERVERVATION_PROCESSING, REALTOR_RESPONSE_COMPLETE};
        } else if (status == 1) {
            return new ConsultingStatus[]{CONSULTING_CONFIRMED, CONSULTING_PROCESSING};
        } else {
            return new ConsultingStatus[]{CONSULTING_PAST, CONSULTING_CANCLED};
        }
    }

    ConsultingStatus(int value) {
        this.value = value;
    }

    public static ConsultingStatus ofValue(int value) {
        return Arrays.stream(ConsultingStatus.values())
            .filter(v -> v.getValue() == value)
            .findAny()
            .orElseThrow(
                () -> new NotFoundException(String.format("상태코드에 [%s]가 존재하지 않습니다.", value)));
    }
}
