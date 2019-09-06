import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './publics/redux/store'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './screens/home'
import Login from './screens/login'
import History from './screens/history'
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cart: [],
      modal: false.length,
      cartDetail: [],
      total: 0
    }
  }
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path='/login' exact render={() => <Login />} />
            <Route path='/history' exact render={() => <History />} />
            <Route path='/' exact render={() => <Home />} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
