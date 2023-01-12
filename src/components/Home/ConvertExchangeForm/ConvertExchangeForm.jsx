import { Typography, Form, Input, Button, Row, Col } from 'antd';
import { useRef, useContext } from 'react';
import { getAllExchanges } from '../../../api/exchanges';
import AuthContext from '../../../context/auth-context';

const styles = {
  form: {
    padding: 20,
    width: '60%',
    minWidth: 500,
    margin: '0 auto',
  },
};

const ConvertExchange = () => {
  const { token } = useContext(AuthContext);
  const amountRef = useRef(null);
  const fromRef = useRef(null);
  const toRef = useRef(null);
  const convertionRef = useRef(null);

  const submitHandler = async e => {
    e.preventDefault();
    const amount = amountRef.current.input.value;
    const from = fromRef.current.input.value.toUpperCase();
    const to = toRef.current.input.value.toUpperCase();

    try {
      const exchanges = await getAllExchanges(token, {
        from,
        to,
      });
      console.log(exchanges);
      const exchange = exchanges.data.exchanges[0];
      const convertion = amount * exchange.rate;
      convertionRef.current.input.value = convertion.toFixed(4);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Form name="create-exchange" style={styles.form}>
      <Row justify="center">
        <Col>
          <strong>Convert</strong>
        </Col>
        <Col>
          <Row justify="space-around">
            <Col span={4}>
              <Form.Item htmlFor="amount">
                <Input placeholder="amount" ref={amountRef} name="amount" />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item htmlFor="from">
                <Input placeholder="from" ref={fromRef} name="from" />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item htmlFor="to">
                <Input placeholder="to" ref={toRef} name="to" />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item htmlFor="convertion">
                <Input
                  placeholder="convertion"
                  ref={convertionRef}
                  name="convertion"
                  disabled
                />
              </Form.Item>
            </Col>
          </Row>
        </Col>
        <Col>
          <Form.Item>
            <Button type="primary" htmlType="submit" onClick={submitHandler}>
              Convert
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default ConvertExchange;
