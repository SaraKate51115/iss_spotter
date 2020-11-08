const request = require('request-promise-native');

const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  return request(`http://ip-api.com/json/${ip}`);//p
};

const fetchISSFlyOverTimes = function(body) {
  //const { latitude, longitude } = JSON.parse(body).data;
  const lat = JSON.parse(body).lat;
  const lon = JSON.parse(body).lon;
  const coords = {lat, lon}; //
  const url = `http://api.open-notify.org/iss-pass.json?lat=${coords.lat}&lon=${coords.lon}`;
  return request(url);
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((body) => {
      const /*{ response }*/ passes = JSON.parse(body).response;
      return passes;
    });
};

module.exports = { nextISSTimesForMyLocation };
//module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes};
  