// merge players from mulitple rows of one game into a single row and store
// it in to array, thus each item contains the whole data of each game
const formatGameData = (gameData) => {
  return gameData.map(game => {
    return {
      ...game,
      players: Object.keys(game.game_state.players)
    }
  });
};

const getAllGamesName = (gameArray, key) => {
  let array = [];
    
  if (gameArray.length > 0) {
    let name = gameArray[0][key];
    array.push(name);
      
    for (let game of gameArray) {
      if (game[key] !== name) {
        name = game[key];
        array.push(name);
      }
    }
  }
  return array;
};

const formatGameDate = (time) => {
  const date = new Date(time);
  const monArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();

  return `${monArr[month]} ${day}, ${year}`;
};


module.exports = {
  getAllGamesName,
  formatGameData,
  formatGameDate
};
