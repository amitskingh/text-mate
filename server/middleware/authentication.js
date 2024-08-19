const { UnauthenticatedError } = require("../errors")

const jwt = require("jsonwebtoken")

const auth = async (req, res, next) => {
  const token = req.cookies.token

  if (!token) {
    console.log("No token")
    throw new UnauthenticatedError("Access denied, please login")
  }

  console.log(token)
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    req.user = { userId: payload.userId, name: payload.name }
    next()
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid")
  }
}

module.exports = auth
