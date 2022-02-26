/* eslint-env jest */
import React from 'react';
import { ThemeProvider } from '@emotion/styled';
import renderer from 'react-test-renderer';
import { Button } from '..';

const theme = {
  buttonPrimaryColor: '#ffffff',
  buttonPrimaryBG: '#0000ff',
  buttonColor: '#ffffff',
  buttonBG: '#00007f',
};

test ('Button default render', () => {
  const component = renderer.create (
    <ThemeProvider theme={theme}>
      <Button />
    </ThemeProvider>
  );
  const tree = component.toJSON ();
  expect (tree).toMatchSnapshot ();
});

test ('Button renders primary', () => {
  const component = renderer.create (
    <ThemeProvider theme={theme}>
      <Button primary />
    </ThemeProvider>
  );
  const tree = component.toJSON ();
  expect (tree).toMatchSnapshot ();
});

test ('Button renders custom colors', () => {
  const component = renderer.create (
    <ThemeProvider theme={theme}>
      <Button fg='#123456' bg='#234567' />
    </ThemeProvider>
  );
  const tree = component.toJSON ();
  expect (tree).toMatchSnapshot ();
});

test ('Button renders transparent bg', () => {
  const component = renderer.create (
    <ThemeProvider theme={theme}>
      <Button fg='#123456' bg='transparent' />
    </ThemeProvider>
  );
  const tree = component.toJSON ();
  expect (tree).toMatchSnapshot ();
});
