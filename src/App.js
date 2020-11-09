import React from 'react';
import {Route, Switch, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import Layout from './components/Layout/Layout';

import * as actionCreator from './store/actions/index';

import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';

class App extends React.Component {
  componentDidMount(){
    this.props.getToken();
  };

  render(){
    let routes = (
        <Switch>
          <Route path="/auth" component={Auth} />
          <Route path="/" exact component={BurgerBuilder} /> 
          <Redirect to="/" />
        </Switch>
      );
    if (this.props.isAuth){
      routes = (<Switch>
          <Route path="/orders" component={Orders} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={BurgerBuilder} /> 
          <Redirect to="/" />
        </Switch>);
    };

    return (
      <Layout>
      	{routes}
      </Layout>
  );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.isAuth
  };
}

const dispatchActionsFromProps = dispatch => {
  return{
    getToken: () => dispatch(actionCreator.getInitialState())
  };
}

export default withRouter(connect(mapStateToProps, dispatchActionsFromProps)(App));
