import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RootAdmin from './pages/pagesAdmin/rootAdmin';
import RootFE from './pages/pagesFE/rootFE';
import RootAuth from './pages/pagesAuth/rootAuth';
import NotFoundPage from './pages/pagesFE/notfoundpage/notfoundpage';
import 'react-toastify/dist/ReactToastify.min.css';

class App extends Component {
  showContentMenu = (routes) => {
    let result = null;
    if (routes.length > 0) {
      result = routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          component={route.main}
        />
      ));
    }
    return result;
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route path="/admin" component={RootAdmin} />
            <Route path="/login" component={RootAuth} />
            <Route path="/Register" component={RootAuth} />
            <Route path="/:slug" component={RootFE} />
            <Route exact path="/" component={RootFE} />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </Router>
    );
  }
}
export default App;
