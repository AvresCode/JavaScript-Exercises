"use strict";
/*------------------------------------------------------------------------------
Full description at: https://github.com/HackYourFuture/Homework/tree/main/2-Browsers/Week1#exercise-4-whats-the-time
1. Inside the `index.js`, complete the `addCurrentTime` to add the current time 
  to the webpage. Make sure it's written in the HH:MM:SS notation (hour, minute,
  second). Use `setInterval()` to make sure the time stays current.
2. Have the function execute when it's loading in the browser.
------------------------------------------------------------------------------*/
function addCurrentTime() {
  setInterval(() => {
    const today = new Date();
    const timeEl = document.querySelector("#time");
    timeEl.textContent = today.toTimeString().split(" ")[0];

    timeEl.style.fontFamily = 'Times New Roman", Times, serif';
    timeEl.style.fontSize = "50px";
    timeEl.style.textAlign = "center";

    console.log(timeEl.textContent);
    return timeEl;
  }, 1000);
}

window.addEventListener("load", addCurrentTime);

//unanswered version:
/* 'use strict';
/*------------------------------------------------------------------------------
Full description at: https://github.com/HackYourFuture/Homework/tree/main/2-Browsers/Week1#exercise-4-whats-the-time
1. Inside the `index.js`, complete the `addCurrentTime` to add the current time 
  to the webpage. Make sure it's written in the HH:MM:SS notation (hour, minute,
  second). Use `setInterval()` to make sure the time stays current.
2. Have the function execute when it's loading in the browser.
------------------------------------------------------------------------------
function addCurrentTime() {
  // TODO complete this function
}

// TODO execute `addCurrentTime` when the browser has completed loading the page 
 */
