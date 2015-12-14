import Presentations from '../../../main_SelectPresentation/globals/collections'
import ProjectorActions from './ProjectorActions'

export default function pageChanged(gid) {
  var query = Presentations.findOne({gid: gid})
  // var handle = query.observeChanges({
  //   changed: function (id, page) {
  //     console.log(page)
  //     // ProjectorActions.setPage(page)
  //   }
  // });
}
