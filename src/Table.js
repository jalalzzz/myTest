import React, { useEffect, useState } from "react";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import "./Table.css";

export default function Table({ columns, data }) {
  const [filterInput, setFilterInput] = useState("");
  const [applactionData, setApplactionData] = useState([]);
  const [actionType, setActionType] = useState([]);
  const [firstTime, setFirstTime] = useState(true);
  const [selectApplaction, setSelectApplaction] = useState("All");
  const [selectAction, setSelectAction] = useState("All");
  const [fromDate, setFromDate] = useState(0);
  const [toDate, setToDate] = useState(0);
  const [allDate, setAllDate] = useState([]);

  useEffect(() => {
    console.log(data);
    setAllDate(data);
    if (data.length !== 0 && firstTime) {
      setFirstTime(false);
      let arr = [];
      let arr2 = [];
      data.forEach((val, index, array) => {
        if (
          arr.indexOf(val.applicationType) === -1 &&
          val.applicationType !== null
        ) {
          arr.push(val.applicationType);
        }
        if (arr2.indexOf(val.actionType) === -1 && val.actionType !== null) {
          arr2.push(val.actionType);
        }
      });
      arr.sort();
      arr2.sort();
      setApplactionData([...arr]);
      setActionType([...arr2]);
    }
  }, []);

  useEffect(() => {
    if (
      selectApplaction === "All" &&
      selectAction === "All" &&
      fromDate === 0 &&
      toDate === 0
    ) {
      setAllDate(data);
    } else {
      setAllDate(
        data.filter(
          (item) =>
            (selectApplaction === "All" ||
              selectApplaction === item.applicationType) &&
            (selectAction === "All" || selectAction === item.actionType) &&
            (fromDate === 0 ||
              new Date(fromDate).getTime() <=
                new Date(item.creationTimestamp).getTime()) &&
            (toDate === 0 ||
              new Date(toDate).getTime() >=
                new Date(item.creationTimestamp).getTime())
        )
      );
    }

    console.log(allDate.length);
  }, [selectApplaction, selectAction, fromDate, toDate]);

  const handleFilterChange = (e) => {
    const value = e.target.value || undefined;
    //setFilter("action", value);
    setFilterInput(value);
    FilterChange();
  };
  const FilterChange = (e) => {
    console.log(allDate.length);
  };

  return (
    <>
      <div className="divMain">
        <label>Employee Name</label>
        <input
          value={filterInput}
          onChange={handleFilterChange}
          placeholder={"e.g Admin.User"}
        />
      </div>
      <div className="divMain">
        <label>Action Type</label>
        <select
          onChange={(e) => {
            setSelectAction(e.target.value);
            FilterChange();
          }}
          value={selectAction}
        >
          <option value="All">{""}</option>
          {actionType.map((item) => {
            return (
              <option value={item} key={Math.random() + item}>
                {item}
              </option>
            );
          })}
        </select>
      </div>
      <div className="divMain">
        <label>Application Type</label>

        <select
          onChange={(e) => {
            setSelectApplaction(e.target.value);
            FilterChange();
          }}
          value={selectApplaction}
        >
          <option value="All">{""}</option>
          {applactionData.map((item) => {
            return (
              <option value={item} key={Math.random() + item}>
                {item}
              </option>
            );
          })}
        </select>
      </div>
      <div className="divMain">
        <label>From Date</label>
        <input
          onChange={(e) => {
            setFromDate(e.target.value);
            FilterChange();
          }}
          value={fromDate === 0 ? "" : fromDate}
          type="date"
        />
      </div>
      <div className="divMain">
        <label>To Date</label>
        <input
          onChange={(e) => {
            setToDate(e.target.value);
            FilterChange();
          }}
          value={toDate === 0 ? "" : toDate}
          type="date"
        />
      </div>

      <ReactTable
        data={allDate}
        columns={columns}
        defaultPageSize={10}
        className="-striped -highlight"
        filterable
        showPaginationBottom
      />
    </>
  );
}
