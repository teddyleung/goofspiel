// This file is for socket events common amongst all games

const socket = io();

$(() => {
  const uuid = window.location.pathname.split('/')[2];

  // TODO validate user and game
  socket.emit('join', { uuid });
});