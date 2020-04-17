export const fetchUtil = (url, method = 'GET', headers, body) =>
  fetch(url, {
    method,
    body: body ? JSON.stringify(body) : undefined,
    headers
  }).then(
    (response) =>
      new Promise((resolve) => {
        response.json().then((json) => {
          resolve({ ok: response.ok, code: response.status, json });
        });
      })
  );
