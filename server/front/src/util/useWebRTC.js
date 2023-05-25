import kurentoUtils from "kurento-utils";

const useWebRTC = ({
  socket,
  isRealtor,
  participants,
  sendMessage,
  localVideo,
  remoteVideo,
  myName,
  audio,
  sessionId,
}) => {
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
      video: true,
    };

    const options = {
      remoteVideo: isRealtor ? remoteVideo.current : localVideo.current,
      onicecandidate: participant.onIceCandidate.bind(participant),
      mediaConstraints: constraints,
      configuration: { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] },
    };

    participant.rtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerRecvonly(options, function (error) {
      if (error) {
        return console.error(error);
      }
      this.generateOffer(participant.offerToReceiveVideo.bind(participant));
    });
  };

  return {
    onNewParticipant(request) {
      receiveVideo(request.name);
    },

    receiveVideoResponse(result) {
      participants.current[result.name].rtcPeer.processAnswer(result.sdpAnswer, function (error) {
        if (error) return console.error(error);
      });
    },

    onExistingParticipants(msg) {
      const constraints = {
        audio: true,
        video: true,
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
    },

    onParticipantLeft(request) {
      const participant = participants.current[request.name];
      participant.dispose();
      delete participants.current[request.name];
    },

    register() {
      const message = {
        id: "joinRoom",
        name: myName,
        room: sessionId,
      };
      sendMessage(message);
    },

    leaveRoom() {
      sendMessage({
        id: "leaveRoom",
      });

      for (let key in participants.current) {
        participants.current[key].dispose();
      }
    },
  };
};

export default useWebRTC;
