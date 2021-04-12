/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';
import { Box } from '..';

test ('Box renders default component', () => {
  const component = renderer.create (
    <Box />
  );
  const tree = component.toJSON ();
  expect (tree).toMatchSnapshot ();
});

test ('Box renders centered component', () => {
  const component = renderer.create (
    <Box center />
  );
  const tree = component.toJSON ();
  expect (tree).toMatchSnapshot ();
});

test ('Box renders color component', () => {
  const component = renderer.create (
    <Box bg='blue' />
  );
  const tree = component.toJSON ();
  expect (tree).toMatchSnapshot ();
});

test ('Box renders inline component', () => {
  const component = renderer.create (
    <Box inline />
  );
  const tree = component.toJSON ();
  expect (tree).toMatchSnapshot ();
});
