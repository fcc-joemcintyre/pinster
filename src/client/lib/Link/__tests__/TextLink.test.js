/* eslint-env jest */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import renderer from 'react-test-renderer';
import { TextLink, PlainTextLink } from '..';

const theme = {
};

test ('TextLink, to only, default render', () => {
  const component = renderer.create (
    <ThemeProvider theme={theme}>
      <TextLink to='#'>text</TextLink>
    </ThemeProvider>
  );
  const tree = component.toJSON ();
  expect (tree).toMatchSnapshot ();
});

test ('TextLink, default render', () => {
  const component = renderer.create (
    <ThemeProvider theme={theme}>
      <TextLink to='#' subject='Hi'>text</TextLink>
    </ThemeProvider>
  );
  const tree = component.toJSON ();
  expect (tree).toMatchSnapshot ();
});

test ('PlainTextLink, to only, default render', () => {
  const component = renderer.create (
    <ThemeProvider theme={theme}>
      <PlainTextLink to='#'>text</PlainTextLink>
    </ThemeProvider>
  );
  const tree = component.toJSON ();
  expect (tree).toMatchSnapshot ();
});

test ('PlainTextLink, default render', () => {
  const component = renderer.create (
    <ThemeProvider theme={theme}>
      <PlainTextLink to='#' subject='Hi'>text</PlainTextLink>
    </ThemeProvider>
  );
  const tree = component.toJSON ();
  expect (tree).toMatchSnapshot ();
});

test ('PlainTextLink with color, to only, default render', () => {
  const component = renderer.create (
    <ThemeProvider theme={theme}>
      <PlainTextLink to='#' c='#0000ff'>text</PlainTextLink>
    </ThemeProvider>
  );
  const tree = component.toJSON ();
  expect (tree).toMatchSnapshot ();
});

test ('PlainTextLink with color, default render', () => {
  const component = renderer.create (
    <ThemeProvider theme={theme}>
      <PlainTextLink to='#' subject='Hi' c='#0000ff'>text</PlainTextLink>
    </ThemeProvider>
  );
  const tree = component.toJSON ();
  expect (tree).toMatchSnapshot ();
});
