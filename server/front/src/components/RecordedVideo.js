import { useEffect, useState } from "react";
import axiosInstance from "../util/axios";
import classes from "./RecordedVideo.module.scss";

const RecordedVideo = (props) => {
  const [videoList, setVideoList] = useState(props.videoList);
  const [selectedVideo, setSelectedVideo] = useState(props.videoList[0]);
  const [videoData, setVideoData] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [currentVideoNum, setCurrentVideoNum] = useState(props.videoList[0]);

  useEffect(() => {
    axiosInstance
      .get(`/consultings/records/${selectedVideo}`, {
        responseType: "arraybuffer",
      })
      .then((response) => {
        setVideoData(new Blob([response.data], { type: "video/mp4" }));
      })
      .catch((error) => {
        console.error(error);
      });
  }, [selectedVideo]);

  useEffect(() => {
    if (videoData === null) {
      return;
    }
    setVideoUrl(URL.createObjectURL(videoData));
  }, [videoData]);

  return (
    <div className={classes.recordedVideo}>
      <div className={classes.header}>
        <h2>상담 매물 녹화 영상</h2>
        <button
          onClick={() => {
            props.onClose();
          }}
        >
          ✖
        </button>
      </div>
      <div className={classes.body}>
        {videoList.map((videoNum, index) => {
          return (
            <button
              key={videoNum}
              className={currentVideoNum === videoNum && classes.active}
              onClick={() => {
                setSelectedVideo(videoNum);
                setCurrentVideoNum(videoNum);
              }}
            >
              {index + 1}번째 영상
            </button>
          );
        })}
      </div>
      <div className={classes.footer}>
        <video controls src={videoUrl} />
      </div>
    </div>
  );
};

export default RecordedVideo;
