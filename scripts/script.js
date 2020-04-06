//Global variables
var workTime = 25, breakTime = 5;
var paused = false, stopped = true, work = true;

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