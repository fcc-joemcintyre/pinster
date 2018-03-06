export default class JsonFetchError extends Error {
  constructor (status = 500, message = '') {
    super (message);
    this.name = 'JsonFetchError';
    this.status = status;
    this.stack = (new Error ()).stack;
  }
}
