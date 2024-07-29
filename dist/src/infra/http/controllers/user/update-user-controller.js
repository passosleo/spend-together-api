"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserController = void 0;
const update_user_use_case_factory_1 = require("../../../factories/user/update-user-use-case-factory");
const update_user_request_dto_1 = require("../../dtos/user/update-user-request-dto");
class UpdateUserController {
    /**
     * @openapi
     * /api/v1/user/preferences:
     *   put:
     *     tags:
     *       - User
     *     summary: Update user preferences
     *     security:
     *       - JWTAuth: []
     *     requestBody:
     *       description: UpdateUserRequestDTO
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/UpdateUserRequestDTO'
     *     responses:
     *       200:
     *         description: OK
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: number
     *                   example: 200
     *                 message:
     *                   type: string
     *                   example: 'Ok'
     *                 data:
     *                   $ref: '#/components/schemas/UserAccountDTO'
     *       400:
     *         description: Bad Request
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/BadRequestDTO'
     *       401:
     *         description: Unauthorized
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/UnauthorizedDTO'
     *       500:
     *         description: Internal Server Error
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/InternalServerErrorDTO'
     */
    static async handle(req, res, next) {
        try {
            const sut = update_user_use_case_factory_1.UpdateUserUseCaseFactory.create(req.account);
            const response = await sut.execute(update_user_request_dto_1.UpdateUserRequestDTO.create(req.body));
            return res.sendResponse(200, response);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.UpdateUserController = UpdateUserController;
