import { io, type Socket } from 'socket.io-client';

let socket: Socket | null = null;

export const getSocket = () => {
  if (!socket) {
    socket = io(import.meta.env.VITE_WS_URL ?? 'http://localhost:3000', {
      transports: ['websocket'],
      withCredentials: true
    });
  }

  return socket;
};
