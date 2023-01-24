package com.ssafy.live.contract.domain.entity;

import com.ssafy.live.account.realtor.domain.entity.Realtor;
import com.ssafy.live.account.user.domain.entity.User;
import com.ssafy.live.common.domain.BaseEntity;
import com.ssafy.live.common.domain.ReservationStatus;
import com.ssafy.live.house.domain.entity.Item;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AttributeOverride(name = "no", column = @Column(name = "contract_no"))
@Entity
public class Contract extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    private Realtor realtor;

    @OneToOne(fetch = FetchType.LAZY)
    private Item item; // 단방향

    @Column(name = "move_on_date")
    private LocalDate moveOnDate;

    @Column(name = "number_of_residents")
    private int numberOfResidents;

    @Column(name = "request_datetime")
    private LocalDate requestDatetime;

    @Column(name = "contract_datetime")
    private LocalDate contractDatetime;

    @Column(name = "contract_state")
    private String contractState;

    @Column(name = "special_contract")
    private String specialContract;

    @Column(name = "tenant_address")
    private String tenantAddress;

    @Column(name = "tenant_age")
    private int tenantAge;

    private int commission;
}
