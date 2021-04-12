import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Masonry from 'react-masonry-component';
import { Pin } from '../Pin';
import { togglePinned } from '../../store/appActions';
import { PageContent } from '../../lib/Layout';

export const UserPinsPageBase = ({ pins, authenticated, match, onTogglePinned }) => (
  <PageContent>
    <Masonry elementType='div'>
      { pins.filter ((pin) => (pin.creator === match.params._id)).map ((pin) => (
        <Pin
          key={pin._id}
          authenticated={authenticated}
          editPage={false}
          pin={pin}
          onTogglePinned={onTogglePinned}
        />
      ))}
    </Masonry>
  </PageContent>
);

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
  pins: state.pins,
});

const mapDispatchToProps = (dispatch) => ({
  onTogglePinned: (pin) => { dispatch (togglePinned (pin)); },
});

export const UserPinsPage = connect (mapStateToProps, mapDispatchToProps) (UserPinsPageBase);

UserPinsPageBase.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  pins: PropTypes.arrayOf (PropTypes.shape ({
    _id: PropTypes.string.isRequired,
  })).isRequired,
  match: PropTypes.shape ({
    params: PropTypes.shape ({
      _id: PropTypes.string,
    }),
  }).isRequired,
  onTogglePinned: PropTypes.func.isRequired,
};
