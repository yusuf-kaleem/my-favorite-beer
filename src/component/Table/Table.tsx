import { Table } from 'antd';
import React,{useState} from 'react';


const columns = [
  {
    title: 'Image',
    dataIndex: 'img',
    key: 'img',
    render: (text: string | undefined) => <img height={100} src={text}></img>,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Drink Before',
    dataIndex: 'drink_before',
    key: 'drink_before',
  },
  {
    title: 'Where',
    dataIndex: 'where',
    key: 'where',
  },
  {
    title: 'When Drunk',
    dataIndex: 'when',
    key: 'when',
  },

  {
    title: 'Taste Note',
    dataIndex: 'taste_note',
    key: 'taste_note',
  },

  {
    title: 'Comment',
    dataIndex: 'comment',
    key: 'comment',
  },
];


const App: React.FC = () => { 
    const [saveList, setSaveList] = useState<any[]>([])

    window.addEventListener('storage', () => {
        let data = sessionStorage.getItem("table_data")
        setSaveList(JSON.parse(data ||'{}'))
    })    

return (<Table columns={columns} dataSource={saveList} />)
};


export default App;