import React from 'react';
import {Route, Switch, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import Layout from './components/Layout/Layout';

import asyncComponent from './hoc/asyncComponent';

import * as actionCreator from './store/actions/index';

import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

import Logout from './containers/Auth/Logout/Logout';

const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout');
});

const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders');
});

const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth');
});

class App extends React.Component {
  componentDidMount(){
    this.props.getToken();
  };

  render(){
    let routes = (
        <Switch>
          <Route path="/auth" component={asyncAuth} />
          <Route path="/" exact component={BurgerBuilder} /> 
          <Redirect to="/" />
        </Switch>
      );
    if (this.props.isAuth){
      routes = (<Switch>
          <Route path="/orders" component={asyncOrders} />
          <Route path="/auth" component={asyncAuth} />
          <Route path="/checkout" component={asyncCheckout} />
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
