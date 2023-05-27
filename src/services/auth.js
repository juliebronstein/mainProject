import httpService from "./httpService"

export const loginService=(values)=>{

  return  httpService("/api/auth/login","post",{
        ...values,
            remember: values.remember ? 1 : 0,
      })
   
}
export const logoutService=()=>{
    return httpService("/api/auth/logout","get")
}

export const getUserService =()=>{
    return httpService("/api/auth/user","get")
}