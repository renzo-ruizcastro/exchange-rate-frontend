import { Typography, Form, Input, Button, Row, Col } from 'antd';
import { useState, useRef, useCallback, useContext } from 'react';
import { createExchange } from '../../../api/exchanges';
import AuthContext from '../../../context/auth-context';

const { Title } = Typography;

const styles = {
  form: {
    padding: 20,
    width: '60%',
    minWidth: 500,
    margin: '0 auto',
  },
};

const CreateExchangeForm = props => {
  const [form] = Form.useForm();
  const fromRef = useRef(null);
  const toRef = useRef(null);
  const rateRef = useRef(null);
  const inverseRateRef = useRef(null);

  const clearInputs = () => {
    form.resetFields();
  };

  const submitHandler = e => {
    e.preventDefault();
    const from = fromRef.current.input.value;
    const to = toRef.current.input.value;
    const rate = rateRef.current.input.value;
    const inverseRate = inverseRateRef.current.input.value;
    clearInputs();
    const payload = {
      currency_a: from,
      currency_b: to,
      rate_a_to_b: rate,
      rate_b_to_a: inverseRate,
    };
    props.onCreateExchange(payload);
  };

  return (
    <Form name="create-exchange" form={form} style={styles.form}>
      <Row justify="center">
        <Col>
          <strong>Create Exchange</strong>
        </Col>
        <Col>
          <Row justify="space-around">
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
              <Form.Item htmlFor="rate">
                <Input placeholder="rate" ref={rateRef} name="rate" />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item htmlFor="inverse-rate">
                <Input
                  placeholder="inverse-rate"
                  ref={inverseRateRef}
                  name="inverse-rate"
                />
              </Form.Item>
            </Col>
          </Row>
        </Col>
        <Col>
          <Form.Item>
            <Button type="primary" htmlType="submit" onClick={submitHandler}>
              Create
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default CreateExchangeForm;
