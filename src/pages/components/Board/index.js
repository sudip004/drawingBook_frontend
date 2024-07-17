import { useEffect, useLayoutEffect, useRef } from "react"
import styles from "./index.module.css"
import { useDispatch,useSelector } from "react-redux"
import { MENU_ITEMS } from "@/constants"
import { actionItemClick } from "@/slice/menuSlice";
import { socket } from "@/socket";

const Board = () => {
  const dispatch = useDispatch();
    const canvasref = useRef(null)
    let shouldDraw = useRef(false)
    const drawHistory = useRef([])
    const historyPointer = useRef(0)

    const {activeMenuItem,actionMenuItem} = useSelector((state) => state.menu);
    const {color,size} = useSelector((state) => state.toolbox[activeMenuItem]);

    const reSetActionMenuItem = () => {
      dispatch(actionItemClick(null));
    }

  useEffect(()=>{
    if(!canvasref.current) return;
      const canvas = canvasref.current;
      const context = canvas.getContext("2d");

      if(actionMenuItem === MENU_ITEMS.DOWNLOAD){
        const URL = canvas.toDataURL();
        const anchor = document.createElement("a");
        anchor.href = URL;
        anchor.download = "drawing.jpg";
        anchor.click();
      } else  if (actionMenuItem === MENU_ITEMS.UNDO || actionMenuItem === MENU_ITEMS.REDO) {
        if(historyPointer.current > 0 && actionMenuItem === MENU_ITEMS.UNDO) historyPointer.current -= 1
        if(historyPointer.current < drawHistory.current.length - 1 && actionMenuItem === MENU_ITEMS.REDO) historyPointer.current += 1
        const imageData = drawHistory.current[historyPointer.current]
        context.putImageData(imageData, 0, 0)
      }
      reSetActionMenuItem();
  },[actionMenuItem])

    useEffect(()=> {
      if(!canvasref.current) return;
      const canvas = canvasref.current;
      const context = canvas.getContext("2d");
      // context.lineCap = 'round';

      const changeConfig = (color,size) => {
        context.strokeStyle = color;
        context.lineWidth = size;
      }
        const handelchangeConfig = (config)=>{
            changeConfig(config.color,config.size);
        }
      changeConfig(color,size);
      socket.on('changeConfig',handelchangeConfig)
    },[color,size])

    useLayoutEffect(()=>{
        if(!canvasref.current) return;
        const canvas = canvasref.current;
        const context = canvas.getContext("2d");
        // context.lineCap = 'round';

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const beingPath=(x,y) => {
          context.beginPath();
            context.moveTo(x,y);
        }
        const drawLine=(x,y) => {
            context.lineTo(x,y);
            context.stroke();
        }
        
      const handelMouseDown = (e)=> {
        shouldDraw.current = true;
        beingPath(e.offsetX,e.offsetY);
        socket.emit('beginPath',{x:e.offsetX,y:e.offsetY})
      }
      const handelMouseMove = (e)=> {
        if(!shouldDraw.current) return;
        drawLine(e.offsetX, e.offsetY);
        socket.emit('drawLine',{x:e.offsetX,y:e.offsetY})
        
      }
      const handelMouseUp = (e)=> {
        shouldDraw.current = false;
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height)
        drawHistory.current.push(imageData)
        historyPointer.current = drawHistory.current.length - 1
      }


      canvas.addEventListener("mousedown", handelMouseDown);
      canvas.addEventListener("mousemove", handelMouseMove);
      canvas.addEventListener("mouseup", handelMouseUp);
     
      socket.on('beginPath', (arg) => {
        beingPath(arg.x,arg.y);
      })
      socket.on('drawLine', (arg) => {
        drawLine(arg.x,arg.y);
      })

      return ()=> {
        canvas.removeEventListener("mousedown", handelMouseDown);
        canvas.removeEventListener("mousemove", handelMouseMove);
        canvas.removeEventListener("mouseup", handelMouseUp);

        socket.off('beginPath');
        socket.off('drawLine');
      }
    },[])

   
  return (
    <canvas ref={canvasref}></canvas>
   
  )
}

export default Board