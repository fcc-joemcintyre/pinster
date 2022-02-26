/* eslint-env jest */
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@emotion/styled';
import renderer from 'react-test-renderer';
import { PlainLink } from '..';

const theme = {
};

test ('PlainLink default render', () => {
  const component = renderer.create (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <PlainLink to='#'>text</PlainLink>
      </ThemeProvider>
    </BrowserRouter>
  );
  const tree = component.toJSON ();
  expect (tree).toMatchSnapshot ();
});

test ('PlainLink renders with color', () => {
  const component = renderer.create (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <PlainLink to='$' c='#000000'>text</PlainLink>
      </ThemeProvider>
    </BrowserRouter>
  );
  const tree = component.toJSON ();
  expect (tree).toMatchSnapshot ();
});
