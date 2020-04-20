/* eslint-disable no-console */
export const fetchUtil = (url, method = 'GET', headers, body) =>
  fetch(url, {
    method,
    body: body ? JSON.stringify(body) : undefined,
    headers
  }).then(
    (response) =>
      new Promise((resolve) => {
        response.text().then((text) => {
          try {
            const json = JSON.parse(text);
            resolve({ ok: response.ok, code: response.status, json });
          } catch (ex) {
            console.log('Error', ex.message, { url, method, headers, body });
            resolve({
              ok: response.ok,
              code: response.status,
              json: { api_message: text }
            });
          }
        });
      })
  );
