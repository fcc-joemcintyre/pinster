async function call (method, path, body = undefined) {
  const o: RequestInit = {
    method,
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
    credentials: 'same-origin',
    body: JSON.stringify (body),
  };
  try {
    const res = await fetch (`${window.location.origin}${path}`, o);
    const data = await res.json ();
    return { status: res.ok ? 200 : res.status, data };
  } catch (err) {
    return ({ status: 500 });
  }
}

export async function get (path) {
  const t = await call ('GET', path);
  return t;
}

export async function post (path, body) {
  const t = await call ('POST', path, body);
  return t;
}

export async function put (path, body) {
  const t = await call ('PUT', path, body);
  return t;
}

export async function remove (path) {
  const t = await call ('DELETE', path);
  return t;
}
