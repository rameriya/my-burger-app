import React, {useEffect, Suspense, useCallback} from 'react';
import {Route, Switch, Redirect, withRouter} from 'react-router-dom';
import {connect, useDispatch, useSelector} from 'react-redux';

import Layout from './components/Layout/Layout';

import * as actionCreator from './store/actions/index';

import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

import Logout from './containers/Auth/Logout/Logout';
import Spinner from './components/UI/Spinner/Spinner';

const Checkout = React.lazy(() => {
  return import('./containers/Checkout/Checkout');
});

const Orders = React.lazy(() => {
  return import('./containers/Orders/Orders');
});

const Auth = React.lazy(() => {
  return import('./containers/Auth/Auth');
});

const App = props => {

  const dispatch = useDispatch();

  const getToken = () => dispatch(actionCreator.getInitialState());

  const isAuth = useSelector(state => state.auth.isAuth);

  useEffect(() => {
    getToken();
  },[getToken]);

  let routes = (
        <Switch>
          <Route path="/auth" render={() => <Auth />} />
          <Route path="/" exact component={BurgerBuilder} /> 
          <Redirect to="/" />
        </Switch>
      );
    if (isAuth){
      routes = (<Switch>
          <Route path="/orders" render={() => <Orders />} />
          <Route path="/auth" render={() => <Auth />} />
          <Route path="/checkout" render={() => <Checkout />} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={BurgerBuilder} /> 
          <Redirect to="/" />
        </Switch>);
    };

    return (
      <Layout>
      	<Suspense fallback={<Spinner />}>{routes}</Suspense>
      </Layout>
  );
}


export default withRouter(App);
