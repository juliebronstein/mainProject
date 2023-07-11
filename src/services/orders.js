import httpService from "./httpService";

export const getAllPaginatedOrdersService = (page, countOnPage, searchChar) => {
    return httpService(`/api/admin/orders?page=${page}&count=${countOnPage}&searchChar=${searchChar}`, "get");
  };
  
  export const addNewOrderService = (data) => {
    return httpService("/api/admin/orders", "post", data);
  };
  
  export const getSinglrOrderService = (orderId)=>{
    return httpService(`/api/admin/orders/${orderId}`, "get")
  }
  
  export const editOrderService = (orderId, data) => {
    return httpService(`/admin/orders/${orderId}`, "put", data);
  };
  
  export const deleteOrderService = (orderId) => {
    return httpService(`/api/admin/orders/${orderId}`, "delete");
  };
  export const getOrderStatisticsService = () => {
    return httpService(`/api/admin/orders/orders_statistics`, "get");
  };
  export const getThisYearOrdersService = () => {
    return httpService(`/api/admin/orders/this_year_orders`, "get");
  };

