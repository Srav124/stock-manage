import React, { useState } from 'react';
import axios from 'axios';
import './DataTable.css';

interface Data {
  id: string;
  name: string;
  symbol: string;
}

interface DataTableProps {
  data: Data[];
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState<any>(null);

  const onClickHandler = async (id: string) => {
    try {
      const response = await axios.get(`http://localhost:3000/stock/${id}`);
      if (response.status === 200) {
        setModalData(response.data);
        setShowModal(true);
      }
    } catch (error) {
      console.error('Error fetching details:', error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setModalData(null);
  };

  return (
    <div className="container">
      <table style={{ border: '1px solid black' }}>
        <thead>
          <tr style={{ border: '1px solid black' }}>
            <th style={{ border: '1px solid black' }}>Symbol</th>
            <th style={{ border: '1px solid black' }}>Name</th>
            <th style={{ border: '1px solid black' }}>Data</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry) => (
            <tr key={entry.id} style={{ border: '1px solid black' }}>
              <td style={{ border: '1px solid black' }}>{entry.symbol}</td>
              <td style={{ border: '1px solid black' }}>{entry.name}</td>
              <td style={{ border: '1px solid black' }}>
                <button onClick={() => onClickHandler(entry.id)}>Get Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && modalData && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-modal" onClick={closeModal}>X</button>
            <h2>{modalData[0]?.name} Details</h2>
            <table style={{ border: '1px solid black', width: '100%' }}>
              <thead>
                <tr>
                  <th style={{ border: '1px solid black' }}>Symbol</th>
                  <th style={{ border: '1px solid black' }}>Current Price</th>
                  <th style={{ border: '1px solid black' }}>Market Cap</th>
                  <th style={{ border: '1px solid black' }}>High 24h</th>
                  <th style={{ border: '1px solid black' }}>Low 24h</th>
                  <th style={{ border: '1px solid black' }}>Price Change 24h</th>
                  <th style={{ border: '1px solid black' }}>Price Change Percentage 24h</th>
                  <th style={{ border: '1px solid black' }}>Total Supply</th>
                  <th style={{ border: '1px solid black' }}>Max Supply</th>
                </tr>
              </thead>
              <tbody>
                {modalData.map((entry: any) => (
                  <tr key={entry._id} style={{ border: '1px solid black' }}>
                    <td style={{ border: '1px solid black' }}>{entry.symbol}</td>
                    <td style={{ border: '1px solid black' }}>{entry.current_price} USD</td>
                    <td style={{ border: '1px solid black' }}>{entry.market_cap} USD</td>
                    <td style={{ border: '1px solid black' }}>{entry.high_24h} USD</td>
                    <td style={{ border: '1px solid black' }}>{entry.low_24h} USD</td>
                    <td style={{ border: '1px solid black' }}>{entry.price_change_24h} USD</td>
                    <td style={{ border: '1px solid black' }}>{entry.price_change_percentage_24h} %</td>
                    <td style={{ border: '1px solid black' }}>{entry.total_supply}</td>
                    <td style={{ border: '1px solid black' }}>{entry.max_supply}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
