import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './component/Header/Header'
import Table from './component/Table/Table'

//test
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
