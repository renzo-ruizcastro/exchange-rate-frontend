import { Form, Button } from 'antd';
import { getExchange } from '../../../api/exchanges';
import { useState, useEffect } from 'react';

const DeleteExchangeForm = props => {
  const { id } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [exchange, setExchange] = useState({});

  const fetchExchange = async () => {
    try {
      setIsLoading(true);
      const response = await getExchange(id);
      setExchange(response);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchExchange();
  }, []);

  const info = (
    <>
      <p>ID: {exchange.id}</p>
      <p>FROM: {exchange.from}</p>
      <p>TO: {exchange.to}</p>
      <p>RATE: {exchange.rate}</p>
    </>
  );

  return <div>{!isLoading ? info : 'Loading...'}</div>;
};

export default DeleteExchangeForm;
