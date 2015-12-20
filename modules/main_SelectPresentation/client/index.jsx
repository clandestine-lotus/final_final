/*
  This is the entry point. Export a react component here.
*/
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import * as PresenterActions from './components/PresenterActions.jsx'

import {GridList, GridTile, CircularProgress} from 'material-ui'

let Presenter = React.createClass({
  componentWillMount() {
    this.props.getPreviews();
  },

  componentDidUpdate() {
    // Fixes dialog's padding-top not being set correctly
    window.dispatchEvent(new Event('resize'))
  },

  render() {
    const tileStyle = {
      height: '15rem',
      color: 'white',
    }

    return (
      <div className="container">
        <div className="row" style={tileStyle}>
          {
            this.props.previews.size ?
              <GridList className="twelve columns"
                padding={8}
                cols={2}
              >
                {
                  this.props.previews.map(preview =>
                    <Link
                      to={'/present'}
                      key={preview.gid}
                    ><GridTile
                      title={preview.title}
                      style={tileStyle}
                      children={<img src={preview.thumbnail} />}
                      onClick={this.props.setPresentation.bind(null, preview.gid)}
                    /></Link>
                  )
                }
              </GridList> :
              <CircularProgress mode="indeterminate" size={1.5} />
            }
          }
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
