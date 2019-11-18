$(() => {
  const render = gameState => {
    const { cards, players, history } = gameState;
    
    const centerCard = cards[history.length - 1];
    $('#gsp-center-card').text(centerCard);

    const orderedPlayersArray = Object.keys(players).sort((a, b) => {
      return players[a].order - players[b].order;
    });

    orderedPlayersArray.forEach((player, index) => {
      const playerCard = history[history.length - 1][player];
      $(`#gsp-played-card-${index + 1}`).text(playerCard);
    })

    // TODO: with real JWT, we need to decode the base64 to actually get the username
    const username = document.cookie.replace(/(?:(?:^|.*;\s*)jwt\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    const userCards = players[username].cards
    $('.gsp-player-card').each(function() {
      if (userCards.includes($(this).data('cardValue'))) {
        $(this).removeClass('hidden');
      } else {
        $(this).addClass('hidden');
      }
    })

    // TIES
  };
  
  
  // TODO: need to send cookie to validate user and game combination
  $('#button').click(() => {
    console.log('button clicked');
    socket.emit('gsp-button');
  });

  socket.on('gsp-button', msg => {
    console.log(msg);
  })

  socket.on('hydrate-state', data => {
    console.log(data);
    render(data.gameState);
  });
});