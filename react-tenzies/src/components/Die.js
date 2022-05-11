import React from "react";
function Die(props) {

    return (
        <div className="die-container" onClick={props.checkIfSelectedNumber}>
            {props.value}
        </div>
    );
}

export default Die;
