const data = require('../data/zip-codes-to-geo-coords.json')

async function ZipToGeolocation(zipcode) {
  return data[String(zipcode)]
}

module.exports = ZipToGeolocation;
