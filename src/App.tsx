import React from 'react';
import './App.css';
import Header from './component/Header/Header'
import Table from './component/Table/Table'

function App() {

  return (
    <div className="body">

      <Header></Header>
   
      <div className="main-container">
      <Table></Table>
      </div>
    </div>
  );
}

export default App;
