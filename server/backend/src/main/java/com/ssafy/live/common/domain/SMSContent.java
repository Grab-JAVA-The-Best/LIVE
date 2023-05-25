package com.ssafy.live.common.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum SMSContent {
    NEW_USER("가입을 축하드립니다."),
    NEW_CONSULTING("새로운 상담 예약이 접수되었습니다."),
    CONSULTING_CANCLED("상담 예약이 취소되었습니다."),
    CONSULTING_CHANGE("상담 정보가 변경되었습니다. 확인해주세요."),
    CONSULTING_START("Live 상담이 시작됩니다. 다음 링크로 입장해 주세요."),
    CONSULTING_CONFIRMED("상담 예약이 확정되었습니다."),
    TODAY_CONSULTING("금일 예약된 상담이 있습니다. 확인 후 상담을 진행해주세요."),
    CONSULTING_PROCESSING("중개사가 실시간 화상 상담실에 입장하였습니다. 서둘러 입장하셔서 좋은 방을 찾아보세요."),
    NEW_CONTRACT("새로운 계약 요청이 접수되었습니다."),
    CONTRACT_CANCEL("계약 요청이 취소되었습니다."),
    CONTRACT_UPDATE("계약 요청 정보가 수정되었습니다. 확인해주세요."),
    CONTRACT_SIGN("계약이 체결되었습니다.");

    private final String message;
}
