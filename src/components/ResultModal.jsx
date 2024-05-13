import { forwardRef, useImperativeHandle, useState } from "react";
import { createPortal } from "react-dom";
const ResultModel = forwardRef(function ResultModel(
  { remainigTime, targetTime,onReset},
  ref
) {
  const userLost = remainigTime <= 0;
  const formattime = (remainigTime / 1000).toFixed(2);
  const score = Math.round((1-remainigTime / (targetTime*1000))*100);

  const dialog = useState();
  useImperativeHandle(ref, () => {
    return {
      opendialog() {
        dialog.current.showModal();
      },
    };
  });
  return createPortal(
    <dialog ref={dialog} className="result-modal" >
      {userLost && <h2>You Lost</h2>}
      {!userLost && <h2>Your Score : {score}</h2>}
      <p>
        The target time was <strong>{targetTime} seconds.</strong>
      </p>
      <p>
        You stopped the timer was <strong>{formattime} seconds left</strong>
      </p>
      <form method="dialog" onSubmit={onReset}>
        <button>Close</button>
      </form>
    </dialog>,
    document.getElementById('modal')
  );
});

export default ResultModel;
