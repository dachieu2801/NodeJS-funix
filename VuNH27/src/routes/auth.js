const express = require("express");
const router = express.Router();
const checkToken = require("./share/index");
const handler = require("../controller/auth");

// ADD
router.post("/", handler.addAccount);

// GET LIST
router.get("/", checkToken, handler.getAllAccounts);

//GET BY ID
router.get("/:id", checkToken, handler.getUserById);

//REFRESH TOKEN
router.post("/renew", checkToken, handler.reNewToken);

//REFRESH TOKEN
router.delete("/:id", checkToken, handler.deleteAccount);

//LOGIN
router.post("/login", handler.login);

//UPDATE
router.put("/:id", checkToken, handler.editAccount);

router.post("/sendEmail", checkToken, handler.sendEmail);

router.post("/changePassword/:id", handler.changePassword);

router.post("/resetPassword", handler.resetPassword);

module.exports = router;
