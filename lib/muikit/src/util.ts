/**
 * Get info text associated with a field
 * @param showErrors Flag to show errors or not
 * @param errors Object with error properties
 * @param error Error index
 * @param showInfo Flag to show info or not
 * @param info Field info
 * @returns Info text
 */
export function getInfo (
  showErrors: boolean,
  errors: Record<string, string>,
  error: string,
  showInfo: boolean,
  info?: string
): string | undefined {
  if (showErrors && error) {
    if (error === 'required') {
      return 'Required';
    } else {
      return (errors && errors[error]) ? errors[error] : 'Invalid content';
    }
  }
  return showInfo ? info : undefined;
}
