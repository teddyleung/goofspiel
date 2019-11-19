$(() => {
  let localGameState = null;

  // TODO: with real JWT, we need to decode the base64 to actually get the username
  const username = document.cookie.replace(/(?:(?:^|.*;\s*)jwt\s*\=\s*([^;]*).*$)|^.*$/, "$1");
  
  const roundWinner = (round, playerPair) => {
    if (round[playerPair[0]] === null || round[playerPair[1]] === null) return false;

    if (round[playerPair[0]] === round[playerPair[1]]) return null;
    
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

  const renderPlayedCards = (playerOrder, playerCard) => {
    $(`#gsp-played-card-${playerOrder}`).text(playerCard);
  };

  const renderPlayerCards = userCards => {
    $('.gsp-player-card').each(function() {
      if (userCards.includes($(this).data('cardValue'))) {
        $(this).removeClass('hidden');
      } else {
        $(this).addClass('hidden');
      }
    });
  };

  const renderScore = (orderedPlayersPair, cards, history) => {
    const score = calcScore(cards, history, orderedPlayersPair);

    orderedPlayersPair.forEach((player, index) => {
      $(`#gsp-score-${index + 1}`).text(score[player]);
    });
  };

  const orderPlayers = players => Object.keys(players).sort((a, b) => {
    return players[a].order - players[b].order;
  });
  
  const render = gameState => {
    // TODO: split up the logic into separate functions. render() is too many lines
    
    const { cards, players, history } = gameState;
    
    const centerCard = cards[history.length - 1];
    $('#gsp-center-card').text(centerCard);

    const orderedPlayersPair = orderPlayers(players);

    orderedPlayersPair.forEach((player, index) => {
      const playerCard = history[history.length - 1][player];
      $(`#gsp-player-name-${index + 1}`).text(player);
      renderPlayedCards(index + 1, playerCard);
    });

    renderScore(orderedPlayersPair, cards, history);

    const userCards = players[username].cards
    renderPlayerCards(userCards);
  };
  
  $('.gsp-player-card').each(function() {
    $(this).click(() => {
      const history = localGameState.history;
      if (history[history.length - 1][username] === null) {
        const cardValue = $(this).data('cardValue');
        
        history[history.length - 1][username] = cardValue;
        renderPlayedCards(localGameState.players[username].order, cardValue);

        const newCards = [...localGameState.players[username].cards].filter(card => card !== cardValue);
        localGameState.players[username].cards = newCards;
        renderPlayerCards(newCards);

        const orderedPlayersPair = orderPlayers(localGameState.players);
        renderScore(orderedPlayersPair, localGameState.cards, localGameState.history);

        socket.emit('gsp-move', {
          card: cardValue
        });
      }
    });
  });

  socket.on('hydrate-state', data => {
    console.log(data);
    localGameState = data.gameState;
    render(data.gameState);
  });
});