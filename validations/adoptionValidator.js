const { check, validationResult } = require("express-validator");

const generateAdoptionValidators = () => [
  check("user_id")
    .notEmpty()
    .isNumeric()
    .withMessage("Invalid id"),
  check("pet_id")
    .notEmpty()
    .isNumeric()
    .withMessage("Invalid id"),
  check("date")
    .notEmpty()
    .isDate()
    .withMessage("Invalid date")
];

const generateIdValidator = () => [
  check("id")
    .notEmpty()
    .isNumeric()
    .withMessage("Invalid id")
];

const generateUpdateValidator = () => [
  check("id")
    .isNumeric()
    .withMessage("Invalid id"),
  check("user_id")
    .isNumeric()
    .withMessage("Invalid id"),
  check("pet_id")
    .isNumeric()
    .withMessage("Invalid id"),
  check("date")
    .isDate()
    .withMessage("Invalid date")
];

const reporter = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({
      succes: false,
      code: 404,
      message: errors,
      data: []
    });
  }
  next();
};

module.exports = {
  add: [generateAdoptionValidators(), reporter],
  id: [generateIdValidator(), reporter],
  update: [generateUpdateValidator(), reporter]
};
