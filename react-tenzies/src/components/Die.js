import React from "react";
function Die(props) {

    return (
        <div className="die-container" 
             onClick={(event) => props.checkIfSelectedNumber(props.id, event)}>
                 
            {props.value}

        </div>
    );
}

export default Die;
