// import { getUserService } from "../../../services/auth"
import { RECIVE_ROLE_ERROR, RECIVE_ROLE_PERSON, SEND_ROLE_REQUEST } from "./roleActionType"




export const sendRolesRequest = ()=>{
    return {
        type: SEND_ROLE_REQUEST
    }
}

export const receiveRolesResponse = (data)=>{
    return {
        type: RECIVE_ROLE_PERSON,
        payload: data
    }
}

export const receiveRolesError = (error)=>{
    return {
        type: RECIVE_ROLE_ERROR,
        payload: error
    }
}


// export const getRolesActionRedux = ()=>{
//     return (dispatch, state)=>{
//         dispatch(sendRolesRequest())
//         getUserService().then(res=>{
//             dispatch(receiveRolesResponse(res.data.roles));
//         }).catch(error=>{
//             dispatch(receiveRolesError(error.message))
//         })
//     }
// }

