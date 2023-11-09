const bcrypt = require('bcryptjs')

const User = require('../models/user')

exports.postLogin = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await User.findOne({ email })
    if (!user) {
      throw new Error('Email or password incorrect')
    } else {
      const isPassword = await bcrypt.compare(password, user.password)
      if (!isPassword) {
        throw new Error('Email or password incorrect')
      } else {
        res.json({ status: 'success', idUser: user._id })
      }
    }
  } catch (err) {
    return res.status(500).json({ status: 'false', message: err.message })
  }
}


exports.postSignup = async (req, res, next) => {
  try {
    const email = req.body.email
    // const password = req.body.password
    const name = req.body.name
    if (!email || !req.body.password || !name) {
      return res.status(500).json({ status: 'false', message: 'Please enter all fields' })
    }
    const users = await User.find({})
    const isExist = users.find(user => user.email === email)
    if (isExist) {
      return res.json({ status: 'false', message: 'Please enter another email' })
    }
    const password = await bcrypt.hash(req.body.password, 12)
    const user = new User({
      email,
      password,
      name
    })
    // let error = user.validateSync()
    // console.log(error)
    await user.save()
    return res.json({ status: 'succes' })
  } catch (err) {
    return res.status(500).json({ status: 'false', message: err.message })
  }
}

exports.postLogout = (req, res, next) => {
  req.session.destroy()
}
