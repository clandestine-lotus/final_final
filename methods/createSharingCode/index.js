import Codes from 'db/Codes'

const randomString = Meteor.npmRequire('random-string')

// keep object with already used strings to avoid dublicates
// TODO: refactor to do this in a less stupid way
// TODO: also needs to clean used strings list when no longer used
var usedStrings = {}

var getRandomString = function (length) {
  return randomString({
    length: length,
    numeric: true,
    letters: false
  });
}

export default function (length) {
  var existingCodes = [null];
  while (existingCodes.length) {
    var code = getRandomString(length);
    existingCodes = Codes.find({code: code}).fetch();
  }
  return code;
}
