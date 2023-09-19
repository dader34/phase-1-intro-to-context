const createEmployeeRecord = (employeeRecord) =>{
    const newEmloyeeCard = {
        "firstName" : employeeRecord[0],
        "familyName" : employeeRecord[1],
        "title": employeeRecord[2],
        "payPerHour" : employeeRecord[3],
        "timeInEvents" : [],
        "timeOutEvents" : []
    }
    return newEmloyeeCard
}

const createEmployeeRecords = (employeesArray) =>{
    const employeeRecordArray = []
    employeesArray.forEach(element => {
        employeeRecordArray.push(createEmployeeRecord(element))
    });
    return employeeRecordArray
}

const createTimeInEvent = (employeeRecord,date) =>{
    const hour = parseInt(date.split("-")[2].split(" ")[1])
    const newDate = date.split(" ")[0]
    employeeRecord['timeInEvents'].push({
        "type" : "TimeIn",
        "hour" : hour,
        "date" : newDate
    })
    return employeeRecord
}

const createTimeOutEvent = (employeeRecord,date) =>{
    const hour = parseInt(date.split("-")[2].split(" ")[1])
    const newDate = date.split(" ")[0]
    employeeRecord['timeOutEvents'].push({
        "type" : "TimeOut",
        "hour" : hour,
        "date" : newDate
    })
    return employeeRecord
}

const hoursWorkedOnDate = (employeeRecord,date) =>{
    let newDate
    if(date.indexOf(" ")){newDate = date.split(" ")[0]}
    else{newDate = date}
    
    const timeInEvents = employeeRecord['timeInEvents']
    const timeOutEvents = employeeRecord['timeOutEvents']
    for(let i = 0;i<timeInEvents.length;i++){
        if((timeInEvents[i]['date'] && timeOutEvents[i]['date']) == newDate){
            const timeInHour = parseInt(timeInEvents[i]['hour'].toString().replace(new RegExp("0","g"),""))
            const timeOutHour = parseInt(timeOutEvents[i]['hour'].toString().replace(new RegExp("0","g"),""))
            return (timeOutHour - timeInHour)
        }
    }
}

const wagesEarnedOnDate = (employeeRecord,date) =>{
    return hoursWorkedOnDate(employeeRecord,date) * employeeRecord['payPerHour']
}

const allWagesFor = (employeeRecord) =>{
    return employeeRecord['timeInEvents'].reduce((total,current)=>{
        return total += wagesEarnedOnDate(employeeRecord,current['date'])
    },0)
}

const calculatePayroll = (employeeArray) =>{
    return employeeArray.reduce((total,current)=>{
        return total += allWagesFor(current)
    },0)
}

