import { MENU_ITEMS, COLORS } from '@/constants'
import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    [MENU_ITEMS.PENCIL]: {
        color: COLORS.BLACK,
        size: 3
    },
    [MENU_ITEMS.ERASER]: {
        color: COLORS.WHITE,
        size: 3
    },
    [MENU_ITEMS.UNDO]: {},
    [MENU_ITEMS.REDO]: {},
    [MENU_ITEMS.DOWNLOAD]: {},
}

export const toolBoxSlice = createSlice({
    name:"toolbox",
    initialState,
    reducers:{
        changeColor:(state, action) => {
            state[action.payload.item].color = action.payload.color
        },
        changeBrashSize:(state, action) => {
            state[action.payload.item].size = action.payload.size
        }
    }
})


export const {changeColor,changeBrashSize} = toolBoxSlice.actions

export default toolBoxSlice.reducer