const shuffle = array => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const createGameState = () => {
  const suit = [1,2,3,4,5,6,7,8,9,10,11,12,13];
  return {
    history: [{
      a: null,
      b: null
    }],
    a: [...suit],
    b: [...suit],
    cards: shuffle([...suit]),
  };
};

console.log(createGameState());