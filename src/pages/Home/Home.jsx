import { useState, useEffect, useContext } from 'react';
import { Space, Typography, Table, message, Button } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { getAllExchanges, createExchange } from '../../api/exchanges';
import { createAudit } from '../../api/audits';
import AuthContext from '../../context/auth-context';
import CreateExchangeForm from '../../components/Home/CreateExchangeForm/CreateExchangeForm';

const { Title } = Typography;

const styles = {
  greetings: {
    margin: '40px 0',
    textAlign: 'center',
  },
  table: {
    marginTop: 20,
    width: '80%',
    margin: 'auto',
  },
};

const Home = () => {
  const navigate = useNavigate();
  const { user, token } = useContext(AuthContext);
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      key: 'id',
      title: 'ID',
      dataIndex: 'id',
      align: 'center',
    },
    {
      key: 'from',
      title: 'From',
      dataIndex: 'from',
      align: 'center',
    },
    {
      key: 'to',
      title: 'To',
      dataIndex: 'to',
      align: 'center',
    },
    {
      key: 'rate',
      title: 'Rate',
      dataIndex: 'rate',
      align: 'center',
    },
    user.role === 1 && {
      key: 'action',
      title: 'Action',
      dataIndex: 'action',
      align: 'center',
      render: (_, record) => (
        <Space size="middle">
          <Button htmlType="button" onClick>
            <DeleteOutlined />
          </Button>
          <Button htmlType="button" onClick>
            <EditOutlined />
          </Button>
        </Space>
      ),
    },
  ];

  const fetchExchanges = async params => {
    setLoading(true);
    const response = await getAllExchanges(token, params);
    const exchanges = response.data.exchanges.map(exchange => ({
      key: exchange.id,
      id: exchange.id,
      from: exchange.from,
      to: exchange.to,
      rate: exchange.rate,
    }));
    setExchanges(exchanges);
    setLoading(false);
  };

  const handleCreateExchange = async payload => {
    try {
      const exchange = await createExchange(token, payload);
      await createAudit(token, {
        user_id: user.id,
        exchange_id: exchange.id,
        log: `POST /exchanges ${JSON.stringify(payload)}`,
      });
      message.success('Exchange created successfully');
      fetchExchanges();
    } catch (error) {
      message.error('Error creating exchange');
    }
  };

  useEffect(() => {
    fetchExchanges();
  }, []);

  const createExchangeForm =
    user.role === 1 ? (
      <CreateExchangeForm onCreateExchange={handleCreateExchange} />
    ) : null;

  return (
    <>
      <div style={styles.greetings}>
        <Title>Welcome {`${user.username}`}</Title>
      </div>
      {createExchangeForm}
      <div style={styles.table}>
        <Table
          columns={columns}
          dataSource={exchanges}
          loading={loading}
          rowKey={item => item.id}
          onRow={record => {
            return {
              onClick: () => {
                navigate(`/exchanges/${record.id}`);
              },
            };
          }}
        />
      </div>
    </>
  );
};

export default Home;
