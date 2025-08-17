import API from './axios'
export const loginUser = (credentials) => {
  return API.post('/login', credentials)
}

export const userList = ({ currentPage = 1, itemsPerPage = 10, searchData = '' }) => {
  const token = localStorage.getItem('token');
  return API.get('/user', {
    params: { currentPage, itemsPerPage, searchData },
    headers: { Authorization: `${token}` }
  });
};

export const userBooking = (userId, currentPage = 1, itemsPerPage = 10) => {
  const token = localStorage.getItem("token");
  return API.get(`/user-booking`, {
    params: { currentPage, itemsPerPage ,userId},
    headers: { Authorization: `${token}` },
  });
};


export const vendorList = ({ currentPage = 1, itemsPerPage = 10, searchData = '' }) => {
  const token = localStorage.getItem('token');
  return API.get('/vendor', {
    params: { currentPage, itemsPerPage, searchData },
    headers: { Authorization: `${token}` }
  });
};

export const vendorDetails = (vendorId) => {
  const token = localStorage.getItem('token');
  return API.get(`/vendor-details`, {
    params: { vendorId },
    headers: { Authorization: `${token}` }
  });
};


export const serviceList = ({ currentPage = 1, itemsPerPage = 10, searchData = '' }) => {
  const token = localStorage.getItem('token');
  return API.get('/service', {
    params: { currentPage, itemsPerPage, searchData },
    headers: { Authorization: `${token}` }
  });
};


export const getSubServicesByServiceId = ({ serviceId, currentPage = 1, itemsPerPage = 10, searchData = '' }) => {
  const token = localStorage.getItem('token');
  return API.get('/sub-service', {
    params: { serviceId, currentPage, itemsPerPage, searchData },
    headers: { Authorization: `${token}` }
  });
};

export const addService = (formData) => {
  const token = localStorage.getItem("token");
  return API.post("/service", formData, {
    headers: {
      "Authorization": `${token}`,
      "Content-Type": "multipart/form-data", 
    },
  });
};

export const addSubService = (formData) => {
  const token = localStorage.getItem("token");
  return API.post("/sub-service", formData, {
    headers: {
      "Authorization": `${token}`,
      "Content-Type": "multipart/form-data", 
    },
  });
};


export const getTimeSlot = ({currentPage = 1, itemsPerPage = 10, searchData = '' }) => {
  const token = localStorage.getItem('token');
  return API.get('/time-slot', {
    params: { currentPage, itemsPerPage, searchData },
    headers: { Authorization: `${token}` }
  });
};

export const addTimeSlot = (formData) => {
  const token = localStorage.getItem("token");
  return API.post("/time-slot", formData, {
    headers: {
      "Authorization": `${token}`,
      "Content-Type": "multipart/form-data", 
    },
  });
};
