export const saveInLocalStorage = (userToken) => {
  localStorage.setItem('token', userToken);
};

export const getFromLocalStorage = () => {
  localStorage.getItem('token');
};
