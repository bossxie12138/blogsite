import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch,Redirect } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import App from './App'
import { LOGIN } from './redux/actionTypes'
import { outRoutes } from './routes'
import store from './redux/store'
import reportWebVitals from './reportWebVitals'
import './styles/common.less'

if (localStorage.jwtToken) {
  store.dispatch({ data: jwtDecode(localStorage.jwtToken), type: LOGIN})
}

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        {
          outRoutes.map(item => (
            <Route key={item.path} path={item.path} component={item.component} />
          ))
        }
        <Route path="/ui"  component={App} />
        <Redirect from="/" to="/ui" exact />
        <Redirect to="/404" />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
