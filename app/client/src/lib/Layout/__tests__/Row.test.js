/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';
import { Row } from '..';

test ('Row renders default layout', () => {
  const component = renderer.create (
    <Row>
      text
    </Row>
  );
  const tree = component.toJSON ();
  expect (tree).toMatchSnapshot ();
});

test ('Row renders left justified content', () => {
  const component = renderer.create (
    <Row left>
      text
    </Row>
  );
  const tree = component.toJSON ();
  expect (tree).toMatchSnapshot ();
});

test ('Row renders centered content', () => {
  const component = renderer.create (
    <Row center>
      text
    </Row>
  );
  const tree = component.toJSON ();
  expect (tree).toMatchSnapshot ();
});

test ('Row renders right justfied content', () => {
  const component = renderer.create (
    <Row right>
      text
    </Row>
  );
  const tree = component.toJSON ();
  expect (tree).toMatchSnapshot ();
});
