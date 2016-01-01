import Audience from 'db/Audience'
import Shows from 'db/Shows'

  // method for changing the index of the slide for the current presentation
export function updatePace (id, delta) {

  Shows.update(
    {_id: id},
    {
      $setOnInsert: {rawSpeed: delta},
      $inc: {rawSpeed: delta},
    },
    { upsert: true }
  )
}

export function addAudience (show, user) {
  // increment viewer count for show
  Shows.upsert({_id: show}, {$inc: {"viewers": 1}}, function (err, result) {
    if (err) {
      throw new Meteor.Error(err, 'did not add to audience')
    }
  })
  // if user signed in, add to audience database
  if(user){
    let profile = {
      presentation: show,
      user: user._id,
      name: user.profile.name,
      thumbnail: user.services.google.picture
    }
    Audience.upsert({user: user._id }, profile, function (err, result) {
      if (err) {
        throw new Meteor.Error(err, 'did not add to audience')
      }
    })   
  }
}

export function removeAudience (show, user) {
  if(user) {
    Audience.remove({user: user}, function (err, result) {
      if (err) {
        throw new Meteor.Error(err, 'could not remove audience member')
      }
    })
  }
  Shows.upsert({_id: show}, {$inc: {"viewers": -1}}, function (err, result) {
    if (err) {
      throw new Meteor.Error(err, 'did not add to audience')
    }
  })
}
