const { body } = require('express-validator');

const userCreateValidation = () => {
    return [
        body('name').isString().withMessage('O nome é obrigatório!'),
        body('email').isString().withMessage('O e-mail é obrigatório!').isEmail().withMessage('Insira um e-mail válido!'),
        body('password').isString().withMessage('A senha é obrigatório!').isLength({ min: 5 }).withMessage('A senha precisa ter no mínimo 5 caracteres!'),
        body('confirmpassword').isString().withMessage('A confirmação de senha é obrigatório!')
            .custom((value, { req }) => {
                if (value != req.body.password) {
                    throw new Error('As senhas não são iguais!');
                }
                return true;
            }),
    ];
}

const loginValidation = () => {
    return [
        body('email').isString().withMessage('O e-mail é obrigatório!').isEmail().withMessage('Insira um e-mail válido!'),
        body('password').isString().withMessage('A senha é obrigatório!')
    ]
}

const userUpdateValidation = () => {
    return [
        body('name').optional(),
        body('password').optional().isLength({ min: 5 }).withMessage('A senha precisa ter no mínimo 5 caracteres!'),
    ]
}

module.exports = {
    userCreateValidation,
    loginValidation,
    userUpdateValidation,
};