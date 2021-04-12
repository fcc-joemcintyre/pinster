import { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

class ScrollToTopBase extends Component {
  componentDidUpdate (prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo (0, 0);
    }
  }

  render () {
    return this.props.children;
  }
}

export const ScrollToTop = withRouter (ScrollToTopBase);

ScrollToTopBase.propTypes = {
  location: PropTypes.shape ({}).isRequired,
  children: PropTypes.node.isRequired,
};
