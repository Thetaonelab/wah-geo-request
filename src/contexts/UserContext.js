import React from 'react';
import { TYPE_NGO, TYPE_DONOR } from '../constants';

export default React.createContext({
  ngo: {
    name: '',
    address: '',
    phone: '',
    email: '',
    regNo: '',
    userType: TYPE_NGO
  },
  donor: {
    name: '',
    address: '',
    phone: '',
    userId: '',
    userType: TYPE_DONOR
  },
  updateNGOUser: () => {},
  updateUser: () => {}
});
