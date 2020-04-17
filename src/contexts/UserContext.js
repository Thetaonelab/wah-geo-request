import React from 'react';
import { TYPE_NGO } from '../constants';

export default React.createContext({
  name: '',
  address: '',
  phone: '',
  email: '',
  regNo: '',
  userType: TYPE_NGO,
  updateUser: () => {}
});
