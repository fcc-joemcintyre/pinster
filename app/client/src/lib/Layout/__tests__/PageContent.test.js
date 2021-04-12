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

test ('PageContent with custom content width', () => {
  const component = renderer.create (
    <PageContent maxw='1024px' />
  );
  const tree = component.toJSON ();
  expect (tree).toMatchSnapshot ();
});

test ('PageContent with custom content width and padding', () => {
  const component = renderer.create (
    <PageContent maxw='1024px' p='60px 0 20px 0' />
  );
  const tree = component.toJSON ();
  expect (tree).toMatchSnapshot ();
});
