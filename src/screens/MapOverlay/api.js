export const getLocationData = (body) =>
  fetch('http://localhost:3000/getLocationData', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }).then((response) => response.json());

export const getLocationDataRaw = (body) =>
  fetch('http://localhost:3000/getLocationDataRaw', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }).then((response) => response.json());
