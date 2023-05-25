import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRef, useState, useEffect } from "react";
import CarouselData from "../pages/CarouselData";

const items = [
  {
    id: 1,
    room: "분리형 원룸",
    name: "한마음 주택",
    area: "31.65m²",
    deposit: 200,
    rent: 30,
    src: require("../assets/image/main_recommand/main_recommand_image_1.png"),
  },
  {
    id: 2,
    room: "원룸",
    name: "덕일 빌라",
    area: "31.20m²",
    deposit: 250,
    rent: 33,
    src: require("../assets/image/main_recommand/main_recommand_image_2.png"),
  },
  {
    id: 3,
    room: "투룸",
    name: "태양 원룸",
    area: "35.15m²",
    deposit: 300,
    rent: 38,
    src: require("../assets/image/main_recommand/main_recommand_image_3.png"),
  },
  {
    id: 4,
    room: "투룸",
    name: "영우 빌라",
    area: "29.63m²",
    deposit: 200,
    rent: 30,
    src: require("../assets/image/main_recommand/main_recommand_image_4.png"),
  },
  {
    id: 5,
    room: "원룸",
    name: "가온 하우스",
    area: "30.28m²",
    deposit: 100,
    rent: 40,
    src: require("../assets/image/main_recommand/main_recommand_image_5.png"),
  },
  {
    id: 6,
    room: "분리형 원룸",
    name: "웰컴 하우스",
    area: "33.25m²",
    deposit: 400,
    rent: 28,
    src: require("../assets/image/main_recommand/main_recommand_image_6.png"),
  },
];

function Carousel() {
  const [list, setList] = useState([]);
  const [current, setCurrent] = useState(0);
  const sliderRef = useRef();

  useEffect(() => {
    setList(items);
  }, [items]);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(current > list.length - 2 ? 0 : current + 1);
      handleClick(current > list.length - 2 ? 0 : current + 1);
    }, 2500);

    return () => {
      clearInterval(interval);
    };
  }, [current, list?.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(current > list.length - 2 ? 0 : current + 1);
      handleClick(current > list.length - 2 ? 0 : current + 1);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [current, list?.length]);

  const handleClick = (i) => {
    if (current === list.length - 1) {
      sliderRef.current.slickGoTo(current + 1);
      setCurrent(i);
    } else {
      sliderRef.current.slickGoTo(i);
      setCurrent(i);
    }
  };

  const settings = {
    infinite: true,
    centerPadding: "0px",
    slidesToShow: 1,
    speed: 500,
    arrows: false,
    dots: false,
    variableWidth: true,
    afterChange: (current) => setCurrent(current),
  };

  return (
    <div style={{ width: "100%", display: "flex" }}>
      <Slider {...settings} ref={sliderRef}>
        {items.map((item, idx) => {
          return (
            <div key={item.id}>
              <CarouselData
                data={item.id}
                image={item.src}
                room={item.room}
                name={item.name}
                area={item.area}
                deposit={item.deposit}
                rent={item.rent}
              />
            </div>
          );
        })}
      </Slider>
    </div>
  );
}

export default Carousel;
