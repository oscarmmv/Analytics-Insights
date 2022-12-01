import React, { useState, useEffect } from "react";

const Countdown = () => {
  const [isActive, setIsActive] = useState(false);
  const [countdown, setCountdown] = useState(1);
  const [isInactive, setInactive] = useState(false);
  const [inactiveTime, setInactiveTime] = useState(1);
    // mouse is moving
  function mouseMoveEventHandler() {
    setIsActive(true);
    setInactive(true);
    setInactiveTime(1);
  }

  // calls the event handler when mouse moves
  window.addEventListener('mousemove', mouseMoveEventHandler);
  useEffect(() => {
    let timeout;
    if (isActive) {
      timeout = setTimeout(() => {
        if(inactiveTime < 5) {
          setCountdown(countdown + 1);
        } 
        if (inactiveTime === 4) {
          setCountdown(countdown - 4);
          setInactiveTime(inactiveTime + 1);
        }
        if(isInactive) {
          setInactiveTime(inactiveTime + 1);
        }
        console.log(countdown)
        console.log('Inactive: ' + inactiveTime)
      }, 1000);
    }

    return () => clearTimeout(timeout);
  }, [isActive, countdown, isInactive,inactiveTime]);

  return <div>{countdown}</div>;
};

export default Countdown;




