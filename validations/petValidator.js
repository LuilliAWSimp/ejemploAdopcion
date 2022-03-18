const { check, validationResult } = require("express-validator");

const generatePetsValidators = () => [
  check("alias")
    .notEmpty()
    .isLength({ max: 150 })
    .withMessage("Invalid alias"),
  check("type")
    .notEmpty()
    .isIn("DOG", "CAT")
    .withMessage("Invalid type"),
  check("color")
    .notEmpty()
    .isLength({ max: 20 })
    .withMessage("Invalid color"),
  check("notes")
    .notEmpty()
    .isLength({ max: 250 })
    .withMessage("Invalid notes")
];

const generateIdValidator = () => [
  check("id")
    .notEmpty()
    .isNumeric()
    .withMessage("Invalid id")
];

const generateUpdateValidator = () => [
  check("id")
    .notEmpty()
    .isNumeric()
    .withMessage("Invalid id"),
  check("alias")
    .isLength({ max: 150 })
    .withMessage("Invalid alias"),
  check("type")
    .isIn("DOG", "CAT")
    .withMessage("Invalid type"),
  check("color")
    .isLength({ max: 20 })
    .withMessage("Invalid color"),
  check("notes")
  .optional()
  .isLength({ max: 250 })
  .withMessage("Invalid notes")
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
  add: [generatePetsValidators(), reporter],
  id: [generateIdValidator(), reporter],
  update: [generateUpdateValidator(), reporter]
};
