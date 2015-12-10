import { createHistory } from 'history'
import { Provider } from 'react-redux'
import { syncReduxAndRouter } from 'redux-simple-router'
import { Router, Route, Link, IndexRoute } from 'react-router'


// import redux elements
import DevTools from './redux/DevTools.jsx'
import store from './redux/store.jsx'

import rootRoute from './routes.jsx'

// bind redux and router with history
const history = createHistory()
syncReduxAndRouter(history, store)


if (process.env.NODE_ENV !== 'production' && !process.env.IS_MIRROR) {
  // DEV: expose store as a global var
  window.store = store
}

class Root extends React.Component {
  render() {
    const { store } = this.props;
    if (process.env.NODE_ENV !== 'production' && !process.env.IS_MIRROR){
      return (
        <Provider store={store}>
          <div>
            <Router history={history} routes={rootRoute} />
            <DevTools />
          </div>
        </Provider>
        )
    } else {
      return (
      <Provider store={store}>
        <div>
          <Router history={history} routes={rootRoute} />
          <DevTools />
        </div>
      </Provider>
      )
    }
  }
}

// render to '#main' in <body> from main.html
ReactDOM.render(<Root store={store} />, document.getElementById('main')
)
