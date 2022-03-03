import { Field, FieldError } from '@cygns/use-fields';
import { FieldTextInput } from '@cygns/muikit';
import { Button, Grid, Typography } from '@mui/material';
import { PageContent } from '../util';

type Props = {
  action: string,
  fields: {
    url: Field,
    category: Field,
    title: Field,
    text: Field,
  },
  onChange: React.ChangeEventHandler,
  onValidate: React.FocusEventHandler,
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<FieldError[] | null>,
};

export const PinForm = ({
  action, fields: { url, category, title, text },
  onChange, onValidate, onSubmit,
}: Props) => (
  <PageContent>
    <Typography variant='h1' textAlign='center'>{action} Pin</Typography>
    <form
      noValidate
      onSubmit={async (e) => {
        const errors = await onSubmit (e);
        const el = document.getElementById (errors ? errors[0].name : url.name);
        if (el) { el.focus (); }
      }}
    >
      <Grid container spacing={2} width='300px' p='10px 10px 20px 10px' m='0 auto'>
        <FieldTextInput
          field={url}
          label='Image URL'
          autoFocus
          maxLength={200}
          autoCapitalize='none'
          autoCorrect='off'
          onChange={onChange}
          onValidate={onValidate}
        />
        <FieldTextInput
          field={category}
          label='Category'
          maxLength={20}
          onChange={onChange}
          onValidate={onValidate}
        />
        <FieldTextInput
          field={title}
          label='Title'
          maxLength={60}
          onChange={onChange}
          onValidate={onValidate}
        />
        <FieldTextInput
          field={text}
          label='Description'
          rows={5}
          maxLength={512}
          onChange={onChange}
          onValidate={onValidate}
        />

        <Grid item>
          <Button type='submit'>
            SAVE
          </Button>
        </Grid>
      </Grid>
    </form>
  </PageContent>
);
