import React from "react";
import './finished.css'

function Finished({ name, id, deleteFinished, returnToPlan }) {
  return (
    <div>
      <div className="box">
        <h3 className="name">Task: {name}</h3>
        <div className="btns">
        <button onClick={() => returnToPlan(id)}>
          Return
        </button>
        <button onClick={() => deleteFinished(id)}>
          Delete
        </button>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Finished);
