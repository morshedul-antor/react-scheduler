import { useEffect, useState } from "react";
import classes from "./App.module.css";

export default function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const socket = new WebSocket("ws://127.0.0.1:8000/ws");

    socket.onopen = () => {
      console.log("WebSocket connection opened...");
    };

    socket.onmessage = (event) => {
      console.log("Received message:", event.data);
      setCount((prev) => prev + 1);
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed!");
    };
  }, []);

  return (
    <div className={classes.app}>
      <h2>Trigger:</h2> <h1>{count}</h1>
    </div>
  );
}
