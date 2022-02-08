import React, { useMemo, useState, useEffect } from "react";

import axios from "axios";

import './App.css';
import Table from "./Table";

function App() {

  const [table,setTable]=useState('')

  const columns = useMemo(
    () => [
      {
        Header: "Log ID",
        accessor: "logId"
      },
      {
        Header: "Application Type",
        accessor: "applicationType"
    
      }
      ,
      {
        Header: "Application ID",
        accessor: "applicationId"
    
      }
      ,
      {
        Header: "Action",
        accessor: "actionType"
    
      }
      ,
      {
        Header: "Action Details",
        accessor: "userAgent"
    
      }
      ,
      {
        Header: "Date",
        accessor: "creationTimestamp"
    
      }
    ],
    []
  );
  useEffect(() => {
    (async () => {
      const result = await axios("https://run.mocky.io/v3/a2fbc23e-069e-4ba5-954c-cd910986f40f").then((response)=>{

       

        console.log(response.data.result.auditLog.length);
        if(response.data.result.auditLog.length>0)
        setTable( <Table columns={columns} data={response.data.result.auditLog} />)

      });
   
      
    })();
  }, []);

  return (

    <div className="App">
 
   {table}
    </div>
  );
}


export default App;
