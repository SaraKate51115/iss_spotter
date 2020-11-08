//will contain most of the logic for fetching the data from each API endpoint.

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const request = require('request');

const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request('https://api.ipify.org?format=json', (error, response, body) => {

    if (error) return callback(error, null); //pass through the error to the callback if an error occurs when requesting the IP data
    
    // if non-200 status, assume server error
    if (response.statusCode !== 200) { //Use the following code to check for errors in our request callback.
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null); //Error(...) creates a new error object that we can pass around //we pass it back to the callback to indicate that something went wrong.
      return;
    }

    const ip = JSON.parse(body).ip; //REVIEW THIS// parse and extract the IP address using JSON
    callback(null, ip); //then pass that through to the callback (as the second argument) if there is no error

  });
};



const fetchCoordsByIP = function(ip, callback) {
  request(`http://ip-api.com/json/${ip}`, (error, response, body) => { //70.65.246.112

    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const lat = JSON.parse(body).lat;
    const lon = JSON.parse(body).lon;
    const coords = {lat, lon}; //
    //console.log(coords.lat)
    callback(null, coords); //
  });
};

const fetchISSFlyOverTimes = function(coords, callback) { //
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.lat}&lon=${coords.lon}`, (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
  
    const passes = JSON.parse(body).response;
    //console.log(passes)
    callback(null, passes);
  });
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(coords, (error, passes) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, passes);
      });
    });
  });
};

// module.exports = { fetchMyIP };
// module.exports = { fetchCoordsByIP };
// module.exports = { fetchISSFlyOverTimes };
module.exports = { nextISSTimesForMyLocation };