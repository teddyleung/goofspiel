$(() => {
  let localGameState = null;
  const WIN_SCORE = 45;
  const cardText = {
    '1': 'A',
    '11': 'J',
    '12': 'Q',
    '13': 'K'
  };

  // TODO: with real JWT, we need to decode the base64 to actually get the username
  const username = document.cookie.replace(/(?:(?:^|.*;\s*)jwt\s*\=\s*([^;]*).*$)|^.*$/, "$1");
  
  const roundWinner = (round, playerPair) => {
    if (round[playerPair[0]] === null || round[playerPair[1]] === null) return false;

    if (round[playerPair[0]] === round[playerPair[1]]) return null;
    
    return round[playerPair[0]] > round[playerPair[1]] ? playerPair[0] : playerPair[1];
  };

  const convertCardNumToText = cardValue => {
    return cardText[String(cardValue)] || cardValue;
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
    $(`#gsp-played-card-${playerOrder}`).text(convertCardNumToText(playerCard));
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
    const percentWidthToReachEnd = 90;

    orderedPlayersPair.forEach((player, index) => {
      $(`#gsp-score-${index + 1}`).text(WIN_SCORE - score[player]);
      $(`#gsp-sprite-player-${index + 1}`).css('left', `${Math.min(score[player] / WIN_SCORE * percentWidthToReachEnd, percentWidthToReachEnd)}%`);
    });
  };

  const renderWinner = (orderedPlayersPair, cards, history) => {
    const score = calcScore(cards, history, orderedPlayersPair);

    if (score[orderedPlayersPair[0]] >= WIN_SCORE && score[orderedPlayersPair[1]] >= WIN_SCORE) {
      $('#gsp-winner-banner').text('You Tie!');
    } else if (score[orderedPlayersPair[0]] >= WIN_SCORE) {
      $('#gsp-winner-banner').text(orderedPlayersPair[0] === username ? 'You Win!' : 'You Lose!');
    } else if (score[orderedPlayersPair[1]] >= WIN_SCORE) {
      $('#gsp-winner-banner').text(orderedPlayersPair[1] === username ? 'You Win!' : 'You Lose!');
    } else {
      return;
    }

    // set color to your color
    const color = orderedPlayersPair[0] === username ? 'blue' : 'red';
    $('#gsp-winner-banner').addClass(`gsp-text-box__${color}`);
    //unhide
    $('#gsp-winner-banner-modal').removeClass('hidden');
  };

  const orderPlayers = players => Object.keys(players).sort((a, b) => {
    return players[a].order - players[b].order;
  });
  
  const render = gameState => {
    // TODO: split up the logic into separate functions. render() is too many lines
    
    const { cards, players, history } = gameState;
    
    const centerCard = cards[history.length - 1];
    $('#gsp-center-card').text(convertCardNumToText(centerCard));

    const orderedPlayersPair = orderPlayers(players);

    orderedPlayersPair.forEach((player, index) => {
      const playerCard = history[history.length - 1][player];
      $(`#gsp-player-name-${index + 1}`).text(player);
      renderPlayedCards(index + 1, playerCard);
    });

    renderScore(orderedPlayersPair, cards, history);
    renderWinner(orderedPlayersPair, cards, history);

    const userCards = players[username].cards
    renderPlayerCards(userCards);
  };

  const renderDefault = gameState => {
    $('.gsp-player-card').removeClass('hidden');
    $('#gsp-gameboard').addClass('gsp-not-started');
    $('#gsp-player-name-1').text(Object.keys(gameState.players)[0]);
    $('#gsp-player-name-2').text('Waiting');
    $('.gsp-player-score').text(45);
  }
  
  $('.gsp-player-card').each(function() {
    $(this).click(() => {
      const history = localGameState.history;
      
      if (Object.keys(localGameState.players).length < 2) {
        console.log('clicked but no second player');
        return;
      }

      if (history[history.length - 1][username] === null) {
        const cardValue = $(this).data('cardValue');
        
        history[history.length - 1][username] = cardValue;
        renderPlayedCards(localGameState.players[username].order, cardValue);

        const newCards = [...localGameState.players[username].cards].filter(card => card !== cardValue);
        localGameState.players[username].cards = newCards;
        renderPlayerCards(newCards);

        const orderedPlayersPair = orderPlayers(localGameState.players);
        renderScore(orderedPlayersPair, localGameState.cards, localGameState.history);
        renderWinner(orderedPlayersPair, localGameState.cards, localGameState.history);

        socket.emit('gsp-move', {
          card: cardValue
        });
      }
    });
  });

  socket.on('hydrate-state', data => {
    console.log(data);
    localGameState = data.gameState;
    // TODO only render game state if there are two players. Otherwise, render default renderDefault()
    if (Object.keys(data.gameState.players).length < 2) {
      renderDefault(data.gameState);
    } else {
      $('#gsp-gameboard').removeClass('gsp-not-started');
      render(data.gameState);
    }
  });
});