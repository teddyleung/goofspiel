$(() => {
  const roundWinner = (round, playerPair) => {
    if (round[playerPair[0]] === null || round[playerPair[1]] === null) {
      return false;
    }

    if (round[playerPair[0]] === round[playerPair[1]]) {
      return null;
    }
    
    return round[playerPair[0]] > round[playerPair[1]] ? playerPair[0] : playerPair[1];
  };
  
  const calcScore = (cards, history, playerPair) => {
    const score = {
      [playerPair[0]]: 0,
      [playerPair[1]]: 0,
    };

    history.forEach((round, index) => {
      const winner = roundWinner(round, playerPair);
      if (winner === null) {
        const halfScore = cards[index] / 2;
        score[playerPair[0]] += halfScore;
        score[playerPair[1]] += halfScore;
      } else if (winner !== false) {
        score[winner] += cards[index];
      }
    });

    return score;
  };
  
  const render = gameState => {
    // TODO: split up the logic into separate functions. render() is too many lines
    
    const { cards, players, history } = gameState;
    
    const centerCard = cards[history.length - 1];
    $('#gsp-center-card').text(centerCard);

    const orderedPlayersPair = Object.keys(players).sort((a, b) => {
      return players[a].order - players[b].order;
    });

    const score = calcScore(cards, history, orderedPlayersPair);

    orderedPlayersPair.forEach((player, index) => {
      const playerCard = history[history.length - 1][player];
      $(`#gsp-player-name-${index + 1}`).text(player);
      $(`#gsp-played-card-${index + 1}`).text(playerCard);
      $(`#gsp-score-${index + 1}`).text(score[player]);
    });


    // TODO: with real JWT, we need to decode the base64 to actually get the username
    const username = document.cookie.replace(/(?:(?:^|.*;\s*)jwt\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    const userCards = players[username].cards
    $('.gsp-player-card').each(function() {
      if (userCards.includes($(this).data('cardValue'))) {
        $(this).removeClass('hidden');
      } else {
        $(this).addClass('hidden');
      }
    });
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