import { Outlet, useNavigate, Link } from 'react-router-dom';
import { useContext } from 'react';
import { Layout, Button, Breadcrumb } from 'antd';
import AuthContext from '../../context/auth-context';
import logo from '/logo.svg';

const { Header, Content, Footer } = Layout;

const styles = {
  layout: {
    height: '100vh',
    backgroundColor: 'white',
  },
  header: {
    height: '70px',
    backgroundColor: '#70191C',

    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  content: {
    height: '90% - 70px',
    minHeight: 500,
  },
  footer: {
    height: '10%',
    backgroundColor: 'white',
    textAlign: 'center',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  logoutButton: {
    color: 'white',
    border: '1px solid white',
    backgroundColor: 'transparent',
  },
};

const MainLayout = () => {
  const navigation = useNavigate();
  const { isLoggedIn, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigation('/');
  };

  return (
    <Layout style={styles.layout}>
      <Header style={styles.header}>
        <div>
          <Link to="/">
            <div style={styles.logoContainer}>
              <img src={logo} alt="logo" height={50} />
              <span
                style={{
                  color: 'white',
                  padding: '0 5px',
                  fontFamily: 'roboto',
                  fontSize: '1.5rem',
                }}
              >
                Exchange Rate App
              </span>
            </div>
          </Link>
        </div>
        {isLoggedIn ? (
          <Breadcrumb>
            <Breadcrumb.Item>
              <Button style={styles.logoutButton} onClick={handleLogout}>
                Log out
              </Button>
            </Breadcrumb.Item>
          </Breadcrumb>
        ) : null}
      </Header>
      <Content style={styles.content}>{<Outlet />}</Content>
      <Footer style={styles.footer}>Exchange Rate App ©2022</Footer>
    </Layout>
  );
};

export default MainLayout;
