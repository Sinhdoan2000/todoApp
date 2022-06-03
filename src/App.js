import './index.css';
import { useState, useEffect } from 'react';
import '@shopify/polaris/build/esm/styles.css';
import {Button} from '@shopify/polaris';
function App() {

  const jobs = [
      {
        id: 0,
        checked: false,
        name: "clear table"
      },
      {
        id: 1,
        checked: false,
        name: "washes my clothes"
      },
      {
        id: 2,
        checked: false,
        name: "washes my face"
      }
  ]
  
  const filters = [
      {
        name: "All"
      },
      {
        name: "Active"
      },
      {
        name: "Completed"
      }
  ];
  const [dataJobs, setDataJob] = useState(()=>{
      window.localStorage.setItem('jobs', JSON.stringify(jobs));
      const getJsons = window.localStorage.getItem('jobs');
      const dataJSON = JSON.parse(getJsons); 
    return dataJSON ? dataJSON : [];
  });

  useEffect(()=>{
    setDataJob(dataJobs);
  }, [dataJobs.length])

  const [tabs, setTabs] = useState('All');
  const [isSearch, setSearch] = useState(false);
  const [addValue, setAddValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  //Trả về dữ liệu gốc.
  const currentData = ()=>{
    const getJsons = window.localStorage.getItem('jobs');
    const dataJSON = JSON.parse(getJsons); 
    setDataJob(dataJSON);
  }
 //Xử lý thêm data.
  const handleAdd = (e)=>{
      const isExist = dataJobs.filter(item=>{
        return addValue == item.name;
      })
      if(isExist.length <= 0 && addValue && e.keyCode == 0){
        let id = dataJobs.length > 0 ? dataJobs[dataJobs.length - 1].id + 1 : 0;
        const newJob = {
          id,
          checked: false,
          name: addValue          
        }
        dataJobs.push(newJob);
        setAddValue("");
        window.localStorage.setItem('jobs', JSON.stringify(dataJobs));
        currentData();
      }
  }
 //Xử lý tìm kiếm data.
  const handleSearch = (e) =>{
      setSearchValue(e.target.value);
      setTabs(filters[0].name);
      const getJsons = window.localStorage.getItem('jobs');
      const dataJSON = JSON.parse(getJsons); 
      const resultFilter = dataJSON.filter(item=>{
        return item.name.toLowerCase().search(e.target.value.toLowerCase()) != -1; 
      }) 
      if(resultFilter && searchValue){
        setDataJob(resultFilter);
      }else if(searchValue.length == 0){
        currentData();
      }else{
        setDataJob([]);
      }
  }
 
  //Xử lý lọc data khi change tabs.
  useEffect(()=> {
    const getJsons = window.localStorage.getItem('jobs');
    const dataJSON = JSON.parse(getJsons); 
    if(tabs === "All"){
      currentData();
    }else if(tabs == "Active"){
      const dataActive = dataJSON.filter(item => {
        return item.checked === false;
      })
      setDataJob(dataActive);
    }else{
      const dataCompleted = dataJSON.filter(item => {
        return item.checked === true;
      })
      console.log('data completed', dataCompleted);
      setDataJob(dataCompleted);
    }
  }, [tabs])

  //khi tabs đang ở Active or completed: nếu checkbox thay đổi sẽ lọc lại data.
  useEffect(() => {
    const getJsons = window.localStorage.getItem('jobs');
    const dataJSON = JSON.parse(getJsons); 
    if(tabs == 'Active'){
      const dataActive = dataJSON.filter(item => {
        return item.checked === false;
      })
      setDataJob(dataActive);
    }else if(tabs == "Completed"){
      const dataCompleted = dataJSON.filter(item => {
        return item.checked === true;
      })
      setDataJob(dataCompleted);
    }
  }, [isChecked])

  //Xử lý khi change checkbox thì cập nhập data.
  const handleIsChecked = (e, job) =>{   
      e.target.checked ? job.checked = true : job.checked = false;   
      const getJsons = window.localStorage.getItem('jobs');
      const dataJSON = JSON.parse(getJsons);
      dataJSON.forEach(item=>{
        if(item.id == job.id){
          e.target.checked ? item.checked = true : item.checked = false;
        }
      })
      window.localStorage.setItem('jobs', JSON.stringify(dataJSON));
  }
  
  //Bật input add
  const handleRenderAll = ()=>{
    setSearch(false);
    setTabs(filters[0].name);
    currentData();
  }
  //Bật input search 
 const handleOpenSearch  = () =>{
    setSearch(true);
    setTabs(filters[0].name);
 }
  //re-render lại data mỗi khi data thay đổi
  useEffect(()=>{
    setDataJob(dataJobs)
  }, [dataJobs.length])

  return (
          <div className="App">
            <div className="Globo-app">
              <header>
                  <h1 className="Globo-title">Things To Do</h1>
                  <div className="Globo-input">
                    {!isSearch && <input type="text" 
                        id="Globo-input_add"
                        placeholder='Add New' 
                        value={addValue} 
                        onChange={e => setAddValue(e.target.value)}
                        onKeyPress={e => handleAdd(e)}
                    />}
                    {isSearch && <input type="text" 
                        id="Globo-input_search" 
                        placeholder='Search' 
                        onChange={e => handleSearch(e)}
                    />}
                  </div>
              </header>
              <div className="Globo-content">
                <ul className="Globo-listJobs">
                  {dataJobs.length > 0 ? dataJobs.map((job, index)=>{               
                    return (
                        <li key={index} id={"Globo-job-" + job.id} className="Globo-job_item" style={{display: "flex"}}>
                          <input type="checkbox" 
                            id={"Globo-checkbox-" + job.id}
                            className="Globo-checkboxJob" 
                            checked={job.checked}
                            onChange={e => handleIsChecked(e, job)}
                            onClick={() => setIsChecked(!isChecked)}
                          />
                          <label htmlFor={"Globo-checkbox-" + job.id} className="Globo-job_name">{job.name}</label>
                        </li>
                    )
                  }) :  <p style={{margin: "10px 0", padding: "10px", background: "#F2F2F2", color: "#888888", fontWeight: "500"}}>There are not items</p>}
                </ul>
              </div>
              <footer style={{display: "flex"}}>
                <div className="Globo-handle" style={{display: "flex"}}>
                  <button id="Globo-button-add" onClick={handleRenderAll}>
                    <i className="fa-solid fa-plus"></i>
                  </button>
                  <button id="Globo-button-search" style={{color: "#777"}} onClick={()=> handleOpenSearch()}>
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </button>
                  <span className="Globo-countJob">{dataJobs.length > 1 ? dataJobs.length + " items left" : dataJobs.length + " item left"}</span>
                </div>
                <div className='Globo-filters' style={{display: "flex"}}>
                    {filters.map((filter, index)=>{
                      return (
                        <button 
                          key={index}
                          className={tabs == filter.name ? 'Globo-filters_button selected-'+ filter.name : 'Globo-filters_button filter.name'}
                          style={tabs == filter.name ? {border: "1px solid rgba(175, 47, 47, 0.2)"} : {}}
                          onClick={()=> setTabs(filter.name)}
                        >
                          {filter.name}
                        </button>
                      )
                    })}
                </div>
              </footer>
            </div>
              <p className="message-notify">Press `Esc` to cancel.</p>
          </div>
  );
}

export default App;
