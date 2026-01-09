const express = require('express');
const router = express.Router();

// Controller
const { insertEvent, deleteEvent, listAllEvents, listUserEvents, listEventById, editEvent } = require('../controllers/EventController')

// Middlewares
const validate = require('../middlewares/handleValidation')
const { eventInsertValidation } = require('../middlewares/eventValidations');
const authGuard = require('../middlewares/authGuard');

// Routes
/**
 * @swagger
 * /api/events:
 *   post:
 *     summary: Criar um novo evento
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - attendees
 *               - start
 *               - end
 *               - location
 *             properties:
 *               title:
 *                 type: string
 *                 description: Título do evento
 *               attendees:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: email
 *                 minItems: 1
 *                 description: Lista de e-mails dos participantes
 *               start:
 *                 type: string
 *                 format: date-time
 *                 description: Data e hora de início (ISO 8601)
 *               end:
 *                 type: string
 *                 format: date-time
 *                 description: Data e hora de fim (ISO 8601)
 *               location:
 *                 type: string
 *                 minLength: 5
 *                 description: Local do evento
 *               description:
 *                 type: string
 *                 description: Descrição opcional do evento
 *     responses:
 *       201:
 *         description: Evento criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 organizer:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                 attendees:
 *                   type: array
 *                   items:
 *                     type: string
 *                 start:
 *                   type: string
 *                   format: date-time
 *                 end:
 *                   type: string
 *                   format: date-time
 *                 location:
 *                   type: string
 *                 description:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       422:
 *         description: Erro de validação ou datas inválidas
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
router.post('/', authGuard, eventInsertValidation(), validate, insertEvent);

/**
 * @swagger
 * /api/events/{id}:
 *   delete:
 *     summary: Deletar um evento por ID
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do evento
 *     responses:
 *       200:
 *         description: Evento deletado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 message:
 *                   type: string
 *       401:
 *         description: Sem permissão para deletar o evento
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *       404:
 *         description: Evento não encontrado
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
router.delete('/:id', authGuard, deleteEvent);

/**
 * @swagger
 * /api/events:
 *   get:
 *     summary: Listar todos os eventos
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de todos os eventos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   organizer:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       email:
 *                         type: string
 *                   attendees:
 *                     type: array
 *                     items:
 *                       type: string
 *                   start:
 *                     type: string
 *                     format: date-time
 *                   end:
 *                     type: string
 *                     format: date-time
 *                   location:
 *                     type: string
 *                   description:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 */
router.get('/', authGuard, listAllEvents);

/**
 * @swagger
 * /api/events/user:
 *   get:
 *     summary: Listar eventos do usuário logado
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de eventos do usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   organizer:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       email:
 *                         type: string
 *                   attendees:
 *                     type: array
 *                     items:
 *                       type: string
 *                   start:
 *                     type: string
 *                     format: date-time
 *                   end:
 *                     type: string
 *                     format: date-time
 *                   location:
 *                     type: string
 *                   description:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 */
router.get('/user', authGuard, listUserEvents);

/**
 * @swagger
 * /api/events/{id}:
 *   get:
 *     summary: Obter um evento por ID
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do evento
 *     responses:
 *       200:
 *         description: Dados do evento
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 organizer:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                 attendees:
 *                   type: array
 *                   items:
 *                     type: string
 *                 start:
 *                   type: string
 *                   format: date-time
 *                 end:
 *                   type: string
 *                   format: date-time
 *                 location:
 *                   type: string
 *                 description:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Evento não encontrado
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
router.get('/:id', authGuard, listEventById);

/**
 * @swagger
 * /api/events/{id}:
 *   put:
 *     summary: Editar um evento por ID
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do evento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - attendees
 *               - start
 *               - end
 *               - location
 *             properties:
 *               title:
 *                 type: string
 *                 description: Título do evento
 *               attendees:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: email
 *                 minItems: 1
 *                 description: Lista de e-mails dos participantes
 *               start:
 *                 type: string
 *                 format: date-time
 *                 description: Data e hora de início (ISO 8601)
 *               end:
 *                 type: string
 *                 format: date-time
 *                 description: Data e hora de fim (ISO 8601)
 *               location:
 *                 type: string
 *                 minLength: 5
 *                 description: Local do evento
 *               description:
 *                 type: string
 *                 description: Descrição opcional do evento
 *     responses:
 *       200:
 *         description: Evento editado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 organizer:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                 attendees:
 *                   type: array
 *                   items:
 *                     type: string
 *                 start:
 *                   type: string
 *                   format: date-time
 *                 end:
 *                   type: string
 *                   format: date-time
 *                 location:
 *                   type: string
 *                 description:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       401:
 *         description: Sem permissão para editar o evento
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *       404:
 *         description: Evento não encontrado
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
 *         description: Erro de validação ou datas inválidas
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
router.put('/:id', authGuard, eventInsertValidation(), validate, editEvent);

module.exports = router;