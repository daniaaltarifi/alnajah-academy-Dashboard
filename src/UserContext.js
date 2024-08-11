// UserContext.js
import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    isLoggedIn: false,
    userId: '',
    userName: '',
    role: ''
  });

  useEffect(() => {
    const auth = localStorage.getItem('auth');
    const name = localStorage.getItem('name');
    const id = localStorage.getItem('id');
    
    const role = localStorage.getItem('role');
    setUser({
      isLoggedIn: !!auth,
      userName: name || '',
      userId: id || '',
      role: role || ''
    });
  }, []);

  const updateUser = (name, id,  role) => {
    localStorage.setItem('name', name);
    localStorage.setItem('id', id);
    localStorage.setItem('role', role);
    const auth = localStorage.getItem('auth');
    setUser({
      isLoggedIn: !!auth,
      userName: name,
      userId: id,
      role: role
    });
  };

  const logout = () => {
    localStorage.clear();
    setUser({
      isLoggedIn: false,
      userId: '',
      userName: '',
      role: '',
    });
    window.location.href = '/';
  };

  return (
    <UserContext.Provider value={{ user, updateUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };