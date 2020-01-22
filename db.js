const fs = require("fs");
const path = require("path");
const _ = require('lodash')

const databasePath = path.join(__dirname, "data")


module.exports = {
    checkFileExistence,
    putStudent,
    getStudent,
    closeFile,
    deleteStudent
}


if (!fs.existsSync(databasePath)) {
    fs.mkdirSync(databasePath, { recursive: true })
}

function getDbPath(studentId) {
    return path.join(databasePath, studentId + ".json")
}

function checkFileExistence(studentId) {
    const filePath = getDbPath(studentId)
    return fs.existsSync(filePath)
}

function closeFile(studentId) {
    const filePath = getDbPath(studentId);
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath)
    }
}

function putStudent(studentId, prop, value) {
    const filePath = getDbPath(studentId)
    let data = fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath, { encoding: 'utf8' })) : {}
    data = _.set(data, prop, value)
    console.log(data)
    fs.writeFileSync(filePath, JSON.stringify(data), { encoding: 'utf8' })
}

function getStudent(studentId, property) {
    const filePath = getDbPath(studentId);
    if (!fs.existsSync(filePath)) return null
    const data = JSON.parse(fs.readFileSync(filePath, { encoding: "utf8" }))
    return property.length > 0 ? _.get(data, property) : data
}


function deleteStudent(studentId, property) {
    const filePath = getDbPath(studentId)
    if (!fs.existsSync(filePath)) return false

    const data = JSON.parse(fs.readFileSync(filePath, { encoding: 'utf8' }))
    const value = _.get(data, property)
    if (value === null || value === undefined) return false
    _.unset(data, property)

    const result = JSON.stringify(data)
    if (result === '{}') closeFile(studentId)
    else fs.writeFileSync(filePath, JSON.stringify(data), { encoding: 'utf8' })
    return true
}



