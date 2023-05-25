import { AiOutlineCalendar, AiOutlineCompass } from "react-icons/ai";
import {
  BiArea,
  BiBuilding,
  BiBuildingHouse,
  BiCloset,
  BiFoodTag,
  BiPhoneCall,
  BiBed,
  BiCctv,
} from "react-icons/bi";
import { BsWind, BsFlower1, BsHouseDoor } from "react-icons/bs";
import { CgSmartHomeWashMachine, CgSmartHomeBoiler } from "react-icons/cg";
import { FaSink } from "react-icons/fa";
import {
  GiDesk,
  GiTable,
  GiConverseShoe,
  GiGasStove,
  GiChickenOven,
  GiCaptainHatProfile,
} from "react-icons/gi";
import { GrElevator, GrRestroom } from "react-icons/gr";
import { HiOutlineLocationMarker } from "react-icons/hi";
import {
  MdOutlineSpaceDashboard,
  MdOutlineLocalLaundryService,
  MdLocalLaundryService,
  MdOutlineMicrowave,
  MdDeck,
  MdOutlineDeck,
} from "react-icons/md";
import {
  RiParkingBoxLine,
  RiFridgeLine,
  RiSecurePaymentFill,
  RiAlarmWarningLine,
} from "react-icons/ri";
import { TbBath, TbSofa, TbStairs } from "react-icons/tb";

const Icons = {
  area: <BiArea />,
  room: <MdOutlineSpaceDashboard />,
  buildingFloor: <BiBuilding />,
  parking: <RiParkingBoxLine />,
  calendar: <AiOutlineCalendar />,
  compass: <AiOutlineCompass />,
  elevator: <GrElevator />,
  purpose: <BiBuildingHouse />,
  marker: <HiOutlineLocationMarker />,
  completionYear: <BsHouseDoor />,
  entrance: <TbStairs />,
  heating: <CgSmartHomeBoiler />,

  bed: <BiBed />,
  washingMachine: <MdOutlineLocalLaundryService />,
  airConditioner: <BsWind />,
  desk: <GiDesk />,
  closet: <BiCloset />,
  bathtub: <TbBath />,
  sink: <FaSink />,
  cctv: <BiCctv />,
  diningTable: <GiTable />,
  sofa: <TbSofa />,
  shoeRack: <GiConverseShoe />,
  refrigerator: <RiFridgeLine />,
  dryingMachine: <MdLocalLaundryService />,
  bidet: <GrRestroom />,
  dishWasher: <CgSmartHomeWashMachine />,
  gasStove: <GiGasStove />,
  inductionCooktop: <BiFoodTag />,
  microwave: <MdOutlineMicrowave />,
  oven: <GiChickenOven />,
  guard: <GiCaptainHatProfile />,
  intercom: <BiPhoneCall />,
  keycard: <RiSecurePaymentFill />,
  fireAlarm: <RiAlarmWarningLine />,
  veranda: <MdDeck />,
  terrace: <MdOutlineDeck />,
  garden: <BsFlower1 />,
};

export const FacebookIcon = () => {
  return (
    <svg
      width="32"
      height="33"
      viewBox="0 0 32 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0.5"
        y="0.570068"
        width="31"
        height="31"
        rx="15.5"
        fill="#F4F4F4"
      />
      <path
        d="M21.52 10.0701H10.48C10.2145 10.0701 10 10.2846 10 10.5501V21.5901C10 21.8556 10.2145 22.0701 10.48 22.0701H21.52C21.7855 22.0701 22 21.8556 22 21.5901V10.5501C22 10.2846 21.7855 10.0701 21.52 10.0701ZM20.134 13.5726H19.1755C18.424 13.5726 18.2785 13.9296 18.2785 14.4546V15.6111H20.0725L19.8385 17.4216H18.2785V22.0701H16.408V17.4231H14.8435V15.6111H16.408V14.2761C16.408 12.7266 17.3545 11.8821 18.7375 11.8821C19.4005 11.8821 19.969 11.9316 20.1355 11.9541V13.5726H20.134Z"
        fill="#555555"
      />
      <rect
        x="0.5"
        y="0.570068"
        width="31"
        height="31"
        rx="15.5"
        stroke="#555555"
      />
    </svg>
  );
};

export const InstagramIcon = () => {
  return (
    <svg
      width="33"
      height="33"
      viewBox="0 0 33 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="1.18799"
        y="0.574219"
        width="30.9921"
        height="30.9919"
        rx="15.4959"
        fill="#F4F4F4"
      />
      <path
        d="M16.6824 14.0707C15.5814 14.0707 14.6829 14.9692 14.6829 16.0702C14.6829 17.1712 15.5814 18.0697 16.6824 18.0697C17.7834 18.0697 18.6819 17.1712 18.6819 16.0702C18.6819 14.9692 17.7834 14.0707 16.6824 14.0707ZM22.6794 16.0702C22.6794 15.2422 22.6869 14.4217 22.6404 13.5952C22.5939 12.6352 22.3749 11.7832 21.6729 11.0812C20.9694 10.3777 20.1189 10.1602 19.1589 10.1137C18.3309 10.0672 17.5104 10.0747 16.6839 10.0747C15.8559 10.0747 15.0354 10.0672 14.2089 10.1137C13.2489 10.1602 12.3969 10.3792 11.6949 11.0812C10.9914 11.7847 10.7739 12.6352 10.7274 13.5952C10.6809 14.4232 10.6884 15.2437 10.6884 16.0702C10.6884 16.8967 10.6809 17.7187 10.7274 18.5452C10.7739 19.5052 10.9929 20.3572 11.6949 21.0592C12.3984 21.7627 13.2489 21.9802 14.2089 22.0267C15.0369 22.0732 15.8574 22.0657 16.6839 22.0657C17.5119 22.0657 18.3324 22.0732 19.1589 22.0267C20.1189 21.9802 20.9709 21.7612 21.6729 21.0592C22.3764 20.3557 22.5939 19.5052 22.6404 18.5452C22.6884 17.7187 22.6794 16.8982 22.6794 16.0702ZM16.6824 19.1467C14.9799 19.1467 13.6059 17.7727 13.6059 16.0702C13.6059 14.3677 14.9799 12.9937 16.6824 12.9937C18.3849 12.9937 19.7589 14.3677 19.7589 16.0702C19.7589 17.7727 18.3849 19.1467 16.6824 19.1467ZM19.8849 13.5862C19.4874 13.5862 19.1664 13.2652 19.1664 12.8677C19.1664 12.4702 19.4874 12.1492 19.8849 12.1492C20.2824 12.1492 20.6034 12.4702 20.6034 12.8677C20.6036 12.9621 20.585 13.0555 20.549 13.1428C20.5129 13.23 20.46 13.3092 20.3933 13.376C20.3265 13.4427 20.2473 13.4956 20.16 13.5317C20.0728 13.5678 19.9793 13.5863 19.8849 13.5862Z"
        fill="#555555"
      />
      <rect
        x="1.18799"
        y="0.574219"
        width="30.9921"
        height="30.9919"
        rx="15.4959"
        stroke="#555555"
      />
    </svg>
  );
};

export const YoutubeIcon = () => {
  return (
    <svg
      width="33"
      height="32"
      viewBox="0 0 33 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="1.41992"
        y="0.860107"
        width="30.44"
        height="30.42"
        rx="15.21"
        fill="#F4F4F4"
      />
      <path
        d="M23.0794 12.8316C23.0029 12.5467 22.8529 12.2868 22.6444 12.0781C22.4359 11.8693 22.1763 11.719 21.8914 11.6421C20.8429 11.3601 16.6399 11.3601 16.6399 11.3601C16.6399 11.3601 12.4369 11.3601 11.3884 11.6406C11.1035 11.7172 10.8437 11.8675 10.6351 12.0763C10.4266 12.2851 10.2767 12.545 10.2004 12.8301C9.91992 13.8801 9.91992 16.0701 9.91992 16.0701C9.91992 16.0701 9.91992 18.2601 10.2004 19.3086C10.3549 19.8876 10.8109 20.3436 11.3884 20.4981C12.4369 20.7801 16.6399 20.7801 16.6399 20.7801C16.6399 20.7801 20.8429 20.7801 21.8914 20.4981C22.4704 20.3436 22.9249 19.8876 23.0794 19.3086C23.3599 18.2601 23.3599 16.0701 23.3599 16.0701C23.3599 16.0701 23.3599 13.8801 23.0794 12.8316ZM15.3049 18.0801V14.0601L18.7849 16.0551L15.3049 18.0801Z"
        fill="#555555"
      />
      <rect
        x="1.41992"
        y="0.860107"
        width="30.44"
        height="30.42"
        rx="15.21"
        stroke="#555555"
      />
    </svg>
  );
};

export const TwitterIcon = () => {
  return (
    <svg
      width="34"
      height="33"
      viewBox="0 0 34 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="1.05859"
        y="0.5"
        width="31.4815"
        height="31.14"
        rx="15.57"
        fill="#F4F4F4"
      />
      <path
        d="M23.0401 12.2045C22.5811 12.4025 22.0816 12.545 21.5671 12.6005C22.1013 12.2832 22.5013 11.7818 22.6921 11.1905C22.1908 11.4887 21.6417 11.6978 21.0691 11.8085C20.8298 11.5526 20.5403 11.3488 20.2187 11.2097C19.8972 11.0706 19.5504 10.9992 19.2001 11C17.7826 11 16.6426 12.149 16.6426 13.559C16.6426 13.757 16.6666 13.955 16.7056 14.1455C14.5831 14.0345 12.6901 13.0205 11.4316 11.468C11.2023 11.8597 11.0821 12.3056 11.0836 12.7595C11.0836 13.6475 11.5351 14.4305 12.2236 14.891C11.8179 14.875 11.4216 14.7635 11.0671 14.5655V14.597C11.0671 15.8405 11.9461 16.871 13.1176 17.108C12.8976 17.1651 12.6714 17.1944 12.4441 17.195C12.2776 17.195 12.1201 17.1785 11.9611 17.156C12.2851 18.17 13.2286 18.9065 14.3521 18.9305C13.4731 19.619 12.3721 20.024 11.1766 20.024C10.9621 20.024 10.7641 20.0165 10.5586 19.9925C11.6926 20.72 13.0381 21.14 14.4871 21.14C19.1911 21.14 21.7651 17.243 21.7651 13.8605C21.7651 13.7495 21.7651 13.6385 21.7576 13.5275C22.2556 13.163 22.6921 12.7115 23.0401 12.2045Z"
        fill="#555555"
      />
      <rect
        x="1.05859"
        y="0.5"
        width="31.4815"
        height="31.14"
        rx="15.57"
        stroke="#555555"
      />
    </svg>
  );
};

export default Icons;
