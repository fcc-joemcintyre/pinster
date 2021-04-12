/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';
import { Column } from '..';

test ('Column renders default component', () => {
  const component = renderer.create (
    <Column />
  );
  const tree = component.toJSON ();
  expect (tree).toMatchSnapshot ();
});
