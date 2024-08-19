const { NotFoundError, UnauthenticatedError } = require("../errors")

const asyncWrapper = require("../middleware/async")
const User = require("../model/User")

const register = asyncWrapper(async (req, res) => {
  const user = await User.create({ ...req.body })

  const token = user.createJWT()

  res.cookie("token", token, { httpOnly: true, secure: true })

  res.status(201).json({ user: { name: user.name }, token })
})

const login = asyncWrapper(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  if (!user) {
    throw new NotFoundError(`No user with email ${email}`)
  }

  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Password do not matched")
  }

  const token = user.createJWT()

  res.cookie("token", token, { httpOnly: true, secure: true })

  res.status(200).json({ user: { name: user.name }, token })
})

const logout = (req, res) => {
  res.clearCookie("token")
  res.json({ message: "Logged out successfully" })
}

module.exports = {
  register,
  login,
  logout,
}
