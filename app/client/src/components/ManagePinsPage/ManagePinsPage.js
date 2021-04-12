import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Masonry from 'react-masonry-component';
import { Pin } from '../Pin';
import { deletePin } from '../../store/appActions';
import { PageContent, Row } from '../../lib/Layout';
import { Card } from '../../lib/Card';
import { AddIcon } from './AddIcon';

const ManagePinsPageBase = ({ id, pins, history, onDeletePin }) => (
  <PageContent>
    <Masonry elementType='div'>
      <AddPin
        key='0'
        onClick={() => { history.push ('/add'); }}
      >
        <Row center pt='20px'>
          <AddIcon />
        </Row>
        <Row center pt='12px' pb='20px'>
          Add Pin
        </Row>
      </AddPin>
      { pins
          .filter ((pin) => pin.creator === id)
          .map ((pin) => (
            <Pin
              key={pin._id}
              authenticated
              editPage
              pin={pin}
              onEditPin={(pinId) => { history.push (`/edit/${pinId}`); }}
              onDeletePin={(pinId) => { onDeletePin (pinId); }}
            />
          ))
      }
    </Masonry>
  </PageContent>
);

const mapStateToProps = (state) => ({
  id: state.user.id,
  pins: state.pins,
});

const mapDispatchToProps = (dispatch) => ({
  onDeletePin: (pin) => { dispatch (deletePin (pin)); },
});

export const ManagePinsPage = connect (mapStateToProps, mapDispatchToProps) (ManagePinsPageBase);

ManagePinsPageBase.propTypes = {
  id: PropTypes.string.isRequired,
  pins: PropTypes.arrayOf (PropTypes.shape ({})).isRequired,
  history: PropTypes.shape ({
    push: PropTypes.func,
  }).isRequired,
  onDeletePin: PropTypes.func.isRequired,
};

const AddPin = styled (Card)`
  cursor: pointer;
  background-color: lightgray;

  @media (max-width: 414px) {
    width: 44%;
    margin: 1%;
  }

  @media (min-width: 415px) and (max-width: 768px) {
    width: 30%;
    margin: 0.75%;
  }

  @media (min-width: 769px) {
    width: 22.5%;
    margin: 0.5%;
  }
`;
