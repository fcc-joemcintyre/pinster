/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';
import { Relative } from '..';

test ('Relative renders default component', () => {
  const component = renderer.create (
    <Relative />
  );
  const tree = component.toJSON ();
  expect (tree).toMatchSnapshot ();
});
