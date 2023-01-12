import { useState, useRef, useCallback, useContext } from 'react';
import { Typography, Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { login as apiLogin } from '../../../api/auth';
import AuthContext from '../../../context/auth-context';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const styles = {
  form: {
    padding: 20,
    width: '60%',
    minWidth: 300,
  },
};

const usernameRules = {
  // username regex
  regex: /^[a-zA-Z0-9]{3,}$/,
  errorMesage: 'El nombre de usuario no es válido',
};

const passwordRules = {
  regex: /^[a-zA-Z0-9]{3,}$/,
  errorMesage: 'La contraseña no es válida',
};

const initialLoginError = {
  usernameErrorMesage: null,
  passwordErrorMesage: null,
  loginErrorMessage: null,
};

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const [loginError, setLoginError] = useState(initialLoginError);

  const submitHandler = useCallback(e => {
    e.preventDefault();

    const username = usernameRef.current.input.value;
    const password = passwordRef.current.input.value;

    if (!usernameRules.regex.test(username)) {
      setLoginError({
        ...loginError,
        usernameErrorMesage: usernameRules.errorMesage,
      });
      return;
    }

    if (!passwordRules.regex.test(password)) {
      setLoginError({
        ...loginError,
        passwordErrorMesage: passwordRules.errorMesage,
      });
      return;
    }

    loginHandler(username, password);
  }, []);

  const loginHandler = useCallback(async (username, password) => {
    console.log(username, password);
    setLoginError(initialLoginError);

    try {
      const {
        token,
        data: { user },
      } = await apiLogin(username, password);
      login(token, user);
      message.success('Welcome');
      navigate('/');
    } catch (error) {
      setLoginError({
        ...loginError,
        loginErrorMessage: error.response.data.message,
      });
    }
  }, []);

  return (
    <Form style={styles.form} name="login">
      <Title>Iniciar sesión</Title>
      <Form.Item htmlFor="username">
        <Input
          placeholder="Username"
          ref={usernameRef}
          name="username"
          prefix={<UserOutlined />}
        />
      </Form.Item>
      {loginError.usernameErrorMesage ? <p>{usernameRules.errorMesage}</p> : ''}
      <Form.Item htmlFor="password">
        <Input.Password
          placeholder="Contraseña"
          ref={passwordRef}
          name="password"
          prefix={<LockOutlined />}
        />
      </Form.Item>
      {loginError.passwordErrorMesage ? <p>{passwordRules.errorMesage}</p> : ''}
      <Form.Item>
        <Button block htmlType="submit" onClick={submitHandler}>
          Ingresar
        </Button>
      </Form.Item>
      {loginError.loginErrorMessage ? (
        <p>{loginError.loginErrorMessage}</p>
      ) : (
        ''
      )}
    </Form>
  );
};

export default LoginForm;
