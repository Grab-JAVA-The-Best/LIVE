import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import classes from "./PreviewCarousel.module.scss";
import { useRef } from "react";

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        right: "3%",
        zIndex: 10,
      }}
      onClick={onClick}
    />
  );
};

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", left: "3%", zIndex: 10 }}
      onClick={onClick}
    />
  );
};

const PreviewCarousel = (props) => {
  const mySettings = props.settings;
  const items = props.items;

  const dotClickHandler = (i) => {
    sliderRef.current.slickGoTo(i);
  };

  const sliderRef = useRef();

  const settings = mySettings.appendDots
    ? {
        dots: mySettings.dots ? mySettings.dots : false,
        infinite: mySettings.infinite ? mySettings.infinite : false,
        speed: mySettings.speed ? mySettings.speed : 500,
        slidesToShow: mySettings.slidesToShow ? mySettings.slidesToShow : 1,
        slidesToScroll: mySettings.slidesToScroll
          ? mySettings.slidesToScroll
          : 1,
        centerMode: mySettings.centerMode ? mySettings.centerMode : false,
        centerPadding: mySettings.centerPadding
          ? mySettings.centerPadding
          : "0px",
        autoplay: mySettings.autoplay ? mySettings.autoplay : false,
        autoplaySpeed: mySettings.autoplaySpeed
          ? mySettings.autoplaySpeed
          : 2000,
        draggable: mySettings.draggable ? mySettings.draggable : false,
        fade: mySettings.fade ? mySettings.fade : false,
        arrows: mySettings.arrows ? mySettings.arrows : false,
        nextArrow: mySettings.customArrow && <NextArrow />,
        prevArrow: mySettings.customArrow && <PrevArrow />,
        vertical: mySettings.vertical ? mySettings.vertical : false,
        initialSlide: mySettings.initialSlide ? mySettings.initialSlide : 0,
        pauseOnFocus: mySettings.pauseOnFocus ? mySettings.pauseOnFocus : false,
        pauseOnHover: mySettings.pauseOnHover ? mySettings.pauseOnHover : false,
        appendDots:
          mySettings.appendDots &&
          (() => {
            return (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  position: "static",
                  justifyContent: "space-between",
                }}
              >
                <ul
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  {items.map((item, idx) => {
                    return (
                      <li
                        style={{
                          width: `${(90 - items.length) / items.length}%`,
                          height: "4em",
                          border: "1px solid #bbbbbb",
                          borderRadius: "4px",
                          marginRight: "1px",
                        }}
                        key={item.itemImageNo}
                        onClick={() => dotClickHandler(idx)}
                      >
                        <img
                          src={item.imageSrc}
                          alt={item.itemImageNo}
                          style={{
                            width: "100%",
                            height: "100%",
                            background: "rgba(0,0,0,0.1)",
                            borderRadius: "3px",
                          }}
                        />
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          }),
      }
    : {
        dots: mySettings.dots ? mySettings.dots : false,
        infinite: mySettings.infinite ? mySettings.infinite : false,
        speed: mySettings.speed ? mySettings.speed : 500,
        slidesToShow: mySettings.slidesToShow ? mySettings.slidesToShow : 1,
        slidesToScroll: mySettings.slidesToScroll
          ? mySettings.slidesToScroll
          : 1,
        centerMode: mySettings.centerMode ? mySettings.centerMode : false,
        centerPadding: mySettings.centerPadding
          ? mySettings.centerPadding
          : "0px",
        autoplay: mySettings.autoplay ? mySettings.autoplay : false,
        autoplaySpeed: mySettings.autoplaySpeed
          ? mySettings.autoplaySpeed
          : 2000,
        draggable: mySettings.draggable ? mySettings.draggable : false,
        fade: mySettings.fade ? mySettings.fade : false,
        arrows: mySettings.arrows ? mySettings.arrows : false,
        nextArrow: mySettings.customArrow && <NextArrow />,
        prevArrow: mySettings.customArrow && <PrevArrow />,
        vertical: mySettings.vertical ? mySettings.vertical : false,
        initialSlide: mySettings.initialSlide ? mySettings.initialSlide : 0,
        pauseOnFocus: mySettings.pauseOnFocus ? mySettings.pauseOnFocus : false,
        pauseOnHover: mySettings.pauseOnHover ? mySettings.pauseOnHover : false,
      };

  return (
    <div className={classes.previewBox}>
      <div className={classes.buttonBox}>
        <button
          onClick={() => {
            props.onClose();
          }}
        >
          ✖
        </button>
      </div>
      <Slider {...settings} ref={sliderRef}>
        {items &&
          items.map((item) => {
            return (
              <img
                className={classes.currPreview}
                src={item.imageSrc}
                key={item.itemImageNo}
                alt={item.itemImageNo}
              />
            );
          })}
      </Slider>
    </div>
  );
};

export default PreviewCarousel;
