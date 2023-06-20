import { configureStore } from "@reduxjs/toolkit"
import rolesReducer from './roles/roleReducer'
const store= configureStore({
    reducer:{
        rolesReducer
    },
})
export default store