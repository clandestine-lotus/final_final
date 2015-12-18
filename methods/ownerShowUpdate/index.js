import Shows from 'db/Shows'

  // method for changing the index of the slide for the current presentation
export default function (index, id) {
  let show = Shows.findOne({_id: id})
  let setObj = {}
  if (!show){
    throw new Meteor.Error(500)
  }
  // check if owner
  if (show.ownerId === this.userId){
    setObj.presenterIndex = index
    if (show.maxIndex < index) {
      setObj.maxIndex = index
    }
  } else {
    throw new Meteor.Error('Not the owner changing the persenterIndex!')
  }
  Shows.update({_id: id}, {$set: setObj}, function (err, count) {
    console.log(err || ('Changed: ' + count));
    if (err){
      throw new Meteor.Error('Update Failed')
    } else {
      return setObj
    }
  })    
}

