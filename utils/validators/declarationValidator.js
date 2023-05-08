const { check} = require('express-validator');
const validatorMiddleware=require('../../middlewares/validatorMiddleware.js');
const declarationModel=require('../../models/Declaration.js')

exports.getdeclarationValidator=[
    check('id').isMongoId().withMessage('Invalid declaration id format'),
    validatorMiddleware,
];

exports.createdeclarationValidator=[
    check('Declaration').notEmpty().withMessage('Declaration required'),
    check('date').notEmpty().withMessage('date required').isDate().withMessage('Invalid Date format'),
   
    validatorMiddleware,
];

exports.updatedeclarationValidator=[
    check('id').isMongoId().withMessage('Invalid declaration id format'),
    validatorMiddleware,
];

exports.deletedeclarationValidator=[
    check('id').isMongoId().withMessage('Invalid declaration id format'),
    validatorMiddleware,
];
