import { configureStore } from "@reduxjs/toolkit"
import rolesReducer from './roles/roleReducer'
import userReduce from './user/userReducer'
const store= configureStore({
    reducer:{
        userReduce,
        rolesReducer
        
    },
})
export default store