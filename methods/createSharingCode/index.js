const randomString = Meteor.npmRequire('random-string')

// keep object with already used strings to avoid dublicates
// TODO: refactor to do this in a less stupid way
var usedStrings = {}

var getRandomString = function (length) {
  return randomString({
    length: length,
    numeric: true,
    letters: true
  });
}

export default function (length) {
  var result;
  while (!result) {
    result = getRandomString(length);
    result = !usedStrings[result] ? result : undefined;
  }
  usedStrings[result] = true;
  return result;
}
