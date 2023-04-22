// Your code here
function createEmployeeRecord(employee) {
    const employeeRecord = {
        firstName: employee[0],
        familyName: employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employeeRecord
}

function createEmployeeRecords(employees) {
    const employeeRecords = []
    for (let employee of employees) {
        employeeRecords.push(createEmployeeRecord(employee))
    } 
    return employeeRecords
}

function createTimeInEvent(employeeRecord, dateStamp) {
    const timeIn = {
        type: 'TimeIn',
        hour: parseInt(dateStamp.slice(11)),
        date: dateStamp.slice(0, 10)
    }
    employeeRecord.timeInEvents.push(timeIn)
    return employeeRecord
}

function createTimeOutEvent(employeeRecord, dateStamp) {
    const timeOut = {
        type: 'TimeOut',
        hour: parseInt(dateStamp.slice(11)),
        date: dateStamp.slice(0, 10)
    }
    employeeRecord.timeOutEvents.push(timeOut)
    return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, date) {
    let i = 0
    for (const event of employeeRecord.timeInEvents) {
        if (event.date === date) {
            const hourWorked = employeeRecord.timeOutEvents[i].hour - event.hour
            return hourWorked/100 | 0
        }
        i += 1 
    }
}

function wagesEarnedOnDate(employeeRecord, date) {
    return hoursWorkedOnDate(employeeRecord, date) * employeeRecord.payPerHour
}

function allWagesFor(employeeRecord) {
    let allWages = 0
    for (let event of employeeRecord.timeInEvents) {
        allWages += wagesEarnedOnDate(employeeRecord, event.date)
    }
    return allWages
}

function calculatePayroll(employeeRecords) {
    let payroll = 0
    for (let employeeRecord of employeeRecords) {
        payroll += allWagesFor(employeeRecord)
    }
    return payroll
}