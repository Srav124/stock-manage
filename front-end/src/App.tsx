import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from './store/actions/dataAction';
import { RootState } from './store/index';
import DataTable from './components/DataTable';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { data, symbol } = useSelector((state: RootState) => state.data);

  useEffect(() => {
    dispatch(fetchData());
    const interval = setInterval(() => {
      dispatch(fetchData());
    }, 60000); // Fetch every minute

    return () => clearInterval(interval);
  }, [dispatch, symbol]);

  return (
    <div>
      <h1>Real-Time Stock/Crypto Data</h1>
      <DataTable data={data} />
    </div>
  );
};

export default App;
