const db = require('./db')

const RESPONSES = {
  success: {
    success: true,
    message: "Data saved successfully"
  },

  error: {
    success: false,
    message: "Please try again later"
  },

  notFound: {
    success: false,
    message: "404 Not Found"
  },

  deleted: {
    success: true,
    message: "Data removed successfully"
  }
}

module.exports = {
  getHealth,
  putStudentData,
  getStudentData,
  deleteStudentData,
  RESPONSES
}

async function getHealth(req, res, next) {
  res.json({ success: true })
}

function decodeParameters(req) {
  const studentId = req.params.studentId.replace(/[\\/:*?"<>|]/g, '_')
  const prop = req.params[0] ? req.params[0].replace(/\//g, '.') : ''
  const value = req.body
  return { studentId, prop, value }
}

function putStudentData(req, res) {
  const { studentId, prop, value } = decodeParameters(req)
  db.putStudent(studentId, prop, value)
  res.json(RESPONSES.success)
}

function getStudentData(req, res) {
  const { studentId, prop, value } = decodeParameters(req)
  const data = db.getStudent(studentId, prop, value)
  data ? res.json(data) : res.status(404).json(RESPONSES.notFound)
}

function deleteStudentData(req, res) {
  const { studentId, prop, value } = decodeParameters(req)
  db.deleteStudent(studentId, prop, value)
    ? res.json(RESPONSES.deleted)
    : res.status(404).json(RESPONSES.notFound)
}