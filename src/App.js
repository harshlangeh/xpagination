import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [data, setData] = useState([]);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(data.length/itemsPerPage)


  const displayData = data.slice((currentPage -1)*itemsPerPage, currentPage*itemsPerPage);

  const handleClickNext = () => {
    if (currentPage < totalPages){
      setCurrentPage(currentPage + 1)
    }
  };

  const handleClickPrevious = () => {
    if(currentPage > 1){
      setCurrentPage(currentPage - 1)
    }
  }


  useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
        // if (!response.ok) {
        //   throw new Error('Fail to fetch data');
        // }
        const dataResponse = await response.json();
        setData(dataResponse);
        console.log("Data=>",data);
      } catch (error) {
        console.log(error)
      }
      
    };
    fetchData();
  },[]);



  return (
    <div >
      <h1 className="App">Employee Data Table</h1>
      <div className='header'>
      <h1 style={{margin: '1px', padding: '3px'}}>ID</h1>
        <h1 style={{margin: '1px', padding: '3px'}}>Name</h1>
        <h1 style={{margin: '1px', padding: '3px'}}>Email</h1>
        <h1 style={{margin: '1px', padding: '3px'}}>Role</h1>

      </div>
     {displayData.map((items, index)=> (
      <div key={items.id} className='table'>
        <h1 style={{margin: '4px'}}>{items.id}</h1>
        <h1 style={{margin: '4px'}}>{items.name}</h1>
        <h1 style={{margin: '4px'}}>{items.email}</h1>
        <h1 style={{margin: '4px'}}>{items.role}</h1>
      </div>
     ))}
     <div>
      <button onClick={handleClickPrevious}>Previous</button>
      <button disabled>{currentPage}</button>
      <button onClick={handleClickNext}>Next</button>
     </div>
    </div>
  );
}

export default App;
