const { nextISSTimesForMyLocation } = require('./iss_promised');
// const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss_promised');

nextISSTimesForMyLocation()
  .then((passes) => {
    console.log(passes);
  })
  .catch((error) => {
    console.log(`It didn't work: `, error.message);
  })

// fetchMyIP()
//   .then(fetchCoordsByIP)
//   .then(fetchISSFlyOverTimes)
//   .then(body => console.log(body));
  