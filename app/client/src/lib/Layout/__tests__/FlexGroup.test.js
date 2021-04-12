/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';
import { FlexGroup } from '..';

test ('FlexGroup renders default layout', () => {
  const component = renderer.create (
    <FlexGroup>
      <button type='submit'>SUBMIT</button>
      <button type='button'>CANCEL</button>
      <button type='button'>CLEAR</button>
    </FlexGroup>
  );
  const tree = component.toJSON ();
  expect (tree).toMatchSnapshot ();
});

test ('FlexGroup renders left justified component', () => {
  const component = renderer.create (
    <FlexGroup left>
      <button type='submit'>SUBMIT</button>
      <button type='button'>CANCEL</button>
      <button type='button'>CLEAR</button>
    </FlexGroup>
  );
  const tree = component.toJSON ();
  expect (tree).toMatchSnapshot ();
});

test ('FlexGroup renders centered components', () => {
  const component = renderer.create (
    <FlexGroup center>
      <button type='submit'>SUBMIT</button>
      <button type='button'>CANCEL</button>
      <button type='button'>CLEAR</button>
    </FlexGroup>
  );
  const tree = component.toJSON ();
  expect (tree).toMatchSnapshot ();
});

test ('FlexGroup renders right justfied components', () => {
  const component = renderer.create (
    <FlexGroup right>
      <button type='submit'>SUBMIT</button>
      <button type='button'>CANCEL</button>
      <button type='button'>CLEAR</button>
    </FlexGroup>
  );
  const tree = component.toJSON ();
  expect (tree).toMatchSnapshot ();
});

test ('FlexGroup renders custom spaced components', () => {
  const component = renderer.create (
    <FlexGroup spacing='20px'>
      <button type='submit'>SUBMIT</button>
      <button type='button'>CANCEL</button>
      <button type='button'>CLEAR</button>
    </FlexGroup>
  );
  const tree = component.toJSON ();
  expect (tree).toMatchSnapshot ();
});
