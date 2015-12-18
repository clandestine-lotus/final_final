import Decks from 'db/Decks'
import Shows from 'db/Shows'
import Codes from 'db/Codes'

// method for creating a new deck in database with svg elements
export default function (deckId) {
  // generate a new, code, overwrites any old ones
  // may cause conflicts if there are a hundred simultanous shows
  const code = Random.hexString(3)
  let doc = {
    ownerId: this.userId(),
    presenterIndex: 0,
    maxIndex: 0,
    deckId: deckId,
    createdAt: new Date(),
    // code: code,
  }

  // add show to the db
  const showId = Shows.insert(doc, function (err, showId) {
    if (err) {
      throw new Meteor.Error(err, 'did not insert show')
    }
  })
  
  // add code to the codes db
  Codes.upsert({code: code}, {deckId: deckId, showId: _id}) 

  return showId

}
