import { API_ROOT, X_API_KEY } from '../../config';
import { fetchUtil } from '../../util';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'x-api-key': X_API_KEY
};

export const loginNGO = (body) =>
  fetchUtil(`${API_ROOT}/login_ngo`, 'POST', headers, body);
