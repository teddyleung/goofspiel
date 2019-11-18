$(() => {
  // TODO: need to send cookie to validate user and game combination
  $('#button').click(() => {
    console.log('button clicked');
    socket.emit('gsp-button');
  });

  socket.on('gsp-button', msg => {
    console.log(msg);
  })
});