const Ajv = require("ajv");
const userShema = require("../schema/User.json");

let ajv = new Ajv.default({ allErrors: true });
const validateUser = ajv.compile(userShema);

module.exports = validateUser ;
