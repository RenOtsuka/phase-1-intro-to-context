// Your code here

function createEmployeeRecord(arrayEmployeeInfo){
    let employeeRecord = {
        firstName: arrayEmployeeInfo[0],
        familyName: arrayEmployeeInfo[1],
        title: arrayEmployeeInfo[2],
        payPerHour: arrayEmployeeInfo[3],
        timeInEvents: [],
        timeOutEvents: [],
    }

    return employeeRecord;
}


function createEmployeeRecords(arrayOfEmployees){
    let employeeRecords = [];

    for(let record of arrayOfEmployees){
        employeeRecords.push(createEmployeeRecord(record));
    }

    return employeeRecords;
}


function createTimeInEvent(employeeRecord, dateStamp){
    let hourNum = parseInt(dateStamp.slice(11));
    let dateStr = dateStamp.slice(0,10);

    let timeInObj = {
        type: "TimeIn",
        hour: hourNum,
        date: dateStr,
    }

    employeeRecord.timeInEvents.push(timeInObj);

    return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateStamp){

    let hourNum = parseInt(dateStamp.slice(11));
    let dateStr = dateStamp.slice(0,10);

    let timeOutObj = {
        type: "TimeOut",
        hour: hourNum,
        date: dateStr,
    }

    employeeRecord.timeOutEvents.push(timeOutObj);

    return employeeRecord;
    
}

function hoursWorkedOnDate(employeeRecord, dateStamp){
    
    let timePunchedIn = 0;
    let timePunchedOut = 0;
    let datePunchedIn = '';
    let datePunchedOut = '';

    for(let obj of employeeRecord.timeInEvents){
        if(obj.date === dateStamp){
            datePunchedIn = obj.date;
            timePunchedIn = obj.hour;
            //console.log(datePunchedIn);
            //console.log(timePunchedIn);
        }
    }

    for(let obj of employeeRecord.timeOutEvents){
        if(obj.date === dateStamp){
            datePunchedOut = obj.date;
            timePunchedOut = obj.hour;
            //console.log(timePunchedOut);
            //console.log(datePunchedOut);
        }
    }

    return (timePunchedOut - timePunchedIn) / 100;
}


function wagesEarnedOnDate(employeeRecord, dateStamp){

    let hoursWorked = hoursWorkedOnDate(employeeRecord, dateStamp);
    let payOwed = hoursWorked * employeeRecord.payPerHour;

    return payOwed;

}

function allWagesFor(employeeRecord){

    let wageOnDate, totalWage = 0;


    for(let obj of employeeRecord.timeInEvents){

        wageOnDate = wagesEarnedOnDate(employeeRecord, obj.date);
        //console.log(wageOnDate);
        totalWage += wageOnDate;
    }

    //console.log(totalWage);

    return totalWage;
}


function calculatePayroll(arrayOfEmployees){

    let wageOfEmployees = 0;

    for(let employee of arrayOfEmployees){
        wageOfEmployees += allWagesFor(employee);
    }
    
    //console.log(wageOfEmployees);

    return wageOfEmployees;
}
