/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';
import { Flex } from '..';

test ('Flex renders default component', () => {
  const component = renderer.create (
    <Flex />
  );
  const tree = component.toJSON ();
  expect (tree).toMatchSnapshot ();
});

test ('Flex renders wrap component', () => {
  const component = renderer.create (
    <Flex wrap />
  );
  const tree = component.toJSON ();
  expect (tree).toMatchSnapshot ();
});
