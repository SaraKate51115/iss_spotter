
// const { fetchMyIP } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });

// const { fetchCoordsByIP } = require('./iss');

// fetchCoordsByIP('70.65.246.112', (error, coords) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
    
//   console.log('It worked! Returned Coordinates:' , coords);
// });

// const { fetchISSFlyOverTimes } = require('./iss');

// const exampleCoords = { lat: 51.0868, lon: -115.3504 };

// fetchISSFlyOverTimes(exampleCoords, (error, passes) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
        
//   console.log('It worked! Returned fly over times:' , passes);
// });

const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, passes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success
  console.log(passes);
});
