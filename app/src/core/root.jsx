import AppRoutes from 'Core/routes'
import React from 'react'
import { Provider } from 'react-redux'
import { HistoryRouter } from 'redux-first-history/rr6'
import Nav from './nav'
import './root.css'

class Root extends React.Component {
  render() {
    const { store, history } = this.props

    return (
      <React.Fragment>
        <Provider store={store}>
          <HistoryRouter history={history}>
            <Nav history={history}></Nav>
            <AppRoutes></AppRoutes>
          </HistoryRouter>
        </Provider>
      </React.Fragment>
    )
  }
}

export default Root
