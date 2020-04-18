//Global variables
var workTime = 25, breakTime = 5;
var timeMinutes, timeSeconds;
var paused = false, stopped = true, work = true;
var countdownInterval;
var breakStart = new Audio("sounds/break.mp3");
var workStart = new Audio("sounds/work.mp3");

/**
 * 
 * @param {*} indicator 
 * Adjust amount of time spent working between breaks
 * Setting limit to at least 10 minutes, max 45
 * Can only ajudt of the timer is stopped
 */
function adjustWorkTime (indicator)
{
    if (stopped)
    {
        if (indicator == 0 && workTime > 10) workTime--;
        else if (indicator == 1 && workTime < 45) workTime++;
        document.getElementById("workNumber").innerHTML = workTime;
        document.getElementById("clock").innerHTML = workTime + ":00";
    }
}

/**
 * 
 * @param {*} indicator 
 * Adjust amount of time spent on breaks between work
 * Setting limit to at least 1 minute, max 15
 * Can only adjust if the timer is stopped
 */
function adjustBreakTime (indicator)
{
    if (stopped)
    {
        if (indicator == 0 && breakTime > 1) breakTime--;
        else if (indicator == 1 && breakTime < 15) breakTime++;
        document.getElementById("breakNumber").innerHTML = breakTime;
    }
}

/**
 * Called when the user clicks the start button
 */
function start ()
{
    if(!paused && !stopped) return;
    if(work) document.getElementById("headline").innerHTML = "Work";
    else document.getElementById("headline").innerHTML = "Break";
    stopped = false;
    paused = false;
    countdownInterval = setInterval(() =>
    {
        calculateCountdownTime();
    }, 1000);
}

/**
 * Called when the user clicks the stop button
 */
function stop ()
{
    clearInterval(countdownInterval);
    work = true;
    document.getElementById("headline").innerHTML = "Pomodoro";
    stopped = true;
    paused = false;
    document.getElementById("clock").innerHTML = workTime + ":00";
}

/**
 * Called when the user clicks the stop button
 */
function pause ()
{
    if (stopped) return;
    paused = true;
    clearInterval(countdownInterval);
}

function calculateCountdownTime ()
{
    var timeLeftArray = document.getElementById("clock").textContent.split(":");
    var minutesLeft = timeLeftArray[0] * 1000 * 60;
    var secondsLeft = timeLeftArray[1] * 1000;

    var timeSince = new Date().getTime();

    var countdownTo = timeSince + minutesLeft + secondsLeft - 1000;
    var distance = countdownTo - timeSince;

    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    if(seconds < 10) seconds = "0" + seconds;
    if(minutes < 10) minutes = "0" + minutes;
    console.log(minutes + ":" + seconds);

    if(distance < 1000)
    {
        if(work)
        {
            work = false;
            breakStart.play();
            if(breakTime < 10) breaktime = "0" + breakTime;
            document.getElementById("clock").innerHTML = breakTime + ":00";
            document.getElementById("headline").innerHTML = "Break";
        }
        else
        {
            work = true;
            workStart.play();
            if(workTime < 10) workTime = "0" + workTime;
            document.getElementById("clock").innerHTML = workTime + ":00";
            document.getElementById("headline").innerHTML = "Work";
        }
    }
    else document.getElementById("clock").innerHTML = minutes + ":" + seconds;

    
}