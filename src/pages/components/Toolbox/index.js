import styles from "./styles.module.css"
import cx from "classnames"
import {COLORS,MENU_ITEMS} from "../../../constants"
import { useSelector,useDispatch } from "react-redux"
import { changeColor,changeBrashSize } from "@/slice/toolboxSlice";
import { socket } from "@/socket";

const ToolBox = () => {

    const dispatch = useDispatch();

    const activeMenuItem = useSelector((state) => state.menu.activeMenuItem);
    const {color,size} = useSelector((state) => state.toolbox[activeMenuItem]);
    const showStrockToolOpton = activeMenuItem === MENU_ITEMS.PENCIL;
    const showBrashToolOpton = activeMenuItem === MENU_ITEMS.PENCIL || activeMenuItem === MENU_ITEMS.ERASER;

    const updateBrushSize = (e) => {
        dispatch(changeBrashSize({item:activeMenuItem, size:e.target.value}));
        socket.emit("changeConfig", {color,size:e.target.value});
    }
    const updateColor = (newColor) => {
        dispatch(changeColor({item:activeMenuItem, color:newColor}));
        socket.emit("changeConfig", {color:newColor,size});
    }

  return (
    <div className={styles.toolBoxContainer}>
        {showStrockToolOpton && <div className={styles.toolItems}>
            <h4 className={styles.toolText}>Strock Color</h4>
            <div className={styles.itemContainer}>
                <div className={cx(styles.colorBox,{[styles.active]: color === COLORS.BLACK})} style={{backgroundColor:COLORS.BLACK}} onClick={()=> updateColor(COLORS.BLACK)}/>
                <div className={cx(styles.colorBox,{[styles.active]: color === COLORS.RED})} style={{backgroundColor:COLORS.RED}} onClick={()=> updateColor(COLORS.RED)}/>
                <div className={cx(styles.colorBox,{[styles.active]: color === COLORS.GREEN})} style={{backgroundColor:COLORS.GREEN}} onClick={()=> updateColor(COLORS.GREEN)}/>
                <div className={cx(styles.colorBox,{[styles.active]: color === COLORS.BLUE})} style={{backgroundColor:COLORS.BLUE}} onClick={()=> updateColor(COLORS.BLUE)}/>
                <div className={cx(styles.colorBox,{[styles.active]: color === COLORS.ORANGE})} style={{backgroundColor:COLORS.ORANGE}} onClick={()=> updateColor(COLORS.ORANGE)}/>
                <div className={cx(styles.colorBox,{[styles.active]: color === COLORS.YELLOW})} style={{backgroundColor:COLORS.YELLOW}} onClick={()=> updateColor(COLORS.YELLOW)}/>
                <div className={cx(styles.colorBox,{[styles.active]: color === COLORS.WHITE})} style={{backgroundColor:COLORS.WHITE}} onClick={()=> updateColor(COLORS.WHITE)}/>
            </div>
        </div>}
        

        {showBrashToolOpton && <div className={styles.toolItems}>
            <h4 className={styles.toolText}>Brush Size</h4>
            <div className={styles.itemContainer}>
                <input type="range" min={1} max={10} step={1} onChange={updateBrushSize} value={size}/>
            </div>
        </div>}
    </div>
  )
}

export default ToolBox;