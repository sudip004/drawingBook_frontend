import styles from "./index.module.css"
import cx from "classnames";
import { FaPen } from "react-icons/fa6";
import { BsEraserFill } from "react-icons/bs";
import { FaUndo } from "react-icons/fa";
import { FaRedo } from "react-icons/fa";
import { FaFileDownload } from "react-icons/fa";
import { useDispatch,useSelector } from "react-redux";
import { menuItemClick,actionItemClick } from "@/slice/menuSlice";
const {MENU_ITEMS} = require('@/constants')

const Menu = () => {

    const dispatch = useDispatch();

    const activeMenuItem = useSelector((state) => state.menu.activeMenuItem);

    const handelMenuClick = (itemName)=> {
        dispatch(menuItemClick(itemName));
    }

    const handelActionItem = (itemName) => {
        dispatch(actionItemClick(itemName));
    }
  return (
    <div className={styles.menuWrapper}>
        <div className={cx(styles.iconWrapper, {[styles.active]:activeMenuItem === MENU_ITEMS.PENCIL})}onClick={()=>handelMenuClick(MENU_ITEMS.PENCIL)}>
            <FaPen className={styles.icon} />
        </div>
        <div className={cx(styles.iconWrapper, {[styles.active]:activeMenuItem === MENU_ITEMS.ERASER})} onClick={()=>handelMenuClick(MENU_ITEMS.ERASER)}>
            <BsEraserFill className={styles.icon} />
        </div>
        <div className={styles.iconWrapper} onClick={()=> handelActionItem(MENU_ITEMS.UNDO)}>
            <FaUndo className={styles.icon}/>
        </div>
        <div className={styles.iconWrapper} onClick={()=> handelActionItem(MENU_ITEMS.REDO)}>
            <FaRedo className={styles.icon}/>
        </div>
        <div className={styles.iconWrapper} onClick={()=> handelActionItem(MENU_ITEMS.DOWNLOAD)}>
            <FaFileDownload className={styles.icon}/>
        </div>
    </div>
  )
}

export default Menu;