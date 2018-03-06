import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../../store/userActions';
import { PageContent } from '../../lib/Layout';
import { P } from '../../lib/Text';

class LogoutPageBase extends Component {
  constructor (props) {
    super (props);
    this.state = {
      working: true,
    };
  }

  async componentDidMount () {
    await this.props.dispatch (logout ());
    this.setState ({ working: false });
  }

  render () {
    return (
      <PageContent>
        {this.state.working ?
          <P center mt='80px'>
            Logging out ...
          </P> :
          this.props.authenticated ?
            <P center mt='80px'>
              Logging out did not complete, please retry or close your browser.
            </P> :
            <P center mt='80px'>
              Thank you for using Pinster, we hope to see you back again soon.
            </P>
        }
      </PageContent>
    );
  }
}

const mapStateToProps = state => ({
  authenticated: state.user.authenticated,
});

export const LogoutPage = connect (mapStateToProps) (LogoutPageBase);

LogoutPageBase.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};
