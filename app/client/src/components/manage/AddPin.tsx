import { useNavigate } from 'react-router';
import { Box, Paper, Typography } from '@mui/material';
import { AddIcon } from './AddIcon';

export const AddPin = () => {
  const navigate = useNavigate ();
  return (
    <Paper
      sx={{ cursor: 'pointer', color: 'primary.main' }}
      onClick={() => { navigate ('/create'); }}
    >
      <Box textAlign='center' pt='20px'>
        <AddIcon />
      </Box>
      <Box textAlign='center' pt='12px' pb='20px'>
        <Typography>Add Pin</Typography>
      </Box>
    </Paper>
  );
};
