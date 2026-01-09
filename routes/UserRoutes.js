const express = require('express')
const router = express.Router()

// Controller
const { register, login, getCurrentUser, update } = require('../controllers/UseController');

// Middlewares
const validate = require('../middlewares/handleValidation');
const { userCreateValidation, loginValidation, userUpdateValidation } = require('../middlewares/userValidations');
const authGuard = require('../middlewares/authGuard');

// Routes
/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Registrar um novo usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - confirmpassword
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome do usuário
 *               email:
 *                 type: string
 *                 format: email
 *                 description: E-mail do usuário
 *               password:
 *                 type: string
 *                 minLength: 5
 *                 description: Senha do usuário
 *               confirmpassword:
 *                 type: string
 *                 description: Confirmação da senha
 *     responses:
 *       201:
 *         description: Usuário registrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 token:
 *                   type: string
 *       422:
 *         description: Erro de validação ou usuário já existe
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 */
router.post('/register', userCreateValidation(), validate, register);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Fazer login do usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: E-mail do usuário
 *               password:
 *                 type: string
 *                 description: Senha do usuário
 *     responses:
 *       201:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 token:
 *                   type: string
 *       404:
 *         description: Usuário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *       422:
 *         description: Senha inválida
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 */
router.post('/login', loginValidation(), validate, login);

/**
 * @swagger
 * /api/users/user:
 *   get:
 *     summary: Obter o usuário atual logado
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dados do usuário atual
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *       401:
 *         description: Token inválido ou não fornecido
 */
router.get('/user', authGuard, getCurrentUser);

/**
 * @swagger
 * /api/users/user:
 *   put:
 *     summary: Atualizar dados do usuário atual
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Novo nome do usuário
 *               password:
 *                 type: string
 *                 minLength: 5
 *                 description: Nova senha do usuário
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *       401:
 *         description: Token inválido ou não fornecido
 *       422:
 *         description: Erro de validação
 */
router.put('/user', authGuard, userUpdateValidation(), validate, update);

module.exports = router;