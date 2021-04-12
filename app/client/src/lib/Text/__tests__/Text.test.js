/* eslint-env jest */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import renderer from 'react-test-renderer';
import { Text } from '..';

const theme = {
  fonts: {
    normal1: `
      font-family: 'Open Sans', sans-serif;
      font-weight: 400;
    `,
    bold1: `
      font-family: 'Open Sans', sans-serif;
      font-weight: 600;
    `,
    normal2: `
      font-family: 'Lato', sans-serif;
      font-weight: 400;
    `,
    bold2: `
      font-family: 'Lato', sans-serif;
      font-weight: 700;
    `,
  },
};

test ('Text default render', () => {
  const component = renderer.create (
    <ThemeProvider theme={theme}>
      <Text>Some text</Text>
    </ThemeProvider>
  );
  const tree = component.toJSON ();
  expect (tree).toMatchSnapshot ();
});

test ('Text font 1 normal', () => {
  const component = renderer.create (
    <ThemeProvider theme={theme}>
      <Text font='normal1'>Some text</Text>
    </ThemeProvider>
  );
  const tree = component.toJSON ();
  expect (tree).toMatchSnapshot ();
});

test ('Text font 1 bold', () => {
  const component = renderer.create (
    <ThemeProvider theme={theme}>
      <Text font='bold1'>Some text</Text>
    </ThemeProvider>
  );
  const tree = component.toJSON ();
  expect (tree).toMatchSnapshot ();
});

test ('Text font 2 normal', () => {
  const component = renderer.create (
    <ThemeProvider theme={theme}>
      <Text font='normal2'>Some text</Text>
    </ThemeProvider>
  );
  const tree = component.toJSON ();
  expect (tree).toMatchSnapshot ();
});

test ('Text font 2 bold', () => {
  const component = renderer.create (
    <ThemeProvider theme={theme}>
      <Text font='bold2'>Some text</Text>
    </ThemeProvider>
  );
  const tree = component.toJSON ();
  expect (tree).toMatchSnapshot ();
});
