/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';
import { Page } from '..';

test ('Page renders default component', () => {
  const component = renderer.create (
    <Page />
  );
  const tree = component.toJSON ();
  expect (tree).toMatchSnapshot ();
});
