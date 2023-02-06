package com.ssafy.live.house.domain.repository;

import com.ssafy.live.house.domain.entity.ItemImage;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemImageRepository extends JpaRepository<ItemImage, Long> {

    List<ItemImage> findAllByItemNo(Long no);
    List<ItemImage> findTop1ByItemNo(Long no);

}