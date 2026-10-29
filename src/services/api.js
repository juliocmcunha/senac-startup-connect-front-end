import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

export function getApiError(error) {
  return error?.response?.data?.message || error?.message || 'Não foi possível concluir a operação.';
}

export const authApi = {
  login: (email, password, expectedRole) => api.post('/auth/login', { email, password, expectedRole }).then(r => r.data),
  registerInvestor: (payload) => api.post('/auth/register/investor', payload).then(r => r.data),
  registerStartup: (payload) => api.post('/auth/register/startup', payload).then(r => r.data)
};

export const dashboardApi = {
  investor: (userId) => api.get(`/dashboard/investor/${userId}`).then(r => r.data),
  startup: (userId) => api.get(`/dashboard/startup/${userId}`).then(r => r.data)
};

export const searchApi = {
  startups: ({ search = '', investorUserId } = {}) => api.get('/startups', { params: { search, investorUserId } }).then(r => r.data),
  investors: ({ search = '', startupUserId } = {}) => api.get('/investors', { params: { search, startupUserId } }).then(r => r.data)
};

export const interestsApi = {
  create: (fromUserId, toUserId) => api.post('/interests', { fromUserId, toUserId }).then(r => r.data),
  investorOpportunities: (userId) => api.get(`/opportunities/investor/${userId}`).then(r => r.data),
  startupOpportunities: (userId) => api.get(`/opportunities/startup/${userId}`).then(r => r.data)
};

export const notificationsApi = {
  getByUser: (userId, type) => api.get(`/notifications/user/${userId}`, { params: type && type !== 'Todas' ? { type } : {} }).then(r => r.data),
  markAllAsRead: (userId) => api.patch(`/notifications/user/${userId}/read-all`)
};

export default api;
