import { API_ROOT, X_API_KEY } from '../../config';
import { fetchUtil } from '../../util';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'x-api-key': X_API_KEY
};

export const listDonorsNearby = (token, body) =>
  fetchUtil(
    `${API_ROOT}/list_donors_nearby`,
    'POST',
    { ...headers, Authorization: `Bearer ${token}` },
    body
  );

export const askDonor = (token, body) =>
  fetchUtil(
    `${API_ROOT}/ask_donor`,
    'POST',
    { ...headers, Authorization: `Bearer ${token}` },
    body
  );

export const updatePickupSchedule = (token, body) =>
  fetchUtil(
    `${API_ROOT}/update_pickup_schedule`,
    'POST',
    { ...headers, Authorization: `Bearer ${token}` },
    body
  );
