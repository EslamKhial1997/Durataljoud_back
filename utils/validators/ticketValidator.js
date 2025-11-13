const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.addTicketValidator = [
  check("firstName")
    .notEmpty()
    .withMessage("⚠️ الاسم الأول مطلوب")
    .isLength({ min: 2 })
    .withMessage("⚠️ الاسم الأول يجب أن يحتوي على حرفين على الأقل")
    .trim(),

  check("lastName")
    .notEmpty()
    .withMessage("⚠️ اسم العائلة مطلوب")
    .isLength({ min: 2 })
    .withMessage("⚠️ اسم العائلة يجب أن يحتوي على حرفين على الأقل")
    .trim(),
  check("email")
    .trim()
    .isEmail().withMessage("⚠️ البريد الإلكتروني غير صالح")
    .normalizeEmail(),

  check("phone")
    .notEmpty()
    .withMessage("⚠️ رقم الجوال مطلوب")
    .matches(/^(05\d{8}|\+9665\d{8})$/)
    .withMessage("⚠️ رقم الجوال غير صحيح"),

  check("region").notEmpty().withMessage("⚠️ المنطقة مطلوبة").trim(),

  check("heardAboutUs")
    .optional()
    .isString()
    .withMessage("⚠️ الحقل يجب أن يكون نص (string)")
    .isLength({ min: 2 })
    .withMessage("⚠️ يجب أن يحتوي على حرفين على الأقل")
    .trim(),

  validatorMiddleware,
];
