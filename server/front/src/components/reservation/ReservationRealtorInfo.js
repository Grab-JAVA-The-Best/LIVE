import { useState } from "react";
import ListBox from "../../UI/ListBox";
import ReviewCardContent from "../ReviewCardContent";

import classes from "./ReservationRealtorInfo.module.scss";
import { FiMapPin } from "react-icons/fi";
import { BsTelephone } from "react-icons/bs";
import { RealtorHousesCardContent } from "../HouseCardContent";

const ReservationRealtorInfo = ({ realtorDetail, addItemHandler }) => {
  const realtorInfo = realtorDetail.realtorInfo;
  const reviewsList = realtorDetail.reviewsList;

  return (
    <>
      <div className={classes.realtorInfoContainer}>
        <div className={classes.realtorUpper}>
          <div>
            <img src={realtorInfo.imageSrc} alt="중개사 리스트" />
          </div>
          <div className={classes.mainDescription}>
            <h3> {realtorInfo.corp} </h3>
            <p className={classes.name}>
              {realtorInfo.name} <span>공인중개사</span>
            </p>
            <p className={classes.description}>{realtorInfo.description}</p>
            <p className={classes.businessAddress}>
              <FiMapPin />
              <span>{realtorInfo.businessAddress}</span>
            </p>
            <p className={classes.phone}>
              <BsTelephone />
              <span>{realtorInfo.phone}</span>
            </p>
          </div>
        </div>
        <div className={classes.realtorItemBox}>
          <h3>매물 목록</h3>
          <div className={classes.realtorItems}>
            {realtorDetail.itemsList?.length ? (
              <ListBox dataArray={realtorDetail.itemsList}>
                <RealtorHousesCardContent addItemHandler={addItemHandler} />
              </ListBox>
            ) : (
              <p>현재 거래 가능한 매물이 없습니다!</p>
            )}
          </div>
        </div>
        <div className={classes.reviewListBoxContainer}>
          <div className={classes.reviewListBox}>
            <h3>리뷰 수 {reviewsList.length}건</h3>
            <div className={classes.reviewLists}>
              {reviewsList?.length ? (
                <>
                  <ListBox dataArray={reviewsList}>
                    <ReviewCardContent />
                  </ListBox>
                </>
              ) : (
                <p>현재 조회 가능한 리뷰가 없습니다!</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReservationRealtorInfo;
