import { API_ROOT, X_API_KEY } from '../../config';
import { fetchUtil } from '../../util';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'x-api-key': X_API_KEY
};

export const getLocationDataRaw = (token, body) =>
  fetchUtil(
    `${API_ROOT}/list_donors_nearby`,
    'POST',
    { ...headers, Authorization: `Bearer ${token}` },
    body
  );

export const getLocationData = (token, body) =>
  fetchUtil(
    'https://h3.api.mytruckin.com/get_h3_indices_wah',
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

export const markAsCompleted = (token, body) =>
  fetchUtil(
    `${API_ROOT}/picked_up_from_donor`,
    'POST',
    { ...headers, Authorization: `Bearer ${token}` },
    body
  );
