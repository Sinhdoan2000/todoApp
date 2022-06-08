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
  const [dataRender, setDataRender] = useState(jobs);
  const [rootData, setRootData] = useState(dataRender);
  const [tabs, setTabs] = useState('All');
  const [isSearch, setSearch] = useState(false);
  const [addValue, setAddValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isShowing, setIsShowing] = useState(true);

 //Xử lý thêm data.
  const handleAdd = (e)=>{
      console.log(e.keyCode)
      const isExist = rootData.filter(item=>{
        return addValue.toLocaleLowerCase() == item.name.toLocaleLowerCase();
      })
      if(isExist.length <= 0 && addValue && e.keyCode == 13){
        let id = rootData.length > 0 ? rootData[rootData.length - 1].id + 1 : 0;
        const newJob = {
          id,
          checked: false,
          name: addValue          
        }
        rootData.push(newJob);
        setRootData(rootData);
        setDataRender(rootData);
        setAddValue("");
      }
  }

 //Xử lý tìm kiếm data.
  const handleSearch = (e) =>{
      setSearchValue(e.target.value);
      setTabs(filters[0].name);
      const resultFilter = rootData.filter(item=>{
        return item.name.toLowerCase().search(e.target.value.toLowerCase()) != -1; 
      }) 
      if(resultFilter && searchValue){
        setDataRender(resultFilter);
      }else if(searchValue.length == 0){
        setDataRender(rootData);
      }else{
        setDataRender([]);
      }
  }
 
  //Xử lý lọc data khi change tabs.
  useEffect(()=> {
    if(tabs === "All"){
      setDataRender(rootData);
    }else if(tabs == "Active"){
      const dataActives = rootData.filter(item => {
        return item.checked === false;
      })
      setDataRender(dataActives);
    }else{
      const dataCompleted = rootData.filter(item => {
        return item.checked === true;
      })
      setDataRender(dataCompleted);
    }
  }, [tabs])

  //khi tabs đang ở Active or completed: nếu checkbox thay đổi sẽ lọc lại data.
  useEffect(() => {
    if(tabs == 'Active'){
      const dataActives = rootData.filter(item => {
        return item.checked === false;
      })
      setDataRender(dataActives);
    }else if(tabs == "Completed"){
      const dataCompleted = rootData.filter(item => {
        return item.checked === true;
      })
      setDataRender(dataCompleted);
    }
  }, [isChecked])

  //Xử lý khi change checkbox thì cập nhập data.
  const handleIsChecked = (e, job) =>{   
      e.target.checked ? job.checked = true : job.checked = false;   
      rootData.forEach(item=>{
        if(item.id == job.id){
          e.target.checked ? item.checked = true : item.checked = false;
        }
      })
      setRootData(rootData)
  }
  
  //Bật input add
  const handleRenderAll = ()=>{
    setSearch(false);
    setAddValue("");
    setDataRender(rootData);
    setTabs(filters[0].name);
  }
  //Bật input search 
 const handleOpenSearch  = () =>{
    setSearch(true);
    setSearchValue("");
    setDataRender(rootData);
    setTabs(filters[0].name);
 }
 const handleAddChange = (e) => {
    setAddValue(e.target.value);
    setDataRender(rootData);
    setTabs(filters[0].name);
 }
useEffect(()=>{
  document.onkeyup = function (event) {

    if (event.keyCode == 27) {
      setIsShowing(false);
    }else if(event.keyCode == 191){
      setSearch(true);
      setIsShowing(true);
    }else{
      setSearch(false);
      setIsShowing(true);
    }
  };
})

  return (
          <div className="App">
            <div className="Globo-app">
              <header>
                  <h1 className="Globo-title">Things To Do</h1>
                  <div className="Globo-input" style={ isShowing ? {} : {display: "none"}}>
                    {!isSearch && <input type="text" 
                        id="Globo-input_add"
                        placeholder='Add New' 
                        value={addValue} 
                        onChange={e => handleAddChange(e)}
                        onKeyUp={e => handleAdd(e)}
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
                  {dataRender.length > 0 ? dataRender.map((job, index)=>{               
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
                  <span className="Globo-countJob">{dataRender.length > 1 ? dataRender.length + " items left" : dataRender.length + " item left"}</span>
                </div>
                <div className='Globo-filters' style={{display: "flex"}}>
                    {filters.map((filter, index)=>{
                      return (
                        <button 
                          key={index}
                          className={tabs == filter.name ? 'Globo-filters_button selected-'+ filter.name : 'Globo-filters_button' + filter.name}
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
              <p className="message-notify">
                {isShowing ? 'Press `Esc` to cancel.' : 'Press `/` to search and `N` to create a new item.'}
                </p>
          </div>
  );
}

export default App;
