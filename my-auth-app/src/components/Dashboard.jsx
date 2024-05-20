import { useEffect, useState } from 'react';
import { useApi } from '../services/ApiService';
import Navbar from './Navbar';

const Dashboard = () => {
  const { fetchSecuredData } = useApi();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchSecuredData();
        setData(result);
      } catch (error) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [fetchSecuredData]);

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <p>{data}</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
