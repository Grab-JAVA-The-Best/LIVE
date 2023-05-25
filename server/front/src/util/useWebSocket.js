import { useState, useEffect, useCallback, useRef } from "react";
import { useSelector } from "react-redux";

const JAVA_SERVER_URL = `wss://live-live.store:8080/groupcall`;

const useWebSocket = (sessionId, myName) => {
  const [responseMsg, setResponseMsg] = useState("");
  const socket = useRef(null);

  useEffect(() => {
    socket.current = new WebSocket(JAVA_SERVER_URL);

    socket.current.onmessage = (event) => {
      const data = event.data;
      setResponseMsg(JSON.parse(data));
    };

    socket.current.onopen = () => {
      const message = {
        id: "joinRoom",
        name: myName,
        room: sessionId,
      };
      socket.current.send(JSON.stringify(message));
    };

    socket.current.onclose = () => {
      const message = {
        id: "leaveRoom",
      };
      socket.current.send(JSON.stringify(message));
    };

    return () => {
      socket.current.close();
    };
  }, []);

  const sendMessage = useCallback((message) => {
    const data = JSON.stringify(message);
    socket.current.send(data);
  }, []);

  return { responseMsg, sendMessage, socket };
};

export default useWebSocket;
