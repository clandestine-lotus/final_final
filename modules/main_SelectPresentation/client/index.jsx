/*
  This is the entry point. Export a react component here.
*/
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import Preview from './components/Preview'
import * as PresenterActions from './components/PresenterActions.jsx'

import {GridList, GridTile} from 'material-ui'

// import { bindActionCreators, createStore, applyMiddleware } from 'redux'
// import thunk from 'redux-thunk'
// import rootReducer from './reducers'


let Presenter = React.createClass({
  componentWillMount: function (props) {
    this.props.getPreviews();
    console.log(this);
    // return {};
  },

  // compnentWillMount() {
  //   console.log(mui);

  //   // const {Slider} = mui
  // },

  render: function () {
    let setPres = this.props.setPresentation
    const s2 = {
      backgroundColor: 'papayawhip',
    }
    const s1 = {
      backgroundColor: 'firebrick',
    }
    const tileStyle = {
      height: '150px',
      color: 'white',
    }

    return (
      <div className="container">
        <h1>Select a Presentation</h1>
        <div className="row" style={tileStyle}>
            <GridList
              className="four columns"
              cols={1}
            >
              {
                this.props.previews.map(preview => <Link to={'/present/' + preview.gid}><GridTile
                  title={preview.title}
                  style={tileStyle}
                  setPresentation={setPres}

                  className=""
                  ><img src={preview.thumbnail} /></GridTile></Link>
                )
              }
            </GridList>

          <div className="eight columns" style={s1}>y
          </div>
        </div>
        <header>

          <Link to = {'/present'}>Go to presentation</Link>

        </header>
        {this.props.previews.map((preview)=> {
          return <Preview setPresentation={setPres} key={preview.gid} data={preview} />
        })}
      </div>
    );
  }
})

function mapStateToProps (state) {
  return {
    // TODO: research the right way to get state props
    // TODO: FIX PREVIEWS.PREVIEWS
    previews: state.previews.list.get('previews')
  }
}

export default connect(mapStateToProps, PresenterActions)(Presenter)
