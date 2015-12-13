// const getSVG = Meteor.npmRequire('google-slides-downloader')
import Presentations from 'main_SelectPresentation/globals/collections'


Meteor.methods({
  // method for creating a new presentation in database with svg elements
  changeIndex: function (gid, index, cb) {
    // change privacy setting of the presentation to public
    Presentations.update({gid: gid.toString()}, {$set: {index: index}}, {upsert: true})
  }
})
