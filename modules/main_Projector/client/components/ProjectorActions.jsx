import Presentations from '../../main_SelectPresentation/globals/collections'

const SET_PRESENTATION = 'SET_PRESENTATION';

export function setPresentation(id) {
  return {
    type: SET_PRESENTATION,
    payload: id
  }
}

// export function getPresentation (gid) {
//   return (dispatch, getState) => {
//     Presentations.findOne({gid: gid})

//     GoogleApi.get('drive/v2/files?q=mimeType="application/vnd.google-apps.presentation"', {}, function (err, result) {
//       if (err) console.error(err);
//       // Map an array of preview objects with specific properties
//       var previews = result.items.map((doc) => {
//         return {
//           link: doc.embedLink.replace('link', 'embed'),
//           title: doc.title,
//           thumbnail: doc.thumbnailLink,
//           gid: doc.id
//         };
//       });
//       console.log(previews);
//       dispatch(addPreviews(previews))
//     })
//   }
// }

// presentation() {
//     // declare identifier variables in function scope
//     let user = Meteor.user()._id;
//     let link = this.props.data.link;
//     let gid = this.props.data.gid;
//     let react = this;
//     // opens a query and waits for a change to occur
//     // call method to create a presentation
//     Meteor.call('createPresentation', link, user, gid, function (err, result) {
//       if (err) {
//         console.error('from preview ', err);
//       }
//       console.log(react);
//       console.log(result);
//       react.props.setPresentation(gid);
//       // reRoute to the projector view!
//       // react.history.pushState(null, '/present');
//       window.open('/projector/' + gid);

//     })
//   }