package com.ssafy.live.house.domain.repository;

import com.ssafy.live.house.domain.entity.Item;
import java.util.Collection;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {

    @Query(value = "SELECT i.* from item i "
        + "inner join house h on h.house_no=i.house_no "
        + "inner join realtor r on r.realtor_no=i.realtor_no "
        + "WHERE h.building_name LIKE %:word% "
        + "AND h.region_code LIKE :regionCode% "
        + "AND h.contracted = false "
        + "AND r.realtor_no=:realtorNo", nativeQuery = true)
    List<Item> findByRealtorLikeBuildingName(String word, Long realtorNo, String regionCode);

    @Query(value = "SELECT i.* FROM item i " +
        "INNER JOIN house h ON h.house_no=i.house_no " +
        "WHERE i.realtor_no = :realtorNo " +
        "AND h.region_code LIKE :regionCode% " +
        "AND h.contracted = false " +
        "ORDER BY i.created_date DESC", nativeQuery = true)
    List<Item> findByRealtorAndRegionCode(Long realtorNo, String regionCode);
    @Query(value = "SELECT i.* FROM item i " +
        "INNER JOIN house h ON h.house_no=i.house_no " +
        "WHERE i.realtor_no = :realtorNo " +
        "AND h.contracted = false " +
        "ORDER BY i.created_date DESC", nativeQuery = true)
    List<Item> findByRealtor(Long realtorNo);
}
