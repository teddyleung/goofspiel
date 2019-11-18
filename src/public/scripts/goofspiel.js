$(() => {
  const uuid = window.location.pathname.split('/')[2];

  // TODO: need to send cookie to validate user and game combination
  $('#button').click(() => {
    console.log('button clicked');
    socket.emit('gsp-button', {
      uuid
    });
  });

  socket.on('gsp-button', msg => {
    console.log(msg);
  })
});