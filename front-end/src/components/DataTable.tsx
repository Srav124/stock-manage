import React from 'react';
import './DataTable.css'
interface Data {
  id: string;
  name: string;
  symbol: string;
}

interface DataTableProps {
  data: Data[];
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {

  const onClickHandler = (id: string) => {
    console.log('click handler')
  }
  return (
    <div className="container">
    <table className='table'>
      <thead>
        <tr>
          <th>Symbol</th>
          <th>Name</th>
          <th>Data</th>
        </tr>
      </thead>
      <tbody>
        {data.map((entry, index) => (
          <tr key={index}>
            <td>{entry.symbol}</td>
            <td>{entry.name}</td>
            <td><button onClick={() => onClickHandler(entry.id)}>Get Details</button></td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};

export default DataTable;
