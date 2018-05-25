// a library to wrap and simplify api calls
import apisauce from 'apisauce';

// our "constructor"
const create = (
  awsURL = 'http://promoterplusserverless-prod.eu-west-1.elasticbeanstalk.com/api/v1.0/'
) => {
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL: awsURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json'
    },
    // 10 second timeout...
    timeout: 10000
  });

  const loginRequest = ({ email, password, username, latitude, longitude }) =>
    api.post(
      'Security/Login',
      { email, password, username, latitude, longitude },
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );

  const sendProduct = ({ token, productId, count }) =>
    api.post(
      'StockCounts',
      { productId, count },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${token}`
        }
      }
    );

  const stockList = ({ token }) =>
    api.get(
      'Promotions/App',
      { token },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${token}`
        }
      }
    );

  const sendParticipant = ({ object, token }) =>
    api.post('Participant', object, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${token}`
      }
    });

  const sendFoot = ({
    token,
    ageId,
    buyingPowerId,
    genderId,
    raceId,
    startTime,
    endTime
  }) =>
    api.post(
      'Traffic',
      { ageId, buyingPowerId, genderId, raceId, startTime, endTime },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${token}`
        }
      }
    );

  const sendPhoto = ({ object, token }) =>
    api.post('Medias', object, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `bearer ${token}` }
    });

  return {
    loginRequest,
    sendPhoto,
    sendProduct,
    stockList,

    sendParticipant,

    sendFoot
  };
};

export default {
  create
};
