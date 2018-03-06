/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';
import { Fixed } from '..';

test ('Fixed renders default component', () => {
  const component = renderer.create (
    <Fixed />
  );
  const tree = component.toJSON ();
  expect (tree).toMatchSnapshot ();
});

test ('Fixed renders positioned component', () => {
  const component = renderer.create (
    <Fixed top={10} left={10} bottom={10} right={10} />
  );
  const tree = component.toJSON ();
  expect (tree).toMatchSnapshot ();
});
