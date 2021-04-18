import React from 'react'
import { Route, Redirect,Switch } from 'react-router-dom'
import { UiLayout } from './components'
import { mainRoutes } from './routes'

function App() {
  return (
    <UiLayout>
      <Switch>
        {
          mainRoutes.map(item => (
            <Route key={item.path} path={item.path} component={item.component} />
          ))
        }
        <Redirect from="/ui" to="/ui/index" exact />
        <Redirect to="/404" />
      </Switch>
    </UiLayout>
  )
}

export default App
