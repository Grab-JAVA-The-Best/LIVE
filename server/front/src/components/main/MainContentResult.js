import { useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiCoffeeTogo, BiRestaurant } from "react-icons/bi";
import { GiHairStrands } from "react-icons/gi";
import { MdLocalLaundryService } from "react-icons/md";
import { RiStore2Line } from "react-icons/ri";
import ListBox from "../../UI/ListBox";

import classes from "./MainContentResult.module.scss";
import MainContentResultIconBox from "./MainContentResultIconBox";

const settingData = [
  {
    icon: <BiCoffeeTogo />,
    name: "카  페",
    content: 300,
  },
  {
    icon: <RiStore2Line />,
    name: "편의점",
    content: 120,
  },
  {
    icon: <AiOutlineShoppingCart />,
    name: "마  트",
    content: 3,
  },
  {
    icon: <MdLocalLaundryService />,
    name: "세탁소",
    content: 30,
  },
  {
    icon: <GiHairStrands />,
    name: "헤어샾",
    content: 20,
  },
  {
    icon: <BiRestaurant />,
    name: "음식점",
    content: 200,
  },
];

const MainContentResultBox = () => {
  const [data, setData] = useState(settingData);

  return (
    <div style={{ textAlign: "left" }}>
      <strong style={{ fontSize: "1.3rem" }}>편의 시설</strong>
      <br />
      <br />
      <div className={classes.results}>
        <ListBox dataArray={data} direction={true}>
          <MainContentResultIconBox />
        </ListBox>
      </div>
    </div>
  );
};

export default MainContentResultBox;
