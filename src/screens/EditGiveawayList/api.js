import { API_ROOT, X_API_KEY } from '../../config';
import { fetchUtil } from '../../util';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'x-api-key': X_API_KEY
};

export const fetchGiveawayList = (token) =>
  fetchUtil(
    `${API_ROOT}/fetch_giveaway_list`,
    'GET',
    { ...headers, Authorization: `Bearer ${token}` },
    null
  );

export const saveGiveawayList = (token, body) =>
  fetchUtil(
    `${API_ROOT}/update_my_giveaway_list`,
    'POST',
    { ...headers, Authorization: `Bearer ${token}` },
    body
  );
