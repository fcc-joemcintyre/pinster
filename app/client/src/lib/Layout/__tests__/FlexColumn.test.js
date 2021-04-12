/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';
import { FlexColumn } from '..';

test ('FlexColumn renders default gap', () => {
  const component = renderer.create (
    <FlexColumn>
      <button type='submit'>SUBMIT</button>
      <button type='button'>CANCEL</button>
      <button type='button'>CLEAR</button>
    </FlexColumn>
  );
  const tree = component.toJSON ();
  expect (tree).toMatchSnapshot ();
});

test ('FlexGroup renders with custom gap', () => {
  const component = renderer.create (
    <FlexColumn gap='10px'>
      <button type='submit'>SUBMIT</button>
      <button type='button'>CANCEL</button>
      <button type='button'>CLEAR</button>
    </FlexColumn>
  );
  const tree = component.toJSON ();
  expect (tree).toMatchSnapshot ();
});
