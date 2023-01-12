import { useContext } from 'react';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';

import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import MainLayout from './components/MainLayout/MainLayout';
import AuthContext from './context/auth-context';

const user = localStorage.getItem('user');

const ProtectedRoute = ({ element, ...rest }) => {
  const { isLoggedIn } = useContext(AuthContext);
  return isLoggedIn ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/" />
  );
};

const App = () => {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <Routes>
      {isLoggedIn ? (
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
        </Route>
      ) : (
        <Route path="/" element={<Login />} />
      )}
    </Routes>
  );
};

export default App;
