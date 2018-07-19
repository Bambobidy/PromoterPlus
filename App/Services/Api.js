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
      'Cache-Control': 'no-cache'
    },
    // 10 second timeout...
    timeout: 10000
  });

  const api2 = apisauce.create({
    // base URL is read from the "constructor"
    baseURL: awsURL,
    // here are some default headers
    headers: {
      'Content-Type': 'multipart/form-data',
      'Cache-Control': 'no-cache'
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

  const sendProduct = ({ token, promotionId, productId, count }) =>
    api.post(
      'StockCounts',
      { productId, count, promotionId },
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
    api.post('Participants', object, {
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
    endTime,
    promotionId
  }) =>
    api.post(
      'Traffic',
      { ageId, buyingPowerId, genderId, raceId, startTime, endTime, promotionId },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${token}`
        }
      }
    );

  const sendPhoto = ({ token, form }) => {
    api2.setHeader('content-Type', 'multipart/form-data');
    api2.setHeader('Authorization', `Bearer ${token}`);
    return api2.post('Medias', form);
  };

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
