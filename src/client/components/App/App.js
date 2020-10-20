import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import { GlobalStyle } from './GlobalStyle';
import { AuthRoute } from './AuthRoute';
import { verifyLogin } from '../../store/userActions';
import { setPins } from '../../store/appActions';
import { Header } from './Header';
import { ScrollToTop } from '../../lib/ScrollToTop';
import { Page, Box } from '../../lib/Layout';

import { HomePage } from '../HomePage';
import { RegisterPage, LoginPage } from '../User';
import { LogoutPage } from '../LogoutPage';
import { PinnedPage } from '../PinnedPage';
import { UserPinsPage } from '../UserPinsPage';
import { ManagePinsPage } from '../ManagePinsPage';
import { AddPin, EditPin } from '../EditPin';
import { AboutPage } from '../AboutPage';
import { NotFoundPage } from './NotFoundPage';

export class AppBase extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      loading: true,
    };
  }

  async componentDidMount () {
    await this.props.dispatch (verifyLogin ());
    await this.props.dispatch (setPins ());
    this.setState ({ loading: false });
  }

  render () {
    if (this.state.loading) {
      return (
        <ThemeProvider theme={theme}>
          <>
            <GlobalStyle />
            <Page>
              <Header menu={false} />
              <Box mt='120px' center>Loading ...</Box>
            </Page>
          </>
        </ThemeProvider>
      );
    }
    const { authenticated } = this.props;
    return (
      <BrowserRouter>
        <ScrollToTop>
          <ThemeProvider theme={theme}>
            <>
              <GlobalStyle />
              <Page>
                <Header menu />
                <Switch>
                  <Route exact path='/' component={HomePage} />
                  <Route exact path='/register' component={RegisterPage} />
                  <Route exact path='/login' component={LoginPage} />
                  <Route exact path='/logout' component={LogoutPage} />
                  <AuthRoute exact path='/pinned' authenticated={authenticated} component={PinnedPage} />
                  <Route exact path='/pins/:id' component={UserPinsPage} />
                  <AuthRoute exact path='/manage' authenticated={authenticated} component={ManagePinsPage} />
                  <AuthRoute exact path='/add' authenticated={authenticated} component={AddPin} />
                  <AuthRoute exact path='/edit/:_id' authenticated={authenticated} component={EditPin} />
                  <Route exact path='/about' component={AboutPage} />
                  <Route path='*' component={NotFoundPage} />
                </Switch>
              </Page>
            </>
          </ThemeProvider>
        </ScrollToTop>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  authenticated: user.authenticated,
  theme: user.theme || 'base',
});

export const App = connect (mapStateToProps) (AppBase);

AppBase.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};
