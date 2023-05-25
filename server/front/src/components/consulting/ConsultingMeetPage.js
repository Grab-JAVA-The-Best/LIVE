import { useCallback, useEffect, useRef, useState } from "react";
import kurentoUtils from "kurento-utils";
import classes from "./ConsultingMeetPage.module.scss";
import Button from "../../UI/Button";
import { STATUS } from "../../pages/ConsultingPage";
import { BsRecordCircle } from "react-icons/bs";
import { AiOutlineSound } from "react-icons/ai";
import { BiPhoneCall } from "react-icons/bi";
import { FiMaximize } from "react-icons/fi";
import { IoExitOutline, IoVolumeMuteOutline } from "react-icons/io5";
import useWebSocket from "../../util/useWebSocket";
import useWebRTC from "../../util/useWebRTC";
import { useNavigate, useParams } from "react-router-dom";
import useRecording from "../../util/useRecording";
import { usePrompt } from "../../util/usePrompt";
import Modal from "../../UI/Modal";
import ReviewForm from "../ReviewForm";
import CustomAlert from "../../UI/Alert";

const JAVA_SERVER_URL = `wss://live-live.store:8080/groupcall`;

const ConsultingMeetPage = ({
  userInfo,
  isRealtor,
  status,
  statusChangeHandler,
  sessionId,
  recordingFiles,
  setRecordingFiles,
  highlightNo,
  setHighlightNo,
}) => {
  const navi = useNavigate();
  const localVideo = useRef();
  const remoteVideo = useRef();
  const [info, setInfo] = useState("준비중...");
  const [myName, setMyName] = useState(userInfo.id);

  const [recording, startRecording, stopRecording] = useRecording({
    stream: localVideo.current?.srcObject,
    recordingFiles,
    setRecordingFiles,
  });

  const isMounted = useRef(true);

  const [audio, setAudio] = useState(true);
  const [promptBlock, setBlock] = useState(false);
  const [viewReview, setViewReview] = useState(false);
  const [viewAlert, setViewAlert] = useState(false);
  const params = useParams();
  const participants = useRef({ user: null, realtor: null });

  const closeReview = () => {
    setViewReview(false);
  };

  const onClose = () => {
    closeReview();
    navi("/mypage/user");
  };

  usePrompt({
    when: promptBlock,
    message: `페이지 이동으로 통화가 종료될 수 있습니다. \n 정말로 나가시겠습니까?`,
  });

  const toggleAudio = () => {
    setAudio(!audio);
  };

  //status에 따른 변화
  useEffect(() => {
    switch (status) {
      case STATUS.REALTOR_ENTER:
        setInfo(`준비중...`);
        break;

      case STATUS.REALTOR_START_CONSULTING:
        setInfo(`유저의 접속을 기다리기`);

        setBlock(true);
        // register();
        break;

      case STATUS.REALTOR_END_CALL:
        socket.current.send(JSON.stringify({ id: "closeRoom" }));
        setInfo("상담을 종료합니다...");
        setTimeout(setInfo(""), 2000);
        setBlock(false);
        break;

      case STATUS.USER_ENTER:
        setBlock(true);
        break;

      case STATUS.CONSULTING_IS_END:
        setBlock(false);
        setViewReview(true);
        break;

      default:
    }
  }, [status]);

  //highlightNo에 따른 변화
  useEffect(() => {
    if (isMounted.current) {
      isMounted.current = false;
    } else {
      sendMessage({ id: "selectItem", itemNo: highlightNo });
    }
  }, [highlightNo]);

  //====================FOR TEST=====================

  const socket = useRef(null);

  useEffect(() => {
    socket.current = new WebSocket(JAVA_SERVER_URL);

    socket.current.onmessage = (event) => {
      const data = event.data;
      const responseMsg = JSON.parse(data);

      switch (responseMsg.id) {
        case "existingParticipants":
          setInfo(`내 기기 연결 중...`);
          onExistingParticipants(responseMsg);
          break;

        case "newParticipantArrived":
          onNewParticipant(responseMsg);
          break;

        case "participantLeft":
          onParticipantLeft(responseMsg);
          setInfo(`상대의 연결이 끊어졌습니다`);
          setTimeout(() => setInfo(""), 2000);
          break;

        case "itemSelected":
          if (!isRealtor && responseMsg.itemNo != highlightNo) {
            setHighlightNo(responseMsg.itemNo);
          }
          break;

        case "receiveVideoAnswer":
          setInfo(``);
          receiveVideoResponse(responseMsg);
          break;

        case "iceCandidate":
          participants.current[responseMsg.name].rtcPeer.addIceCandidate(responseMsg.candidate, function (error) {
            if (error) {
              console.error("Error adding candidate: " + error);
              return;
            }
          });
          break;

        case "closeRoom":
          if (isRealtor) {
            navi(`/consulting/${sessionId}`);
          } else {
            setBlock(false);
            statusChangeHandler(STATUS.CONSULTING_IS_END);
          }
          break;
        default:
      }
    };

    socket.current.onopen = () => {
      const message = {
        id: "joinRoom",
        name: myName,
        room: sessionId,
      };
      socket.current.send(JSON.stringify(message));
    };

    socket.current.onclose = () => {};

    return () => {
      const message = {
        id: "leaveRoom",
      };
      socket.current.send(JSON.stringify(message));
      socket.current.close();
    };
  }, []);

  const sendMessage = useCallback((message) => {
    const data = JSON.stringify(message);
    socket.current.send(data);
  }, []);

  class Participant {
    constructor(name) {
      this.name = name;
      this.sendMessage = sendMessage;

      var rtcPeer;

      this.offerToReceiveVideo = (error, offerSdp, wp) => {
        if (error) return console.error("sdp offer error");

        this.sendMessage({
          id: "receiveVideoFrom",
          sender: this.name,
          sdpOffer: offerSdp,
        });
      };

      this.onIceCandidate = (candidate, wp) => {
        this.sendMessage({
          id: "onIceCandidate",
          candidate: candidate,
          name: this.name,
        });
      };
      Object.defineProperty(this, "rtcPeer", { writable: true });
      this.dispose = function () {
        this.rtcPeer.dispose();
      };
    }
  }

  const receiveVideo = (sender) => {
    const participant = new Participant(sender);
    participants.current[sender] = participant;

    let constraints;

    constraints = {
      audio: true,
      video: { width: 640 },
    };

    const options = {
      remoteVideo: isRealtor ? remoteVideo.current : localVideo.current,
      onicecandidate: participant.onIceCandidate.bind(participant),
      mediaConstraints: constraints,
    };

    participant.rtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerRecvonly(options, function (error) {
      if (error) {
        return console.error(error);
      }
      this.generateOffer(participant.offerToReceiveVideo.bind(participant));
    });
  };

  const onNewParticipant = (request) => {
    receiveVideo(request.name);
  };

  const receiveVideoResponse = (result) => {
    participants.current[result.name].rtcPeer.processAnswer(result.sdpAnswer, function (error) {
      if (error) return console.error(error);
    });
  };

  const onExistingParticipants = (msg) => {
    const constraints = {
      audio: true,
      video: { width: 640 },
    };

    const participant = new Participant(myName);
    participants.current[myName] = participant;

    var options = {
      localVideo: isRealtor ? localVideo.current : remoteVideo.current,
      mediaConstraints: constraints,
      onicecandidate: participant.onIceCandidate.bind(participant),
      configuration: {
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
      },
    };
    participant.rtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerSendonly(options, function (error) {
      if (error) {
        return console.error(error);
      }
      this.generateOffer(participant.offerToReceiveVideo.bind(participant));
    });

    msg.data.forEach(receiveVideo);
  };

  const onParticipantLeft = (request) => {
    const participant = participants.current[request.name];
    participant.dispose();
    delete participants.current[request.name];
  };

  return (
    <>
      <video autoPlay={true} ref={localVideo}></video>
      <video autoPlay={true} width={0} height={0} ref={remoteVideo}></video>
      <div className={classes.msgBox}>
        <h1>{info}</h1>
      </div>

      <div className={classes.controllerBox}>
        <div className={classes.controllerBox_inner}>
          {!isRealtor ? (
            <>
              <div>
                <Button clickEvent={toggleAudio}>{audio ? <AiOutlineSound /> : <IoVolumeMuteOutline />}</Button>
              </div>
              <div className={`${recording ? classes.recordingActive : ""}`}>
                <Button
                  clickEvent={() => {
                    if (recording) {
                      setViewAlert(true);
                      stopRecording();
                    } else {
                      startRecording();
                    }
                  }}
                >
                  <BsRecordCircle />
                </Button>
              </div>
              <div>
                <Button
                  clickEvent={() => {
                    navi("/");
                  }}
                >
                  <IoExitOutline />
                </Button>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
      {viewReview && (
        <Modal>
          <ReviewForm
            realtorNo={params.realtorNo}
            userNo={params.userNo}
            consultingNo={params.consultingNo}
            onClose={onClose}
          />
        </Modal>
      )}
      {viewAlert && <CustomAlert title={"녹화 완료"} content={"영상이 녹화되었습니다."} setter={setViewAlert} />}
    </>
  );
};

export default ConsultingMeetPage;
