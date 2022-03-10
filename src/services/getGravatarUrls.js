import md5 from 'crypto-js/md5';

const getGravatarUrl = (email) => {
  const hash = md5(email).toString();
  return `https://www.gravatar.com/avatar/${hash}`;
};

export default getGravatarUrl;
// console.log(md5('felipe.eleotero@gmail.com').toString());
