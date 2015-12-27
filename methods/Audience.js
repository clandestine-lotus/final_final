import Audience from 'db/Audience'

  // method for changing the index of the slide for the current presentation
export function updatePace (id, delta) {
  Audience.update(
    {presId: id},
    {
      $setOnInsert: {rawSpeed: delta},
      $inc: {rawSpeed: delta},
    },
    { upsert: true }
  )
}

export function updateUserCount (id, delta) {
  Audience.update(
    {presId: id},
    {
      $setOnInsert: {numUsers: 1},
      $inc: {numUsers: delta},
    },
    { upsert: true }
  )
}

export function addAudience (show, user) {
  let profile = {
    presentation: show,
    user: user._id,
    name: user.profile.name,
    thumbnail: user.services.google.picture 
  }

  return Audience.upsert({user: user._id }, profile, function (err, result) {
    if (err) {
      throw new Meteor.Error(err, 'did not add to audience')
    }
  })
}

export function removeAudience (user) {
  Audience.remove({user: user}, function (err, result) {
    if (err) {
      throw new Meteor.Error(err, 'could not remove audience member')
    }
  })
}
