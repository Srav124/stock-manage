import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from './store/actions/dataAction';
import { RootState } from './store/index';
import DataTable from './components/DataTable';
import SymbolModal from './components/SymbolModal';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { data, symbol } = useSelector((state: RootState) => state.data);

  useEffect(() => {
    dispatch(fetchData(symbol));
    const interval = setInterval(() => {
      dispatch(fetchData(symbol));
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
