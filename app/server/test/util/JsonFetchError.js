class JsonFetchError extends Error {
  constructor (status = 500, message = '') {
    super (message);
    this.name = 'JsonFetchError';
    this.status = status;
    this.stack = (new Error ()).stack;
    console.log ('*** JsonFetchError', status, message);
  }

  toString () {
    return `${this.status}: ${this.message}`;
  }
}

module.exports = JsonFetchError;
