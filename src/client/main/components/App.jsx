import React from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {Provider} from 'react-redux';
import Nav from './Nav.jsx';
import configureStore from '../../store/configureStore';
import {verifyLogin} from '../../account/store/actions';
import {setPins, updatePinned} from '../store/actions';

import HomePage from './HomePage.jsx';
import RegisterPage from '../../account/components/RegisterPage.jsx';
import LoginPage from '../../account/components/LoginPage.jsx';
import LogoutPage from '../../account/components/LogoutPage.jsx';
import PinnedPage from './PinnedPage.jsx';
import UserPage from './UserPage.jsx';
import ManagePage from './ManagePage.jsx';
import AddPage from './AddPage.jsx';
import EditPage from './EditPage.jsx';
import AboutPage from './AboutPage.jsx';
import VerifyLogin from './VerifyLogin.jsx';
import NotFoundPage from './NotFoundPage.jsx';

// initialize store
const store = configureStore ({});
store.dispatch (verifyLogin ())
.then (() => {
  store.dispatch (setPins ())
  .then (() => {
    // setup router (react-router) with browserHistory
    render (
      <Router history={browserHistory}>
        <Route path='/' component={App}>
          <IndexRoute component={HomePage}/>
          <Route path='register' component={RegisterPage}/>
          <Route path='login' component={LoginPage}/>
          <Route path='logout' component={LogoutPage} onEnter={requireAuth}/>
          <Route path='pinned' component={PinnedPage} onEnter={requireAuth}/>
          <Route path='pins/:id' component={UserPage}/>
          <Route path='manage' component={ManagePage} onEnter={requireAuth}/>
          <Route path='add' component={AddPage} onEnter={requireAuth}/>
          <Route path='edit/:_id' component={EditPage} onEnter={requireAuth}/>
          <Route path='about' component={AboutPage}/>
          <Route path='verifyLogin' component={VerifyLogin}/>
          <Route path='*' component={NotFoundPage}/>
        </Route>
      </Router>,
      document.getElementById ('app')
    );
  });
});

// main class for app
export default class App extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      authenticated: store.getState ().user.authenticated
    };
  }

  // on mount, subscribe to listen for authentication status changes
  componentWillMount () {
    this.unsubscribe = store.subscribe (() => {
      let authenticated = store.getState ().user.authenticated;
      if (this.state.authenticated !== authenticated) {
        this.setState ({authenticated: authenticated});
        store.dispatch (updatePinned (authenticated));
      }
    });
  }

  // before unmount, remove store listener
  componentWillUnmount () {
    this.unsubscribe ();
  }

  // set up store top level element and header for all pages
  render () {
    return (
      <Provider store={store}>
        <div className='page'>
          <div className='pageHeader'>
            <Nav loggedIn={this.state.authenticated}/>
          </div>
          <div className='pageContent'>
            {this.props.children}
          </div>
        </div>
      </Provider>
    );
  }
}

// When a route requires an authenticated user, set onEnter to this
// method. If no authenticated user, change the route to the login
// route, then continue to the original route.
function requireAuth (nextState, replace) {
  if (store.getState ().user.authenticated === false) {
    replace ({
      pathname: '/login',
      state: {
        nextPathname: nextState.location.pathname
      }
    });
  }
}
