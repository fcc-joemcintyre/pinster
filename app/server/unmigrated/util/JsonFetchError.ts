export class JsonFetchError extends Error {
  constructor (status = 500, message = '') {
    super (`${status}: ${message}`);
    this.name = 'JsonFetchError';
    this.stack = (new Error ()).stack;
    console.log ('*** JsonFetchError', status, message);
  }
}
