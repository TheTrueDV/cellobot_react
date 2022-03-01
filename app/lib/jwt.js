const jwt = require("jsonwebtoken")
const config = require("../config").default
const SECRET = Buffer.from(config.JWT_SECRET, "base64")

function sign({ twitchId }) {
  return new Promise((resolve, reject) => {
    jwt.sign({ twitchId }, SECRET, { expiresIn: "1h" }, (err, token) => {
      if (err) return reject(err)
      return resolve(token)
    })
  })
}

function verify(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, SECRET, (err, decoded) => {
      if (err) return reject(err)
      return resolve(decoded)
    })
  })
}

module.exports = {
  sign,
  verify,
}
