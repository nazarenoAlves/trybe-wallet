import React from 'react';

import WalletForm from '../components/WalletForm';
import Table from '../components/Table';

class Wallet extends React.Component {
  render() {
    return (
      <div className="contentGeneral">
        <WalletForm />
        <Table />
      </div>
    );
  }
}

export default Wallet;
