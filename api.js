module.exports = {
  getHealth
}

async function getHealth (req, res, next) {
  res.json({ success: true })
}
