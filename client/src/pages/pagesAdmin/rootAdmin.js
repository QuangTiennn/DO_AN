import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { routesAdmin } from '../../routes';
import SideBar from '../../components/componentsAdmin/sidebar/sidebar';
import NavBar from '../../components/componentsAdmin/navbar/navbar';

class rootAdmin extends Component {

    showContentMenu = (routesAdmin) => {
      let result = null;
      if (routesAdmin.length > 0) {
        result = routesAdmin.map((route, index) => (
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
      if (this.props.login.token) {
        return (
          <div>
            <NavBar />
            <SideBar />
            <Switch>
              { this.showContentMenu(routesAdmin) }
            </Switch>
          </div>
        );
      }
      this.props.history.push('/login');
      return null;
    }
}

const mapStateToProps = (state) => ({
  login: state.login,
});

export default connect(mapStateToProps, null)(rootAdmin);
