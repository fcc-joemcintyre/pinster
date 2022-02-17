/* global fetch window: true */
import { JsonFetchError } from './JsonFetchError.js';

export async function get (path) {
  let res;
  try {
    res = await fetch (`${window.location.origin}${path}`, {
      method: 'get',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      credentials: 'same-origin',
    });
  } catch (err) {
    throw new JsonFetchError (500, 'Network error');
  }

  if (!res.ok) {
    throw new JsonFetchError (res.status);
  } else {
    return res.json ();
  }
}

export async function post (path, body) {
  let res;
  try {
    res = await fetch (`${window.location.origin}${path}`, {
      method: 'post',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      credentials: 'same-origin',
      body: JSON.stringify (body),
    });
  } catch (err) {
    throw new JsonFetchError (500, 'Network error');
  }

  if (!res.ok) {
    throw new JsonFetchError (res.status);
  } else {
    return res.json ();
  }
}

export async function postForm (path, body) {
  let res;
  try {
    res = await fetch (`${window.location.origin}${path}`, {
      method: 'post',
      headers: {
        accept: 'application/json',
      },
      credentials: 'same-origin',
      body,
    });
  } catch (err) {
    throw new JsonFetchError (500, 'Network error');
  }

  if (!res.ok) {
    throw new JsonFetchError (res.status);
  } else {
    return res.json ();
  }
}

export async function put (path, body) {
  let res;
  try {
    res = await fetch (`${window.location.origin}${path}`, {
      method: 'put',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      credentials: 'same-origin',
      body: JSON.stringify (body),
    });
  } catch (err) {
    throw new JsonFetchError (500, 'Network error');
  }

  if (!res.ok) {
    throw new JsonFetchError (res.status);
  } else {
    return res.json ();
  }
}

export async function remove (path) {
  let res;
  try {
    res = await fetch (`${window.location.origin}${path}`, {
      method: 'delete',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      credentials: 'same-origin',
    });
  } catch (err) {
    throw new JsonFetchError (500, 'Network error');
  }

  if (!res.ok) {
    throw new JsonFetchError (res.status);
  } else {
    return res.json ();
  }
}
