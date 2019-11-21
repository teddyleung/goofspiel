// merge players from mulitple rows of one game into a single row and store
// it in to array, thus each item contains the whole data of each game

const formatGameData = (gameData) => {
  let gamesRow = [];
  let temp = {};
  for (let game of gameData) {
    if (temp['uuid'] !== game.uuid) {
      if (temp['uuid']) {
        gamesRow.push(temp);
        temp = {};
      }
      temp['uuid'] = game.uuid;
      temp['name'] = game.name;
      temp['file_name'] = game.file_name;
      temp['created_at'] = game.created_at;
      temp['started_at'] = game.started_at;
      temp['players'] = [];
      temp['players'].push(game.username);
    } else {
      temp['players'].push(game.username);
    }
  }
  if (temp['uuid']) {
    gamesRow.push(temp);
  }
  return gamesRow;

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
  console.array;
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
