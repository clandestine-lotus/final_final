import * as addPreviews from './PresenterActions'

export default function getPresentationList() {
  // const addPreviews = this.props.addPreviews;

  // query for all presentations that are in user's google drive
  return GoogleApi.get('drive/v2/files?q=mimeType="application/vnd.google-apps.presentation"', {}, function (err, result) {
    if (err) console.error(err);
    // Map an array of preview objects with specific properties
    var previews = result.items.map((doc) => {
      return {
        link: doc.embedLink.replace('link', 'embed'),
        title: doc.title,
        thumbnail: doc.thumbnailLink,
        gid: doc.id
      };
    });

    // Create an action with previews to update store
    addPreviews(previews);
  });
}
