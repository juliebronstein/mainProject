import React, { useEffect, useState } from "react";

import { Loading } from "./autForm/Loading";

export const PaginateDataTable = ({
  initData,
  dataInf,
  // additionField,
  children,
  searchParams,
  loading,
  pagesCount,
  curentPage,
  setCurentPage,
  handelSearch,
}) => {
  const pageRange = 2;
  const [pages, setPages] = useState([]);
  let timeout;
  let i = 1;

  const handelSetSearchChar = (char) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      console.log("send...");
      handelSearch(char);
    }, 1000);
  };

  useEffect(() => {
    let pArr = [];
    for (let i = 1; i <= pagesCount; i++) pArr = [...pArr, i];
    setPages(() => pArr);
  }, [pagesCount]);

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
                handelSetSearchChar(e.target.value);
              }}
            />
            <span className="input-group-text">{searchParams.title}</span>
          </div>
        </div>

        <div className="col-2 col-md-6 col-lg-4 d-flex flex-column align-items-end">
          {children}
        </div>
      </div>
      {loading ? (
        <Loading />
      ) : initData.length ? (
        <table className="table table-responsive text-center table-hover table-bordered">
          <thead className="table-secondary">
            <tr>
              <th>#</th>
              {dataInf.map((i, index) => (
                <th key={i.field || `nofield_${index}`}>{i.title}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {initData.map((d) => (
              <tr key={d.id}>
                <td>{i++}</td>
                {dataInf.map((i, index) =>
                  i.field ? (
                    <td key={d.id + "-" + i.field}>{d[i.field]}</td>
                  ) : (
                    <td key={d.id + "__" + i.id + "__" + index}>
                      {i.elements(d)}
                    </td>
                  )
                )}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h5 className="text-center my-5 text-danger">هیچ رکوردی یافت نشد</h5>
      )}

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
            {/* <li className="page-item" >
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







            {pages.map((page) => {
              return page < curentPage + pageRange &&
                page > curentPage - pageRange ? (

                <li key={page} className="page-item ">
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
                </li>



              ) : null;
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





      {/* <div className="flexnwrap w-50">
        <label>نمایش تعداد سطر در صفحه:</label>
        <input
          className="input100 w-75 p-3"
          type="number"
          id="tentacles"
          name="tentacles"
          min="1"
          max="50"
          // placeholder={`${numOfThisPage}`}
          // onChange={changeNumOfPage}
          // value={numOfThisPage}
        />
      </div> */}
    </>
  );
};
