import { Button, Dialog, DialogActions, DialogContent, DialogTitle,
  Grid, IconButton, Typography } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

type Props = {
  formid?: string,
  actions?: string[],
  defaultAction?: string,
  closeAction?: string,
  title?: string,
  data?: unknown,
  onClose?: (action: string | undefined, data: unknown) => void,
  children: React.ReactNode,
};

/**
 * Create a dialog for messages with defined actions
 * @param Props
 * @returns Dialog instance
 */
export const GenDialog: React.FC<Props> = ({
  formid = undefined,
  actions = [],
  defaultAction = undefined,
  closeAction = undefined,
  title = '',
  data = null,
  onClose = () => { /* no op */ },
  children,
}: Props) => {
  if (actions.length === 1) {
    defaultAction = actions[0]; // eslint-disable-line no-param-reassign
    closeAction = actions[0]; // eslint-disable-line no-param-reassign
  }

  return (
    <Dialog
      open
      onClose={() => onClose (closeAction, data)}
      aria-labelledby='dialog-message-title'
    >
      { (title || closeAction) && (
        <DialogTitle id='dialog-message-title'>
          <Grid container spacing={1} justifyContent='space-between'>
            <Typography variant='h2' component='div'>
              {title}
            </Typography>
            { closeAction && (
              <IconButton
                size='small'
                aria-label='close'
                onClick={() => { onClose (closeAction, data); }}
              >
                <CloseIcon />
              </IconButton>
            )}
          </Grid>
        </DialogTitle>
      )}
      <DialogContent sx={{ minWidth: '240px' }}>
        {children}
      </DialogContent>
      <DialogActions>
        { actions.map ((a) => (
          (formid && a === defaultAction) ? (
            <Button
              key={a}
              type='submit'
              form={formid}
              autoFocus
              size='small'
              variant='contained'
            >
              {a}
            </Button>
          ) : (
            <Button
              key={a}
              type='button'
              size='small'
              variant='outlined'
              onClick={() => onClose (a, data)}
            >
              {a}
            </Button>
          )
        ))}
      </DialogActions>
    </Dialog>
  );
};
