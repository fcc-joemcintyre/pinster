import { Link } from '@mui/material';

type Props = {
  href: string,
  children: JSX.Element | string,
};

/**
 * External link with html attributes populated
 */
export const LinkExternal = ({ href, ...rest }: Props) => (
  <Link href={href} target='_blank' rel='noopener noreferrer' {...rest} />
);
