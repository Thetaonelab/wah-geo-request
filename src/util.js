/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */

import { Linking, ToastAndroid, Platform } from 'react-native';

export const fetchUtil = (url, method = 'GET', headers, body, DEBUG = true) =>
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
              if (!response.ok) {
                if (DEBUG) {
                  console.log('Error', json, {
                    url,
                    method,
                    headers,
                    body
                  });
                }
              }
              resolve({ ok: response.ok, code: response.status, json });
            } catch (ex) {
              if (DEBUG) {
                console.log('Error', ex.message, {
                  url,
                  method,
                  headers,
                  body
                });
              }

              try {
                const parser = new (require('xmldom').DOMParser)();
                const xmlDoc = parser.parseFromString(text, 'text/xml');
                const title = xmlDoc.getElementsByTagName('title');
                let errorStr = title[0].childNodes[0].nodeValue;
                const p = xmlDoc.getElementsByTagName('p');
                errorStr += ` (${p[0].childNodes[0].nodeValue})`;
                if (DEBUG) console.log({ errorStr });
                resolve({
                  ok: response.ok,
                  code: response.status,
                  json: { api_message: errorStr }
                });
              } catch (ex2) {
                if (DEBUG) console.log({ ex2 });
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

export function call(phoneNumber) {
  return () => {
    Linking.canOpenURL(phoneNumber)
      .then((supported) => {
        if (!supported) {
          ToastAndroid.show('Phone number not supported!', ToastAndroid.LONG);
          return false;
        }
        return Linking.openURL(phoneNumber);
      })
      .catch((err) => console.warn(err));
  };
}

export const openGps = (lat, lng) => {
  const scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:';
  const url = `${scheme}${lat},${lng}`;
  Linking.openURL(url);
};

export const getRandomColor = (opacity = 0.3) => `rgba(${parseInt(Math.random() * 1000) % 256},${
    parseInt(Math.random() * 1000) % 256
  },${parseInt(Math.random() * 1000) % 256},${opacity})`;
