/*
  This is the entry point. Export a react component here.
*/
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import * as PresenterActions from './components/PresenterActions.jsx'

import {GridList, GridTile} from 'material-ui'

let Presenter = React.createClass({
  componentWillMount() {
    this.props.getPreviews();
  },

  render() {
    let select = this.props.setPresentation
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
          <GridList className="four columns"
            cols={1} >
            {
              this.props.previews.map(preview =>
                <Link to={'/present'}>
                  <GridTile
                    title={preview.title}
                    style={tileStyle}
                    children={<img src={preview.thumbnail} />}
                    onClick={select.bind(null, preview.gid)} />
                </Link>
              )
            }
          </GridList>

          <div className="eight columns" style={s1}>y
          </div>
        </div>
      </div>
    );
  }
})

function mapStateToProps (state) {
  return {
    previews: state.previews.get('list')
  }
}

export default connect(mapStateToProps, PresenterActions)(Presenter)
