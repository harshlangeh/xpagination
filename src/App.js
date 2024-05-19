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
        if (!response.ok) {
          throw new Error('Fail to fetch data');
        }
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
      <table>
        <thead>
          <tr><h1 style={{textAlign: 'center'}}>Employee Data Table</h1></tr>
          <tr style={{textAlign: 'center'}}>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>

        {displayData.map((items)=> (
      <tr key={items.id} className=''>
        <td>{items.id}</td>
        <td>{items.name}</td>
        <td>{items.email}</td>
        <td>{items.role}</td>
      </tr>
     ))}   
          
        </tbody>
      </table>

      <div>
      <button onClick={handleClickPrevious}>Previous</button>
      <button disabled>{currentPage}</button>
      <button onClick={handleClickNext}>Next</button>
     </div>
     
    </div>
  );
}

export default App;
