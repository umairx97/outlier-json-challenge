const tape = require('tape')
const jsonist = require('jsonist')
const { RESPONSES } = require('./api')
const db = require('./db');
const server = require('./server')

// The following line is producing ECONNREFUSED ERROR ON MY LAPTOP
// const port = (process.env.PORT = process.env.PORT || require('get-port-sync')())

// IM USING THE FOLLOWING SO THAT THE TEST'S CAN RUN
const port = (process.env.PORT = process.env.PORT || 1337)

const endpoint = `http://localhost:${port}`
const studentId = "umairx97";
const property = "persona/profession"
const testValue = { Developer: "MERN STACK" }
const compiledUrl = `${endpoint}/${studentId}/${property}`
const testDeleteUrl = `${endpoint}/${studentId}/persona`



tape('health', async function (t) {
  const url = `${endpoint}/health`
  jsonist.get(url, (err, body) => {
    if (err) t.error(err)
    t.ok(body.success, 'should have successful healthcheck')
    t.end()
  })
})

tape("PUT STUDENTID AND PROPERTY", response => {
  db.closeFile(studentId)
  jsonist.put(compiledUrl, testValue, (err, data) => {
    if (err) response.error(err)
    response.ok(data.success, "Test should return success true")
    response.end()
  })
})

tape("DELETE EXISTING PROPERTY", response => {
  db.closeFile(studentId)
  jsonist.put(compiledUrl, testValue, (err) => {
    if (err) response.error(err)
    jsonist.delete(compiledUrl, (err, data) => {
      if (err) response.error(err)
      response.ok(data.success, "Test should return success true")
      response.end()
    })
  })
})


tape("DELETE EXISTING STUDENTID AND FILE", response => {
  db.closeFile(studentId)
  jsonist.put(compiledUrl, testValue, (err) => {
    if (err) response.error(err)
    jsonist.delete(testDeleteUrl, (err, data) => {
      if (err) response.error(err)
      response.ok(data.success, "Test should return success true")
      response.end()
    })
  })
})

tape('GET EXISTING PROPERTY', response => {
  db.closeFile(studentId)
  jsonist.put(compiledUrl, testValue, (err, body) => {
    if (err) response.error(err)

    jsonist.get(compiledUrl, (err, body) => {
      if (err) response.error(err)
      response.equals(
        JSON.stringify(body),
        JSON.stringify(testValue),
        'Test should return a valid property'
      )
      response.end()
    })
  })
})


tape('cleanup', function (t) {
  server.close()
  t.end()
})
