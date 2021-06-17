import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import ChatClient from '../../components/componentsChat/ChatDetail/chat-client';
import Footer from '../../components/componentsFE/footer/footer';
import Header from '../../components/componentsFE/header/header';
import { routes } from '../../routes';
import { history } from '../../store';

class rootFE extends Component {
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
    // if(!this.props.login.token) {
    //   history.push('/login')
    // }
    return (
      <div>
        <Header />
        <Switch>
          {this.showContentMenu(routes)}
        </Switch>
        <ChatClient />
        <Footer />
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  login: state.login,
});
export default connect(mapStateToProps, null)(rootFE);
