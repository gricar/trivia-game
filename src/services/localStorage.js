export const getRanking = () => {
  const actualRanking = localStorage.getItem('PLAYER_RANKING');
  return !actualRanking ? [] : JSON.parse(actualRanking);
};

export const saveRanking = (playerData) => {
  const playersList = getRanking();
  localStorage.setItem('PLAYER_RANKING', JSON.stringify([...playersList, playerData]));
};

export const saveInLocalStorage = (userToken) => {
  localStorage.setItem('token', userToken);
};

export const getFromLocalStorage = () => {
  localStorage.getItem('token');
};
