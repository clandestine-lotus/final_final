import Shows from 'db/Shows'

  // method for changing the index of the slide for the current presentation
export default function (index, transition, id) {
  let show = Shows.findOne({_id: id})
  let setObj = {}
  if (!show){
    throw new Meteor.Error(500)
  }
  // check if owner
  if (show.ownerId === this.userId){
    setObj.presenterIndex = index
    setObj.presenterTransition = transition
    // if the current Index is the maxIndex AND the maxTransition is less than current Transition
    if(show.maxIndex === index && show.maxTransition < transition) {
      // resent maxTransition
      setObj.maxTransition = transition
    }
    if (show.maxIndex < index) {
      setObj.maxIndex = index
      setObj.maxTransition = 0
    }
  } else {
    throw new Meteor.Error('Not the owner changing the persenterIndex!')
  }
  Shows.update({_id: id}, {$set: setObj}, function (err, count) {
    if (err){
      throw new Meteor.Error('Update Failed')
    } else {
      return setObj
    }
  })
}

