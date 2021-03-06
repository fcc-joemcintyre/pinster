import React from 'react';
import { PageContent, Box } from '../../lib/Layout';
import { H1, P, List, Item } from '../../lib/Text';
import { TextLink } from '../../lib/Link';

export const AboutPage = () => (
  <PageContent>
    <H1 center>About Pinster</H1>
    <Box center noborder maxw='500px'>
      <P>
        Written by Joe McIntyre, Pinster is a full stack project defined by FreeCodeCamp.{' '}
        (<TextLink to='https://www.freecodecamp.com/challenges/build-a-pinterest-clone'>Link</TextLink>)
      </P>
      <P>
        The source code is published on GitHub under a MIT license.{' '}
        (<TextLink to='https://github.com/fcc-joemcintyre/pinster'>Link</TextLink>)
      </P>
      <P>Technologies used include:</P>
      <List>
        <Item>Client: React (16.x), React-Redux and React-Router</Item>
        <Item>Server: Node (8.x) using Express and Passport</Item>
        <Item>Database: Mongo (3.4.x)</Item>
        <Item>Languages: Javascript (ES2017), CSS in JS (Styled-Components)</Item>
      </List>
      <P>Thanks to:</P>
      <List>
        <Item>GitHub (source hosting)</Item>
        <Item>Heroku (app hosting)</Item>
        <Item>mlab (database hosting)</Item>
        <Item>TravisCI (continuous integration testing)</Item>
      </List>
    </Box>
  </PageContent>
);
