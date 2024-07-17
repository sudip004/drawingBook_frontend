import {configureStore} from "@reduxjs/toolkit"
import menuReducer from "@/slice/menuSlice"
import toolBoxReducer from "@/slice/toolboxSlice"


export const store = configureStore({
    reducer:{
        menu:menuReducer,
        toolbox:toolBoxReducer
    } // Add reducers here
})

