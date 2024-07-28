import { io } from "socket.io-client";

const SOCKET_URL = "https://fullstack-task-jyotiranjan-ghibila-ih9p.onrender.com/";

const socket = io(SOCKET_URL);

socket.on("connect", () => {
  console.log("Connected to WebSocket server");
});

socket.on("disconnect", () => {
  console.log("Disconnected from WebSocket server");
});

export default socket;
