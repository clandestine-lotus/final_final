/*
  This is the entry point. Export a react component here.
*/
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import * as PresenterActions from 'dux/PresenterReductions'

import { GridList, GridTile, CircularProgress } from 'material-ui'
// TODO: Use theming to pick colors
import { Colors } from 'material-ui/styles'


let Presenter = React.createClass({
  componentWillMount() {
    this.props.getPreviews();
  },

  componentDidUpdate() {
    // Fixes dialog's padding-top not being set correctly
    window.dispatchEvent(new Event('resize'))
  },

  render() {
    const tile = {
      height: '15rem',
    }

    const progress = {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -100%)',
    }

    if (this.props.previews.size) {
      return (
        <GridList className="twelve columns"
          padding={8}
          cols={3}
        >
          {
            this.props.previews.map(preview =>
              <Link
                to={'/present'}
                key={preview.gid}
              ><GridTile
                title={preview.title}
                children={<img src={preview.thumbnail}/>}
                onClick={this.props.setPresentation.bind(null, preview.gid)}
                style={tile}
              /></Link>
            )
          }
        </GridList>
      )
    } else {
      return <CircularProgress mode="indeterminate" size={1.5} style={progress} />
    }
  }
})

function mapStateToProps (state) {
  return {
    previews: state.previews.get('list')
  }
}

export default connect(mapStateToProps, PresenterActions)(Presenter)
