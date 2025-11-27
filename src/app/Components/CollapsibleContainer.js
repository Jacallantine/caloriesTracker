"use client"
import { useState, useEffect } from "react"
import GreenButton from "./Buttons/Green";

export default function CollapsibleContainer({xCss, children, title, toggle, wrapperCss, subCss, showButton, greenButtonCss}){
    
const [isOpen, setIsOpen] = useState(toggle)
 useEffect(() => {
    setIsOpen(toggle);
  }, [toggle]);
return (
    
        
    <div className= {`w-full flex flex-col items-center ${wrapperCss}`}>
        {

            showButton ? (
        <GreenButton 
            initLabel="Add Map?" 
            initFunc={() => setIsOpen(!isOpen)} 
            initCss={`${isOpen ? "hidden" : "block"} ${greenButtonCss} `} 
        />
            ) : (
                ""
            )
        }
    <div className={` ${subCss} w-full items-center ${isOpen === false ? "hidden [height:0px;]" : "flex flex-col [height:fit-content;]"}`}>
       
       <h3>{title}</h3>

        {children}

    </div>
     </div>
)
}