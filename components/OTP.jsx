import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const OtpInput = ({ otpLength,val,setVal }) => {
  let lengthArr = [];
  for (let i = 0; i < otpLength; i++) {
    lengthArr.push(i);
  }

  const handleKeyUp = (ind,e) => {
    let key = e.key
    if(!isNaN(key) && key !== ' '){
        let newVal = [...val]
        newVal[ind]=key
        setVal(newVal)
        let indexOfnext = ind + 1;
        let next = document.getElementById("input-" + indexOfnext);
        if (next) {
            next.focus();
          }
    }


    if(key == 'Backspace'){
        let newVal = [...val]
        newVal[ind] = ""
        setVal(newVal)
        let indexOfprev = ind - 1;
        let prev = document.getElementById("input-" + indexOfprev);
        if (prev) {
            prev.focus();
          }
    }
    if(key == 'ArrowLeft' || key == 'ArrowRight'){
        let index = key == 'ArrowLeft'? ind - 1 : ind+1;
        let prev = document.getElementById("input-" + index);
        if (prev) {
            prev.focus();
          }
    }
  }

  if (lengthArr.length) {
    return lengthArr.map((value, ind) => {
      return (
        <input
          id={"input-" + ind}
          key={"input-" + ind}
          type="tel"
          tabIndex={ind}
          value={val[ind] || ""}
          min={0}
          max={9}
          maxLength={1}
          onChange={(e) => {}}
          onKeyUp = {(e) => {handleKeyUp(ind,e)}}
          className="flex-col font-semibold text-secondary bg-transparent !ring-transparent focus:!ring-transparent outline-none items-center !border-transparent justify-center text-center w-12 h-12 mx-2 !border-b !border-b-primary focus:!border-b-2"
        />
      );
    });
  }
};

export default OtpInput;
