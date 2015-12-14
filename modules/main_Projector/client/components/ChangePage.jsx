import Presentations from '../../../main_SelectPresentation/globals/collections'

export default function pageChanged(gid) {
  var query = Presentations.find({gid: gid})
  var handle = query.observeChanges({
    changed: function (id, changed) {
      console.log(changed)
      state.projector.setPresentation.set('page', changed.page)
    }
  });
}
