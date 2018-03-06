/*
  fetch operations for JSON interactions
*/
import JsonFetchError from './JsonFetchError';

export function get (path) {
  return fetch (`${window.location.origin}${path}`, {
    method: 'get',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
    credentials: 'same-origin',
  }).then ((res) => {
    if (! res.ok) {
      throw new JsonFetchError (res.status);
    } else {
      return res.json ();
    }
  }).catch (() => {
    throw new JsonFetchError (500, 'Network error');
  });
}

export function post (path, body) {
  return fetch (`${window.location.origin}${path}`, {
    method: 'post',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
    credentials: 'same-origin',
    body: JSON.stringify (body),
  }).then ((res) => {
    if (! res.ok) {
      throw new JsonFetchError (res.status);
    } else {
      return res.json ();
    }
  }).catch (() => {
    throw new JsonFetchError (500, 'Network error');
  });
}

export function put (path, body) {
  return fetch (`${window.location.origin}${path}`, {
    method: 'put',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
    credentials: 'same-origin',
    body: JSON.stringify (body),
  }).then ((res) => {
    if (! res.ok) {
      throw new JsonFetchError (res.status);
    } else {
      return res.json ();
    }
  }).catch (() => {
    throw new JsonFetchError (500, 'Network error');
  });
}

export function remove (path) {
  return fetch (`${window.location.origin}${path}`, {
    method: 'delete',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
    credentials: 'same-origin',
  }).then (res => res.json ())
    .catch (() => {
      throw new JsonFetchError (500, 'Network error');
    });
}
