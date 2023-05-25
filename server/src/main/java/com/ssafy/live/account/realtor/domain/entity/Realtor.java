package com.ssafy.live.account.realtor.domain.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.live.account.common.domain.Member;
import com.ssafy.live.account.realtor.controller.dto.RealtorRequest.Update;
import com.ssafy.live.consulting.domain.entity.Consulting;
import com.ssafy.live.contract.domain.entity.Contract;
import com.ssafy.live.house.domain.entity.Item;
import com.ssafy.live.notice.domain.entity.Notice;
import com.ssafy.live.review.domain.entity.Review;
import java.text.NumberFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;
import javax.persistence.AttributeOverride;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Getter
@SuperBuilder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AttributeOverride(name = "no", column = @Column(name = "realtor_no"))
@Entity
public class Realtor extends Member implements UserDetails {

    @Column(name = "business_number")
    private String businessNumber;
    private String corp;
    @Column(name = "registration_number")
    private String registrationNumber;
    private String description;
    @Column(name = "business_address")
    private String businessAddress;
    @Column(name = "start_date")
    private LocalDate startDate;
    @Column(name = "rating_score")
    @Builder.Default
    private float ratingScore = (float) 0;

    @JsonIgnore
    @Column
    @ElementCollection(fetch = FetchType.EAGER)
    @Builder.Default
    private List<String> roles = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "realtor", cascade = CascadeType.ALL)
    @Builder.Default
    private List<Consulting> consultings = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "realtor", cascade = CascadeType.ALL)
    @Builder.Default
    private List<Contract> contracts = new ArrayList<>();

    @OneToMany(mappedBy = "realtor", cascade = CascadeType.ALL)
    @Builder.Default
    private List<Review> reviews = new ArrayList<>();

    @OneToMany(mappedBy = "realtor", cascade = CascadeType.ALL)
    @Builder.Default
    private List<Notice> notices = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "realtor", cascade = CascadeType.ALL)
    @Builder.Default
    private List<Item> items = new ArrayList<>();

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.roles.stream()
            .map(SimpleGrantedAuthority::new)
            .collect(Collectors.toList());
    }

    @Override
    public String getUsername() {
        return businessNumber;
    }

    @Override
    public boolean isAccountNonExpired() {
        return false;
    }

    @Override
    public boolean isAccountNonLocked() {
        return false;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public void updateRealtor(Update request, String password, String imgSrc) {
        super.updateInformation(password, request.getPhone(), request.getEmail(), imgSrc);
        this.description = request.getDescription();
    }

    public void updateRatingScore(Long count, float ratingScore) {
        this.ratingScore = cutDemical(1,
            ((this.ratingScore * (count - 1)) + ratingScore) / (float) count);
    }

    private float cutDemical(int cutSize, float value) {
        NumberFormat nf = NumberFormat.getNumberInstance();
        nf.setMaximumFractionDigits(cutSize);
        nf.setGroupingUsed(false);
        return Float.parseFloat(nf.format(value));
    }
}
