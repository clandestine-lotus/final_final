import Presentations from './collections'

export function choosePresentation (params) {
  console.log(params);
  // Presentations.insert({

  // });
}




// Presentations.find({gid: gid.toString()}).observe({
//       added: function (newDoc) {
//         console.log('we have a change', newDoc);
//         react.setState({svgs: newDoc.svgs});

//       }
//     });
//     // call method to create a presentation
//     Meteor.call('createPresentation', link, user, gid, function (err, result) {
//       if(err){
//         console.error(err);
//       };
//     })
