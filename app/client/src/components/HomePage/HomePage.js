import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Masonry from 'react-masonry-component';
import { Pin } from '../Pin';
import { togglePinned } from '../../store/appActions';
import { PageContent } from '../../lib/Layout';

const HomePageBase = ({ pins, authenticated, onTogglePinned }) => (
  <PageContent>
    <Masonry elementType='div'>
      { pins.map ((pin) => (
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

export const HomePage = connect (mapStateToProps, mapDispatchToProps) (HomePageBase);

HomePageBase.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  pins: PropTypes.arrayOf (PropTypes.shape ({
    _id: PropTypes.string.isRequired,
  })).isRequired,
  onTogglePinned: PropTypes.func.isRequired,
};
