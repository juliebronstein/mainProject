import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../context/AdminLayoutContext";
import { Loading } from "./autForm/Loading";

export const PaginateTable = ({
  data,
  dataInf,
  additionField,
  children,
  searchParams,
  loading,
}) => {
  const { numOfPage, setNumOfPage } = useContext(AdminContext);
  const [tableData, setTableData] = useState([]);
  const [initData, setInitData] = useState(data);
  const [curentPage, setCurentPage] = useState(1);
  const [pages, setPages] = useState([]);
  const [pagesCount, setPagesCount] = useState(1);
  const [searchchar, setSearchChar] = useState("");
  const[numOfThisPage,setNumOfThisPage]=useState(numOfPage)
  const pageRange=2
  var i=1
  useEffect(() => {
    //console.log(numOfPage);
    let pCount = Math.ceil(initData.length / numOfThisPage);
    setPagesCount(pCount);
    let pArr = [];
    for (let i = 1; i <= pCount; i++) pArr = [...pArr, i];
    setPages(pArr);
  }, [initData,numOfThisPage]);

  useEffect(() => {
    //console.log(numOfPage);
    let start = curentPage * numOfThisPage - numOfThisPage;
    let end = curentPage * numOfThisPage;
    setTableData(initData.slice(start, end));
  }, [curentPage, initData, numOfThisPage]);

  useEffect(() => {
    setInitData(
      data.filter((d) => d[searchParams.searchField].includes(searchchar))
    );
    setCurentPage(1);
  }, [searchchar,data])
  ;
  const changeNumOfPage = (e) => {

    if(e.target.value && e.target.value>0) { 
      setNumOfThisPage(e.target.value)
      setCurentPage(1)
     }
  };

  return (
    <>
      <div className="row justify-content-between">
        <div className="col-10 col-md-6 col-lg-4">
          <div className="input-group mb-3 dir_ltr">
            <input
              type="text"
              className="form-control"
              placeholder={searchParams.placeholder}
              onChange={(e) => {
                setSearchChar(e.target.value);
              }}
            />
            <span className="input-group-text">{searchParams.title}</span>
          </div>
        </div>

        <div className="col-2 col-md-6 col-lg-4 d-flex flex-column align-items-end">
          {children}
        </div>
      </div>
{loading?<Loading/> :(data.length ? (
      <table className="table table-responsive text-center table-hover table-bordered">
        <thead className="table-secondary">
        
          <tr>
            <th>#</th>
            {dataInf.map((i) => (
              <th key={i.field}>{i.title}</th>
            ))}
            {additionField ? 
            additionField.map((a,index)=>(<th key={index+"_"+a.id}>{a.title}</th>))
            : null}
            {/* <th>#</th> */}
          </tr>
        </thead>


        
        <tbody >
          {tableData.map((d) => (
            <tr key={d.id}>
              <td>{i++}</td>
              {dataInf.map((i) => (
                <td key={d.id + "-" + i.field}>{d[i.field]}</td>
              ))}
              {additionField ? additionField.map((a,index)=>(<th key={'__'+index+a.id}>{a.elements(d)}</th>)) : null}
              {/* <td>{i++} </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <h5 className="text-center my-5 text-danger">
        هیچ رکوردی یافت نشد
      </h5>
    ))}
      

      {pages.length > 1 ? (
        <nav
          aria-label="Page navigation example"
          className="d-flex justify-content-center"
        >
          <ul className="pagination dir_ltr">
            <li className="page-item ">
              <span
                className={`page-link pointer ${
                  curentPage === 1 ? "disabled" : null
                } `}
                href="/#"
                aria-label="Previous"
                onClick={() => {
                  setCurentPage(curentPage - 1);
                }}
              >
                <span aria-hidden="true">&raquo;</span>
              </span>
            </li>



            { curentPage> pageRange?( 

<>

<li className="page-item me-2">
              <span
                className="page-link pointer"
                aria-label="first page"
                onClick={() => {
                  setCurentPage(1);
                }}
              >
                <span aria-hidden="true">1</span>
              </span>
           </li>
            {/*  <li className="page-item" >
            <span
                className="page-link disabled"
                aria-label="first page"
               
              >
                <span aria-hidden="true">...</span>
              </span>
            </li> */}
</>
            
            
            
            ):null
 }


            {pages.map((page) =>{
               return page<curentPage + pageRange &&
              page>curentPage-pageRange?(<li key={page} className="page-item ">
              <span
                className={`page-link pointer ${
                  page === curentPage ? "alert-success" : null
                }`}
                href="/#"
                onClick={() => {
                  setCurentPage(page);
                }}
              >
                {page}{" "}
              </span>
            </li>):null
              
            })}



{ pagesCount-pageRange >=curentPage ?( 
  <>
     {/* <li className="page-item me-1" >
            <span
                className="page-link disabled"
                aria-label="first page"
               
              >
                <span aria-hidden="true">...</span>
              </span>
            </li> */}
<li className="page-item ms-2">
              <span
                className="page-link pointer"
                aria-label="first page"
                onClick={() => {
                  setCurentPage(pagesCount);
                }}
              >
                <span aria-hidden="true">{pagesCount}</span>
              </span>
            </li>
       
</>
            
            ):null
 }




            <li className="page-item ">
              <span
                className={`page-link pointer ${
                  curentPage === pagesCount ? "disabled" : null
                }`}
                aria-label="Next"
                onClick={() => {
                  setCurentPage(curentPage + 1);
                }}
              >
                <span aria-hidden="true">&laquo;</span>
              </span>
            </li>
          </ul>
        </nav>
      ) : null}
      <div className="flexnwrap w-50">
      <label>نمایش تعداد سطر در صفحه:</label>
      <input
      className="input100 w-75 p-3"
        type="number" id="tentacles" name="tentacles"
        min="1" max="50"
        placeholder={`${numOfThisPage}`}
        onChange={changeNumOfPage}
        value={numOfThisPage}
      />
      </div>
    </>
  );
};
