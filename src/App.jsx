import { useEffect, useState } from "react";
import classes from "./App.module.css";
import Sound from "./assets/notify.mp3";
import { Howl } from "howler";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const [count, setCount] = useState(0);

  const sound = new Howl({
    src: [Sound],
  });

  const toastify = () => {
    toast(
      <span>
        💊 It`s Medicine Time! <br /> Please eat your medicines!
      </span>,
      {
        autoClose: 30 * 1000,
        closeButton: false,
        onClick: () => {
          sound.stop();
        },
      }
    );
    sound.play();
  };

  const [hasMounted, setHasMounted] = useState(false);
  const checkTimeInData = () => {
    const date = new Date();
    const time = `${date.getHours()}:${date.getMinutes()}`;
    const data = ["17:44", "17:45", "17:50"];

    if (data.includes(time) && hasMounted) {
      toastify();
    }
  };

  useEffect(() => {
    if (!hasMounted) {
      setHasMounted(true);
      checkTimeInData();
    }

    const intervalId = setInterval(checkTimeInData, 59 * 1000);
    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasMounted]);

  useEffect(() => {
    const socket = new WebSocket("ws://127.0.0.1:8080/ws");

    socket.onopen = () => {
      console.log("WebSocket connection opened...");
    };

    socket.onmessage = (event) => {
      console.log("Received message:", event.data);
      setCount((prev) => prev + 1);
      toastify();
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed!");
    };
  }, []);

  return (
    <>
      <ToastContainer />
      <div className={classes.app}>
        <h2>Trigger:</h2> <h1>{count}</h1>
        <button onClick={toastify}>Triggering Notification</button>
      </div>
    </>
  );
}
