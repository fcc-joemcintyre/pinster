import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { DropMenuSpacer, DropMenuFloating } from './Menu';
import { DropMenuIcon } from './DropMenuIcon';

export class DropMenuImpl extends Component {
  constructor (props) {
    super (props);
    this.state = {
      show: false,
    };
    this.onToggle = this.onToggle.bind (this);
    this.onHide = this.onHide.bind (this);
  }

  onToggle () {
    this.setState (prev => ({ show: ! prev.show }));
  }

  onHide () {
    this.setState ({ show: false });
  }

  render () {
    const { right, children, className, ...rest } = this.props;
    return (
      <div className={className} {...rest} onMouseLeave={this.onHide}>
        <DropMenuIcon m='10px 8px 8px 8px' onClick={this.onToggle} />
        { this.state.show &&
          <Fragment>
            <DropMenuSpacer right={right} />
            <DropMenuFloating right={right} onClick={this.onHide}>
              {children}
            </DropMenuFloating>
          </Fragment>
        }
      </div>
    );
  }
}

DropMenuImpl.propTypes = {
  right: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
};

DropMenuImpl.defaultProps = {
  right: false,
  children: null,
  className: '',
};
