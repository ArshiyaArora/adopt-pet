import { useEffect,useRef } from "react";
import { createPortal } from "react-dom";

const Modal= ({children})=>{
  ////// /// ///doubt -? each time new div will be created how it is saving space

    const elRef= useRef(null);
    if(!elRef.current){
        elRef.current=document.createElement("div");
    }
/////////
    useEffect(() => {
        const modalRoot = document.getElementById("modal");
        modalRoot.appendChild(elRef.current);
        return () => modalRoot.removeChild(elRef.current);
      }, []);
    
      return createPortal(<div>{children}</div>, elRef.current);
    };
    
export default Modal;