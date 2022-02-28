import React from 'react';
import { Box, List, ListItem, Typography } from '@mui/material';
import { LinkExternal } from '@cygns/muikit';
import { PageContent } from '../util';

export const About = () => (
  <PageContent>
    <Typography variant='h1' textAlign='center' gutterBottom>
      About Pinster
    </Typography>
    <Box maxWidth='500px'>
      <Typography paragraph>
        Written by Joe McIntyre, Pinster is a full stack project defined by FreeCodeCamp.{' '}
        (<LinkExternal href='https://www.freecodecamp.com/challenges/build-a-pinterest-clone'>Link</LinkExternal>)
      </Typography>
      <Typography paragraph>
        The source code is published on GitHub under a MIT license.{' '}
        (<LinkExternal href='https://github.com/fcc-joemcintyre/pinster'>Link</LinkExternal>)
      </Typography>
      <Typography paragraph>Technologies used include:</Typography>
      <List dense>
        <ListItem>Client: React (16.x), React-Redux and React-Router</ListItem>
        <ListItem>Server: Node (8.x) using Express and Passport</ListItem>
        <ListItem>Database: Mongo (3.4.x)</ListItem>
        <ListItem>Languages: Javascript (ES2017), CSS in JS (Styled-Components)</ListItem>
      </List>
      <Typography paragraph>Thanks to:</Typography>
      <List dense>
        <ListItem>GitHub (source hosting)</ListItem>
        <ListItem>Heroku (app hosting)</ListItem>
        <ListItem>mlab (database hosting)</ListItem>
        <ListItem>TravisCI (continuous integration testing)</ListItem>
      </List>
    </Box>
  </PageContent>
);
