/*
  This is the entry point. Export a react component here.
*/
import React, { Component } from 'react';

import Preview from './components/Preview'
import addPreviews from '../components/PresenterActions'

class Presenter extends Component {
  // This doesn't work anymore....................
  // getInitialState() {
  //   console.log('is this working??????????');

  //   // set previews to an empty array
  //   return {previews: []}
  // }

  getPresentationList() {
    // query for all presentations that are in user's google drive
    return GoogleApi.get('drive/v2/files?q=mimeType="application/vnd.google-apps.presentation"', null, function (err, result) {
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

  // grabDocs() {
  //   // get presentations
  //   return this.getPresentationList((result) => {
  //     // extract important data from presentation objects that we get back from google drive API
  //     return result.items.map((doc) => {
  //       return {
  //         link: doc.embedLink.replace('link', 'embed'),
  //         title: doc.title,
  //         thumbnail: doc.thumbnailLink,
  //         gid: doc.id
  //       }
  //     });
  //   });
  // }

  renderPreviews() {
    // iterate over previews and create a new Preview for each item in the array
    // Make call to database instead of this.state.previews
    return this.props.previews.map((preview) => {
      return (
        <Preview
          key={preview.gid}
          data={preview} />
      )
    })
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>OMG PREVIEWS PLZ</h1>

          <ul className="presentation_list">
            {this.renderPreviews()}
          </ul>
        </header>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    previews: state.get('previews')
  }
}

// function mapDispatchToProps() {

// }
export default connect(mapStateToProps)(Presenter)
