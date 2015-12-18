import Codes from 'db/Codes'
import Presentations from 'db/Presentations'

const randomString = Meteor.npmRequire('random-string')

// keep object with already used strings to avoid dublicates
// TODO: refactor to do this in a less stupid way
var getRandomString = function (length) {
  return randomString({
    length: length,
    numeric: true,
    letters: false
  });
}

export default function (length) {
  var existingCodes = [];
  do {
    var code = getRandomString(length);
    existingCodes = Presentations.find({code: code}).fetch();
  } while (existingCodes.length);
  return code;
}
