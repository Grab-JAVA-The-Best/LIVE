import { useState } from "react";
import { useEffect } from "react";
import classes from "./Map.module.scss";

const { kakao } = window;

const Map = (props) => {
  const [width, setWidth] = useState(window.innerWidth);

  const targetAddress = props.address;
  const targetHouseName = props.houseName;

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const setMap = setTimeout(() => {
      const container = document.getElementById("map");

      const geocoder = new kakao.maps.services.Geocoder();

      geocoder.addressSearch(targetAddress, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          let coords = new kakao.maps.LatLng(result[0].y, result[0].x);

          const options = {
            center: coords,
            level: 4,
          };

          const map = new kakao.maps.Map(container, options);

          new kakao.maps.Marker({
            map: map,
            position: coords,
          });

          map.setCenter(coords);
        }
      });
    }, 500);

    return () => {
      clearTimeout(setMap);
    };
  }, [width]);

  return <div id="map" className={classes.map}></div>;
};

export default Map;
