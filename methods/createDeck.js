const getSVG = Meteor.npmRequire('google-slides-downloader')
import Decks from 'db/Decks'

// method for creating a new deck in database with svg elements
export default function (url, gid) {
  const userId = this.userId

  let doc = {
    url: url,
    ownerId: userId,
    gid: gid,
    createdAt: new Date(),
  }

  let doIt = Meteor.bindEnvironment((err, svgs) => {
    if (err) {
      throw new Meteor.Error('from bind env ', err)
    } else {
      // doc to add
      doc.svgs = svgs
      doc.numSlides = svgs.length
      Decks.upsert({gid: gid}, {$set: doc})
    }
  })

  let transition = Meteor.bindEnvironment((err, transitions) => {
    if(err) {
      throw new Meteor.Error('from bind env and transition grabber', err) 
    } else {
      doc.transitions = transitions
      Decks.upsert({gid: gid}, {$set: doc})
    }
  })
  
  // change privacy setting of the presentation to public
  GoogleApi.post('drive/v2/files/' + gid + '/permissions',
                {data: {'type': 'anyone', 'role': 'reader'}},
                function (err, result) {
                  if (err){
                    throw new Meteor.Error('GoogleAPI: ' + err)
                  } else {
                    // pass in url to get an array of svgs and an array of transitions
                    getSVG.getSvgsFromUrl(url, doIt)
                    getSVG.getElementEffectsFromUrl(url, transition)
                  }
                })
}
