/* eslint-env jest */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import renderer from 'react-test-renderer';
import { Mailto, PlainMailto } from '..';

const theme = {
};

test ('Mailto, to only, default render', () => {
  const component = renderer.create (
    <ThemeProvider theme={theme}>
      <Mailto to='#'>text</Mailto>
    </ThemeProvider>
  );
  const tree = component.toJSON ();
  expect (tree).toMatchSnapshot ();
});

test ('Mailto, default render', () => {
  const component = renderer.create (
    <ThemeProvider theme={theme}>
      <Mailto to='#' subject='Hi'>text</Mailto>
    </ThemeProvider>
  );
  const tree = component.toJSON ();
  expect (tree).toMatchSnapshot ();
});

test ('PlainMailto, to only, default render', () => {
  const component = renderer.create (
    <ThemeProvider theme={theme}>
      <PlainMailto to='#'>text</PlainMailto>
    </ThemeProvider>
  );
  const tree = component.toJSON ();
  expect (tree).toMatchSnapshot ();
});

test ('PlainMailto, default render', () => {
  const component = renderer.create (
    <ThemeProvider theme={theme}>
      <PlainMailto to='#' subject='Hi'>text</PlainMailto>
    </ThemeProvider>
  );
  const tree = component.toJSON ();
  expect (tree).toMatchSnapshot ();
});

test ('PlainMailto with color, to only, default render', () => {
  const component = renderer.create (
    <ThemeProvider theme={theme}>
      <PlainMailto to='#' c='#0000ff'>text</PlainMailto>
    </ThemeProvider>
  );
  const tree = component.toJSON ();
  expect (tree).toMatchSnapshot ();
});

test ('PlainMailto with color, default render', () => {
  const component = renderer.create (
    <ThemeProvider theme={theme}>
      <PlainMailto to='#' subject='Hi' c='#0000ff'>text</PlainMailto>
    </ThemeProvider>
  );
  const tree = component.toJSON ();
  expect (tree).toMatchSnapshot ();
});
