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

export const fetchNGORequests = (token) =>
  fetchUtil(
    `${API_ROOT}/fetch_ngo_requests`,
    'GET',
    { ...headers, Authorization: `Bearer ${token}` },
    null
  );

export const acceptNGORequest = (token, body) =>
  fetchUtil(
    `${API_ROOT}/accept_ngo_request`,
    'POST',
    { ...headers, Authorization: `Bearer ${token}` },
    body
  );

export const rejectNGORequest = (token, body) =>
  fetchUtil(
    `${API_ROOT}/reject_ngo_request`,
    'POST',
    { ...headers, Authorization: `Bearer ${token}` },
    body
  );

export const fetchDonorDetails = (token) =>
  fetchUtil(
    `${API_ROOT}/fetch_individual_details`,
    'GET',
    { ...headers, Authorization: `Bearer ${token}` },
    null
  );
