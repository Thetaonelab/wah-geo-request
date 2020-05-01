/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
export const fetchUtil = (url, method = 'GET', headers, body) =>
  fetch(url, {
    method,
    body: body ? JSON.stringify(body) : undefined,
    headers
  })
    .then(
      (response) =>
        new Promise((resolve) => {
          response.text().then((text) => {
            try {
              const json = JSON.parse(text);
              resolve({ ok: response.ok, code: response.status, json });
            } catch (ex) {
              console.log('Error', ex.message, { url, method, headers, body });
              try {
                const parser = new (require('xmldom').DOMParser)();
                const xmlDoc = parser.parseFromString(text, 'text/xml');
                const title = xmlDoc.getElementsByTagName('title');
                let errorStr = title[0].childNodes[0].nodeValue;
                const p = xmlDoc.getElementsByTagName('p');
                errorStr += ` (${p[0].childNodes[0].nodeValue})`;
                console.log({ errorStr });
                resolve({
                  ok: response.ok,
                  code: response.status,
                  json: { api_message: errorStr }
                });
              } catch (ex2) {
                console.log({ ex2 });
                resolve({
                  ok: response.ok,
                  code: response.status,
                  json: { api_message: text }
                });
              }
            }
          });
        })
    )
    .catch(
      (err) =>
        new Promise((resolve) => {
          resolve({
            ok: false,
            code: -1,
            json: { api_message: err.message }
          });
        })
    );
