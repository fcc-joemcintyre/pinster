import { Box, List, ListItem, Typography } from '@mui/material';
import { LinkExternal } from '@cygns/muikit';
import { PageContent } from '../util';

export const About = () => (
  <PageContent>
    <Typography variant='h1' textAlign='center' gutterBottom>
      About Pinster
    </Typography>
    <Box mt='1rem' maxWidth='500px'>
      <Typography paragraph>
        Pinster is a full stack project, allowing creators to share their content.
      </Typography>
      <Typography paragraph>
        The{' '}
        <LinkExternal href='https://github.com/fcc-joemcintyre/pinster'>source code</LinkExternal>{' '}
        is published on GitHub under a MIT license.
      </Typography>
      <Typography>Technologies used include:</Typography>
      <List dense>
        <ListItem>Client: React, React-Redux, React-Router, Material UI</ListItem>
        <ListItem>Server: Node using Express and Passport</ListItem>
        <ListItem>Database: MongoDB</ListItem>
        <ListItem>Languages: Typescript / Javascript (ES2020), CSS in JS (Emotion)</ListItem>
      </List>
      <Typography>Thanks to:</Typography>
      <List dense>
        <ListItem>GitHub (source hosting)</ListItem>
        <ListItem>Heroku (app hosting)</ListItem>
        <ListItem>MongoDB Atlas (database hosting)</ListItem>
      </List>
    </Box>
  </PageContent>
);
