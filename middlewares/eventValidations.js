const { body } = require('express-validator');

const eventInsertValidation = () => {
    return [
        body('title').isString().withMessage('O título é obrigatório!'),
        // body('organizer').exists().withMessage('O campo "organizador" é obrigatório!'),
        // body('organizer.id').isString().withMessage('O id do organizador é obrigatório!'),
        // body('organizer.email').isString().withMessage('O e-mail do organizador é obrigatório!').isEmail().withMessage('Insira um e-mail de organizador válido!'),
        // body('organizer.name').isString().withMessage('O nome do organizador é obrigatório!'),
        body('attendees').exists().withMessage('O campo "participantes" é obrigatório!').isArray({ min: 1 }).withMessage('O campo "participantes" deve ser um array não vazio.'),
        body('attendees.*').isString().withMessage('O e-mail do participante é obrigatório!').isEmail().withMessage('Insira um e-mail de participante válido!'),
        body('start').notEmpty().withMessage('O inicio do evento é obrigatória!').isISO8601().withMessage('Formato de data inválido. Use YYYY-MM-DDTHH:mm:ssZ!')
                    .custom(value => {
                        const date = new Date(value);
                        if (isNaN(date.getTime())) {
                            throw new Error('Data inválida!');
                        }
                        return true;
                    }),
        body('end').notEmpty().withMessage('O fim do evento é obrigatória!').isISO8601().withMessage('Formato de data inválido. Use YYYY-MM-DDTHH:mm:ssZ!')
                    .custom(value => {
                        const date = new Date(value);
                        if (isNaN(date.getTime())) {
                            throw new Error('Data inválida!');
                        }
                        return true;
                    }),
        body('location').isString().withMessage('O local do evento é obrigatório!').isLength({ min: 5 }).withMessage('O local deve conter no mínimo 5 caracteres!'),
        body('description').optional()
    ];
}

module.exports = {
    eventInsertValidation,
};