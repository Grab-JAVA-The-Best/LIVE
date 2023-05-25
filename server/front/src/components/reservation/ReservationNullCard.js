import ListBox from "../../UI/ListBox";
import { ReservationHouseCardContent } from "../HouseCardContent";
import classes from "./ReservationNullCard.module.scss";

const ReservationNullCard = ({ selectedItems, removeItemHandler }) => {
  if (selectedItems.length === 0) {
    return <div className={classes.itemEmptyContainer}>현재 조회된 공인중개사가 없습니다</div>;
  }
  return (
    <ListBox dataArray={selectedItems} direction={true} toStart={true}>
      <ReservationHouseCardContent removeItemHandler={removeItemHandler} />
    </ListBox>
  );
};

export default ReservationNullCard;
