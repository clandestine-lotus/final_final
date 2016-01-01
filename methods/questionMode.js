import Shows from 'db/Shows'

export default function (showId, state) {
  const show = Shows.findOne(showId)
  if(Meteor.userId() === show.ownerId) {
    Shows.update(showId, {$set: {questionMode: state}})
  } else { 
    throw new Meteor.Error('user is not presenter')
  }
}
