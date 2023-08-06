import React from "react";
import("./OtherTooltip.css")
export default function OtherTooltip({msg,top=170}){
    return(
        <div className={"other-tooltip-container"} style={{top: `${top}px`}}>
                <p>{msg}</p>
        </div>
    )
}