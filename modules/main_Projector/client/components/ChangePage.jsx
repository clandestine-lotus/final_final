import Presentations from 'db/Presentations'

export default function pageChanged(gid) {
  var query = Presentations.find({gid: gid})
  var handle = query.observeChanges({
    changed: function (id, changed) {
      console.log('changed ', store.getState())
      Meteor.call('changeIndex', this.props.presentation, changed.index);
    }
  });
}

// Tracker.autorun(()=>{
//   let presentationID = store.getState().previews.list.get('presentation')
//   if (presentationID){
//     let pres = Presentations.findOne({gid: presentationID});
//     store.dispatch(setIndex(pres.index))
//   } 
// })
