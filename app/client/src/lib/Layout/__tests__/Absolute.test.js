/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';
import { Absolute } from '..';

test ('Absolute renders default component', () => {
  const component = renderer.create (
    <Absolute />
  );
  const tree = component.toJSON ();
  expect (tree).toMatchSnapshot ();
});
