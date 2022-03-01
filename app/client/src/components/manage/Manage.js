import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import styled from '@emotion/styled';
import { Masonry } from '@mui/lab';
import { Box, Paper } from '@mui/material';
import { deletePin } from '../../store/appActions';
import { Pin } from '../pins';
import { PageContent } from '../util';
import { AddIcon } from './AddIcon';

export const Manage = () => {
  const dispatch = useDispatch ();
  const navigate = useNavigate ();
  const pins = useSelector ((a) => a.pins.filter ((b) => b.creator === a.user.key));

  return (
    <PageContent>
      <Masonry columns={{ xs: 2, sm: 4 }} spacing={2}>
        <AddPin
          key='0'
          onClick={() => { navigate ('/add'); }}
        >
          <Box textAlign='center' pt='20px'>
            <AddIcon />
          </Box>
          <Box textAlign='center' pt='12px' pb='20px'>
            Add Pin
          </Box>
        </AddPin>
        { pins.map ((pin) => (
          <Pin
            key={pin.key}
            authenticated
            editPage
            pin={pin}
            onEditPin={(key) => { navigate (`/edit/${key}`); }}
            onDeletePin={(key) => { dispatch (deletePin (key)); }}
          />
        ))}
      </Masonry>
    </PageContent>
  );
};

const AddPin = styled (Paper)`
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
