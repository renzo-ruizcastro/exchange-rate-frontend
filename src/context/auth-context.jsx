import { useState, createContext, useMemo, useCallback } from 'react';

const initialAuthState = {
  isLoggedIn: false,
  token: null,
  user: null,
  login: (token, user) => {},
  logout: () => {},
};

const AuthContext = createContext(initialAuthState);

const retrieveStoredData = () => {
  const storedToken = localStorage.getItem('token');
  const storedUser = JSON.parse(localStorage.getItem('user'));
  if (!storedToken || !storedUser) return null;
  return {
    token: storedToken,
    user: storedUser,
  };
};

export const AuthContextProvider = props => {
  const storedData = retrieveStoredData();
  const [token, setToken] = useState(storedData ? storedData.token : null);
  const [user, setUser] = useState(storedData ? storedData.user : null);
  const userIsLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }, []);

  const loginHandler = useCallback(async (token, user) => {
    setToken(token);
    setUser(user);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }, []);

  const contextValue = useMemo(
    () => ({
      isLoggedIn: userIsLoggedIn,
      token,
      user,
      login: loginHandler,
      logout: logoutHandler,
    }),
    [userIsLoggedIn, token, user, loginHandler, logoutHandler]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
