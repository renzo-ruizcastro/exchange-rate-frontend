import { Layout, Row, Col } from 'antd';
import LoginForm from '../../components/Login/LoginForm/LoginForm';
import logo from '/logo.svg';
const { Content, Footer } = Layout;

const styles = {
  layout: {
    height: '100vh',
    backgroundColor: 'white',
  },
  content: {
    height: '90%',
    minHeight: 500,
    backgroundColor: 'white',
  },
  footer: {
    height: '10%',
    backgroundColor: 'white',
    textAlign: 'center',
  },
  row: {
    height: '100%',
  },
  col: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

const Login = () => {
  return (
    <Layout style={styles.layout}>
      <Content style={styles.content}>
        <Row style={styles.row}>
          <Col xl={12} style={styles.col}>
            <img src={logo} alt="logo" height={500} />
          </Col>
          <Col xs={24} xl={12} style={styles.col}>
            <LoginForm />
          </Col>
        </Row>
      </Content>
      <Footer style={styles.footer}>Exchange Rate App ©2022</Footer>
    </Layout>
  );
};

export default Login;
