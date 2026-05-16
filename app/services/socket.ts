import { io } from 'socket.io-client';

// Connect to the local Socket.io server
const SOCKET_URL = 'http://localhost:4000';

export const socket = io(SOCKET_URL, {
  autoConnect: true,
  reconnection: true,
});
