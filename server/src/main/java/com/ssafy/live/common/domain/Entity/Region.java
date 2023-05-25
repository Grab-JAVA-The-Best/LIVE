package com.ssafy.live.common.domain.Entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Region {

    @Id
    @Column(name = "region_code")
    private String regionCode;

    @Column(name = "sido_name")
    private String sidoName;

    @Column(name = "gugun_name")
    private String gugunName;

    @Column(name = "dong_name")
    private String dongName;
}
