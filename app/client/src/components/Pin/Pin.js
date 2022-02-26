import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { Box, Row, Flex, FlexGroup, FlexItem } from '../../lib/Layout';
import { Divider } from '../../lib/Divider';
import { Button } from '../../lib/Button';
import { Card } from '../../lib/Card';
import { Image } from '../../lib/Image';
import { Text } from '../../lib/Text';

export const Pin = ({ authenticated, pin, onEditPin, onDeletePin, onTogglePinned, editPage }) => {
  const color = (authenticated && pin.pinned) ? 'red' : 'off';
  const pinImageUri = `${location.origin}/images/pin-${color}-14.png`;
  const pinImage = <img src={pinImageUri} onClick={() => onTogglePinned (pin._id)} />;

  return (
    <PinCard>
      <Image src={pin.url} />
      <Box p='4px'>
        <Row>
          <Text center fs='14px'>{pin.title}</Text>
        </Row>
        <Row mt='8px' mb='8px'>
          <Text fs='12px'>{pin.text}</Text>
        </Row>
        <Divider extend='4px' color='#dddddd' />
        <Row center mt='6px' mb='4px'>{pinImage} {pin.count}</Row>
        <Flex mb='6px'>
          <FlexItem grow>{pin.category}</FlexItem>
          <FlexItem><Link to={`/pins/${pin.creator}`}>{pin.username}</Link></FlexItem>
        </Flex>
        { editPage && (
          <Fragment>
            <Divider extend='4px' color='#dddddd' />
            <Row mt='6px' mb='6px'>
              <FlexGroup right spacing='4px'>
                <Button small type='button' onClick={() => onEditPin (pin._id)}>Edit</Button>
                <Button small type='button' onClick={() => onDeletePin (pin._id)}>Delete</Button>
              </FlexGroup>
            </Row>
          </Fragment>
        )}
      </Box>
    </PinCard>
  );
};

Pin.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  pin: PropTypes.shape ({
    _id: PropTypes.string,
    title: PropTypes.string,
    text: PropTypes.string,
    category: PropTypes.string,
    pinned: PropTypes.bool,
    url: PropTypes.string,
    creator: PropTypes.string,
    count: PropTypes.number,
    username: PropTypes.string,
  }).isRequired,
  onEditPin: PropTypes.func,
  onDeletePin: PropTypes.func,
  onTogglePinned: PropTypes.func,
  editPage: PropTypes.bool.isRequired,
};

Pin.defaultProps = {
  onEditPin: null,
  onDeletePin: null,
  onTogglePinned: null,
};

const PinCard = styled (Card)`
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
