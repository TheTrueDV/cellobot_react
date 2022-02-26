import { verify } from "../lib/jwt"

async function decodeAuthHeader(req) {
  const authHeader = req.headers.authorization
  // console.log(req.headers.authorization)
  if (authHeader) {
    const token = authHeader.split(" ")[1]
    if (token) {
      try {
        console.log(`Token: ${token}`)
        const user = await verify(token)
        console.log(user)
        return user
      } catch (error) {
        console.error("Error Validating Token", token)
      }
    }
  }

  // next()
}

module.exports = {
  decodeAuthHeader,
}
