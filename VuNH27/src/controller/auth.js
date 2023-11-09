const User = require("../model/User");
var jwt = require("jsonwebtoken");
const decode = require('jwt-decode');
const nodemailer = require('nodemailer');
var bcrypt = require("bcryptjs");
const generateToken = require("../config/generateToken");
const { sendMail } = require("../service/sendMail");
const config = require("../config/auth.config");
var refreshTokens = [];
const validateUser = require("../validator/userValidator");

// ======================GET ALL ACCOUNT====================
async function getAllAccounts(req, res) {
  try {
    const { limit, offset, keySearch, sortBy, orderBy } = req.query;
    let _sortBy = orderBy === "ASC" ? 1 : -1;
    const query = {};
    let countUsers;
    let users;

    query.$or = [
      {
        username: { $regex: keySearch, $options: "i" },
      },
      {
        email: { $regex: keySearch, $options: "i" },
      },
      {
        address: { $regex: keySearch, $options: "i" },
      },
      {
        fullname: { $regex: keySearch, $options: "i" },
      },
    ];
    countUsers = await User.find().count();
    users = await User.find().skip(Number(offset)).limit(Number(limit));
    if (keySearch) {
      users = await User.find(query);
      countUsers = users.length;
      users = await User.find(query).skip(Number(offset)).limit(Number(limit));
    }

    if (sortBy && orderBy) {
      users = await User.find()
        .skip(Number(offset))
        .sort({ [`${sortBy}`]: orderBy })
        .limit(Number(limit));
    }
    if (sortBy && keySearch) {
      users = await User.find(query)
        .skip(Number(offset))
        .sort({ [`${sortBy}`]: _sortBy })
        .limit(Number(limit));
    }

    res.status(200).json({ users, counts: countUsers });
  } catch {
    res.status(500).json("Internal server error");
  }
}

// ======================GET ACCOUNT BY ID====================
async function getUserById(req, res, next) {
  try {
    User.findOne({ id: req.params.id }, async (err, user) => {
      if (!user) {
        return res.status(404).send({ message: "Not found" });
      }
      const userById = await user;
      res.status(200).json(userById);
    });
  } catch {
    res.status(500).json("Internal server error");
  }
}

// ======================REFRESH TOKEN====================
async function reNewToken(req, res) {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(401).json({ message: "You are not authenticated" });
    }
    if (!refreshTokens.includes(refreshToken)) {
      return res.status(403).json({ message: "Refresher token is not valid" });
    }
    jwt.verify(refreshToken, config.refreshTokenSecret, (err, user) => {
      refreshTokens = refreshTokens.filter((token) => token != refreshToken);
      if (user) {
        const token = generateToken.generateTokenAccess(user.id);
        const tokenRefresh = generateToken.generateTokehRefresh(user.id);

        refreshTokens.push(tokenRefresh);
        return res.status(200).json({
          token: token,
          tokenRefresh: tokenRefresh,
          username: user.username,
          role: user.role
        });
      }
    });
  } catch {
    res.status(500).json("Internal server error");
  }
}

// ======================ADD ACCOUNT====================
async function addAccount(req, res) {
  try {
    const { username, password, email, address } = req.body;
    const user = User.findOne({ username: username });
    const valid = validateUser(req.body);
    if (!valid) {
      res.status(400).send({ message: "Error form schema validation" });
      return;
    }
    user.then(async (data) => {
      if (data?.username == username && data?.username) {
        return res.status(409).json({ message: "Name duplicate" });
      }
      const user = new User({
        id: new Date().getTime().toString(),
        username: username,
        password: await bcrypt.hash(password, 10),
        role: "admin",
        email: email,
        fullname: "Bro" + username,
        address: address,
      });
      const newUser = await user.save();
      const mailOptions = {
        to: email,
        subject: "Send a email when a new user is created.",
        html: `<h2>Wellcome ${user} ^^</h2>`,
      };
      await sendMail(mailOptions, user);
      res.status(200).json(newUser);
    });
  } catch {
    res.status(500).json("Internal server error");
  }
}
// ======================LOGIN====================
async function login(req, res) {
  try {
    const { username, password } = req.body;
    User.findOne({
      username: username,
    }).exec(async (err, user) => {
      // if (err) {
      //   res.status(500).send({ message: err });
      //   return;
      // }
      if (!user) {
        return res.status(400).json({ message: "User Not found." });
      }
      console.log('TO DEBUG--------------------------------------------user.password', user.password);
      const passwordIsValid = await bcrypt.compare(password, user.password);
      if (!passwordIsValid) {
        return res.status(400).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }
      req.session.User = {
        username: user.username,
        role: user.role,
      }
      const token = generateToken.generateTokenAccess(
        user.id,
        user.role,
        user.username
      );
      const tokenRefresh = generateToken.generateTokehRefresh(
        user.id,
        user.role,
        user.username
      );
      refreshTokens.push(tokenRefresh);

      res.status(200).send({
        token: token,
        tokenRefresh: tokenRefresh,
        username: username,
        id: user.id,
        role: user.role,
      });
    });
  } catch {
    res.status(500).json("Internal server error");
  }
}

// ======================EDIT ACCOUNT====================
async function editAccount(req, res) {
  try {

    const { username, password, fullname, address, email } = req.body;
    const { id } = req.params;
    const getUser = await User.findOne({ id: id });
    const valid = validateUser(req.body);
    if (!valid) {
      return res.status(400).json({ message: "Error form schema validation" });
    }
    if (getUser.role === 'admin' || getUser.id === id) {
      const getUserByUsername = await User.findOne({ username: username });
      if (
        getUserByUsername?.username === username &&
        getUserByUsername.id !== id
      ) {
        return res.status(409).json({ message: "Name duplicate" });
      }

      if (getUser.id !== id) {
        return res.status(404).json({ message: "Not Found" });
      }
      await User.updateOne(
        { id: id },
        {
          $set: {
            username: username,
            password: await bcrypt.hash(password, 10),
            email: email,
            fullname: fullname,
            address: address,
            role: getUser.role,
          },
        }
      );
      return res.status(200).json({ message: "Success" });
    }

  } catch {
    res.status(500).json("Internal server error");
  }
}
async function deleteAccount(req, res) {
  try {
    const { id } = req.params;
    const getUser = await User.findOne({ id: id });
    await User.find({ id: id }).remove().exec();
    res.status(200).json({ message: "Success to delete user" });
  } catch {
    res.status(500).json("Internal server error");
  }
}
async function sendEmail(req, res) {
  try {
    const { message } = req.body;
    console.log('???', req.session);
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: req.session.User.username
      }
    });
    const mailOptions = {
      from: `${req.session.User.username}@gmail.com`,
      to: 'ankvuzvl@gmail.com',
      subject: 'Sending Email using Node.js',
      text: message
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
        return res.status(200).json({ message: info.response });
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).json("Internal server error");
  }
}
async function changePassword(req, res) {
  try {

    const { newPassword, confirmPassword, password } = req.body;
    const { id } = req.params;
    const getUser = await User.findOne({ id: id });
    if (!newPassword) {
      return res.json({ message: 'Please provide a newPassword that you want to change' })
    }
    const passwordIsValid = await bcrypt.compare(password, getUser.password);
    if (!passwordIsValid) {
      return res.status(400).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }
    if (passwordIsValid) {
      if (confirmPassword === newPassword) {
        await User.updateOne(
          { id: id },
          {
            $set: {
              password: await bcrypt.hash(newPassword, 10)
            },
          }
        );
        return res.json({ message: 'Changed password successfully!' })
      } else {
        return res.json({ message: 'Confirm password failed, please try a again!' })
      }
    }
  } catch {
    res.status(500).json("Internal server error");
  }
}
async function resetPassword(req, res) {
  try {

    const { username } = req.body;
    const getUser = await User.findOne({ username: username });
    const newPassword = (Math.random() + 1).toString(36).substring(7);
    await User.updateOne(
      { username: username },
      {
        $set: {
          password: await bcrypt.hash(newPassword, 10),
        },
      }
    );
    const mailOptions = {
      to: getUser.email,
      subject: "This is the request to reset your password.",
      html: `Here is the newPassword <h2>${newPassword}</h2>. Please let change your password and don't share the code with anyone. Thanks.`,
    };
    await sendMail(mailOptions, getUser);
    return res.status(200).json({ message: 'Reset your password successfully, please have a look on your email that you registered!' })

  } catch (e) {
    console.log('TO DEBUG--------------------------------------------e.message', e.message);
    res.status(500).json("Internal server error");
  }
}
// ======================EXPORT====================
const handler = {
  addAccount: addAccount,
  getAllAccounts: getAllAccounts,
  getUserById: getUserById,
  reNewToken: reNewToken,
  login: login,
  editAccount: editAccount,
  deleteAccount: deleteAccount,
  sendEmail: sendEmail,
  changePassword: changePassword,
  resetPassword: resetPassword
};
module.exports = handler;
