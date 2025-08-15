import { create } from 'zustand';
import {  useNavigate } from 'react-router-dom';

// export const useAuthStore = create((set) => ({
//   isAuthenticated: !!localStorage.getItem('token'), 
//   login: (token) => {
//     localStorage.setItem('token', token);
//     set({ isAuthenticated: true });
//   },
//   logout: () => {
//     localStorage.removeItem('token');
//     set({ isAuthenticated: false });
//   },
// }));


// const navigate = useNavigate();
export const useAuthStore = create((set) => ({
  isAuthenticated: !!localStorage.getItem('token'),
  login: (token) => {
    localStorage.setItem('token', token);
    set({ isAuthenticated: true });
  },
  logout: () => {
    localStorage.removeItem('token');
    set({ isAuthenticated: false });
    // navigate('/');   
  },
}));
