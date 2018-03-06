/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';
import { PageContent } from '..';

test ('PageContent renders default component', () => {
  const component = renderer.create (
    <PageContent />
  );
  const tree = component.toJSON ();
  expect (tree).toMatchSnapshot ();
});

test ('PageContent with custom max-width', () => {
  const component = renderer.create (
    <PageContent maxWidth='1024px' />
  );
  const tree = component.toJSON ();
  expect (tree).toMatchSnapshot ();
});
