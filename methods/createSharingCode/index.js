const randomString = Meteor.npmRequire('random-string')

// method for creating a new presentation in database with svg elements
export default function (length) {
  // change privacy setting of the presentation to public
  return randomString({
    length: length,
    numeric: true,
    letters: true
  })
}
