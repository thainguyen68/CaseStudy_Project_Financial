import React from "react";

import ("./PasswordTooltip.css")
export default function PasswordTooltip({stat,prop}){
    stat(true)
    function check(strict) {
        if (strict === undefined) {
            return "fas fa-circle"
        } else if (strict) {
            return "fas fa-check";
        } else {
            stat(false)
            return "fas fa-exclamation-triangle"
        }
    }
    return (
        <div className={"pw-tooltip-container"}>
                <ul>
                    <p>Password requirements:</p>
                    <li><i className={check(prop.length)} ></i> At least 8 characters</li>
                    <li><i className={check(prop.number)} ></i> At least least one digit(0-9)</li>
                    <li><i className={check(prop.upperCase)}></i> At least one uppercase English letter</li>
                    <li><i className={check(prop.lowerCase)} ></i> At least one lowercase English letter</li>
                    <li><i className={check(prop.symbol)} ></i> At least one special character(#,?,!,@,$,%,^,&,*,-)</li>
                </ul>
        </div>
    )
}
