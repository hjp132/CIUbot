



var d = new Date();
var weekday = new Array(7);
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

var currentDay = weekday[d.getDay()];

let grouping = "Rest";
if (currentDay == "Monday" || currentDay == "Thursday"){
    grouping = "Chest"
}
if (currentDay == "Tuesday"){
    grouping = "Legs"
}
if (currentDay == "Friday"){
    grouping = "Core"
}
if (currentDay =="Saturday"){
    grouping = "Recovery"
}

function daytest(e){
    console.log("test")
    $('.queue').append("<p>" + grouping + "</p>")
}

