import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';

const tabs = [
  "posts", "comments", "users", "todos", "photos", "albums"
]

function App() {
  
  // const [title, setTitle] = useState('');
  // const [height, setHeight] = useState(false);
  // const [domain, setDomain] = useState('posts');
  // const [data, setData] = useState([]);
  // const [avatar, setAvatar] = useState()
  //   //TH1: useEffect với callback  => useEffect(callback);
  //   useEffect(()=>{
  //     window.document.title = title;
  //     console.log('re-render - TH1: useEffect(callback)');
  //   }) 

  //   //TH2: useEffect với callback && Array rỗng => useEffect(callback, []);
  //   useEffect(()=>{   
  //     console.log('re-render - TH2: useEffect(callback, [])');   
  //     function handleScroll(){
      
  //       if(window.scrollY > 500){
  //         setHeight(true);
  //       }else{
  //         setHeight(false)
  //       }
  //       console.log('re-render - TH2: useEffect(callback, [])');
  //     }
  //     window.addEventListener('scroll', handleScroll);
      
  //   }, [])
  //   function handleGoToTop(e){
    
  //     // use jquery magic to get there ;) <br />
  
  //     window.scrollTo(0, 0);
  //   }


  //   //TH3: useEffect với callback, Array chứa Dependency => useEffect(callback, [Des]);
  //   useEffect(()=>{
  //     console.log('re-render - TH3: useEffect(callback, [Des])');
  //     fetch(`https://jsonplaceholder.typicode.com/${domain}`)
  //       .then(res=> res.json())
  //       .then(data=> setData(data))
  //   }, [domain])
  

  //   {/* Reduce function */}
  //   useEffect(()=>{
  //     const data = [5, 10, 15, 20, 25];

  //     const res = data.reduce((total,currentValue) => {
  //       return total + currentValue;
  //     }, 10);

  //     console.log(res); // 75
  //   }, [])
    
  //   useEffect(() => {
  //       return () =>{
  //         avatar && URL.revokeObjectURL(avatar.preview)
  //       }
  //   }, [avatar])
    
  //   const handlePreviewAvatar = (e) =>{
  //     const file = e.target.files[0];
  //     file.preview = URL.createObjectURL(file);
  //     setAvatar(file);
  //   }
  //  const styleButton = {
  //   background: 'red',
  //   color: 'white',
  //   padding: '20px 0px',
  //   position: 'fixed',
  //   right: '20px',
  //   bottom: '20px',
  //   border: 'none',
  //   borderRadius: '50%',
  //   boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  //   cursor: 'pointer'
  // }
  // const styleTabButton = {background: 'black', color: 'white', margin: "0 10px", padding: "14px 20px"}

  // const renderData = (
  //   <div>
  //      <label>Enter your text</label>
  //       <input onChange={(e)=> setTitle(e.target.value)} />
  //       <label>Choose Avatar</label>
  //     <input type="file" onChange={handlePreviewAvatar} />

  //     {avatar && <img src={avatar.preview} alt="" width="200px" height="200px" />} 

  //       {/* Render tab map function */}
  //       {tabs.map(function(tab, index){
  //         return <button
  //                   key={index} 
  //                   style={domain == tab ? styleTabButton : {margin: "0 10px", padding: "14px 20px"}}
  //                   onClick={()=> setDomain(tab)}
  //                 >
  //                   {tab}
  //                 </button>
  //       })}

  //       {/* Render content */}
  //       <div className="listItem" style={{marginLeft: '20px'}}>
  //         {data.map(function(item, index){
  //           return <div style={{textAlign: "left"}} key={index}>{index}. {item.title || item.name}</div> 
  //         })}
  //       </div>
        
  //       {/* show button Go to top */}
  //       {height && <button 
  //        style={styleButton}
  //       onClick={handleGoToTop}
  //       >
  //           Go to top
  //         </button>}
  //   </div>
  // )
  const jobs = [];
  const [job, setJob] = useState('');
  const [dataJobs, setDataJobs] = useState(jobs);
  const [reload, setReload] = useState(false);
  const [valueEdit, setValueEdit] = useState('');
  const $ = document.getElementById.bind(document);

  const handleAddJob = (e)=>{
    let errorMessage = document.getElementById('errorMessage');
    //kiểm tra giá trị đã tồn tại chưa ?
    let isExist = dataJobs.filter(function(item){
      return item.name == job;
    })

      if((isExist.length <= 0 && job) || (e.keyCode == 13 && job && isExist.length <= 0)){
        const newData = {
          name: job
        }
        dataJobs.push(newData);
        setDataJobs(dataJobs);  
        setJob("");
        setReload(reload => !reload)
      }else if(job == ""){
          return false;
      }else{
        errorMessage.style.display = 'block';
      }
  }
  const handleDeleteJob = (id)=>{
      dataJobs.splice(id, 1);
      setDataJobs(dataJobs);
      setReload(reload => !reload)
  }
  const handleEditJob = (id, value)=>{
      let currentElement = $(`edit-${id}`);
      currentElement.style.display = "block";

      let inputEdit = $(`edit-value-${id}`);
      inputEdit.value = value;
  }
  const handlFinish = (id)=>{
      let currentElement = $(`doneJob-${id}`);
      currentElement.style.display = 'inline';
  }
  const  handlUnFinished = (id) => {
      let currentElement = $(`doneJob-${id}`);
      currentElement.style.display = 'none';
  }
  const handleChangeValueEdit = (id)=>{ 
      let inputEdit = $(`edit-value-${id}`);
        ;  
      dataJobs[id].name = inputEdit.value;
      setDataJobs(dataJobs);
      let currentElement = $(`edit-${id}`);
      currentElement.style.display = "none";
      setReload(reload => !reload)
  }
  const handleCloseEdit = (id)=>{
      let currentElement = $(`edit-${id}`);
      currentElement.style.display = "none";
      setReload(reload => !reload)
  }
  const handleChangeValueAdd = (data)=>{
      setJob(data);
      let errorMessage = $('errorMessage');
      errorMessage.style.display = 'none';
  }
  return (
    <div className="App">
       {/* {renderData ? renderData : ""} */}
      <div className="appTodo">
        <div className="todoNav">
            <h1>List jobs</h1>
            <div className="todoButton">
              <label htmlFor="#todoInput">
                <input type="text" value={job} onChange={e => handleChangeValueAdd(e.target.value)} onKeyPress={(e) => handleAddJob(e)} placeholder="Enter your new job..."/>
                <button className="todoAddButton add" onClick={handleAddJob} >Add new job.</button>
                <button onClick={()=> setJob('')}>Clear</button>
                <p id="errorMessage" style={{color: 'red', display: 'none'}}>This job has been exists in your list job!!!</p>
              </label>
            </div>
        </div>
        <ul className="todoList">
            {dataJobs.map(function (item, index){
              return <li key={index} id={index}>
                      
                        <div style={{display: 'flex', alignItems: 'center'}}>
                          <div id={"doneJob-" + index} className="add doneJob" style={{ display: 'none'}}>Done</div>
                          <p className="lineItem finishElement">{item.name}</p> 
                        </div>
                        <br/>                     
                        { 
                        <div id={"edit-" + index} className="editJobs" style={{ display: 'none'}}>

                            <input id={"edit-value-" + index} type="text" onChange={e => setValueEdit(e.target.value)} />

                            <button className="add"   onClick={() => handleChangeValueEdit(index)}>Save</button>

                            <button className="close" onClick={() => handleCloseEdit(index)}>X</button>

                        </div>
                      }     
                        <br/>

                        <button className="delete"   onClick={()=> handleDeleteJob(index)}>Delete Job</button>

                        <button className="edit"     onClick={()=> handleEditJob(index, item.name)}>Edit</button>

                        <button className="finish"   onClick={()=> handlFinish(index)}>Finish</button>

                        <button className="unFinish" onClick={()=> handlUnFinished(index)}>unfinished</button>

                                
                    </li>
            })}
        </ul>
        </div>
    </div>
  );
}

export default App;
