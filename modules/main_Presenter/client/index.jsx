/*
  This is the entry point. Export a react component here.
*/
import React, { Component } from 'react'
import { connect } from 'react-redux'

import Preview from './components/Preview'
import * as addPreviews from './components/PresenterActions'
import getPresentationList from './components/GetPresentationList'

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

// applyMiddleware supercharges createStore with middleware:
let createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

// We can use it exactly like “vanilla” createStore.
let store = createStoreWithMiddleware(rootReducer);

class Presenter extends Component {
  // This doesn't work anymore....................
  // getInitialState() {
  //   console.log('is this working??????????');

  //   // set previews to an empty array
  //   return {previews: []}
  // }

  // getPresentationList() {
  //   const addPreviews = this.props.addPreviews;

  //   // query for all presentations that are in user's google drive
  //   return GoogleApi.get('drive/v2/files?q=mimeType="application/vnd.google-apps.presentation"', {}, function (err, result) {
  //     if (err) console.error(err);
  //     // Map an array of preview objects with specific properties
  //     var previews = result.items.map((doc) => {
  //       return {
  //         link: doc.embedLink.replace('link', 'embed'),
  //         title: doc.title,
  //         thumbnail: doc.thumbnailLink,
  //         gid: doc.id
  //       };
  //     });

  //     // Create an action with previews to update store
  //     addPreviews(previews);
  //   });
  // }

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
    store.dispatch(addPreviews());
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
    // TODO: research the right way to get state props
    // TODO: FIX PREVIEWS.PREVIEWS
    previews: state.previews
  }
}
//
// function mapDispatchToProps() {

// }
export default connect(mapStateToProps, addPreviews)(Presenter)
