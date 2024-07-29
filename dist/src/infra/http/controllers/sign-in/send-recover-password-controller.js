"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendRecoverPasswordController = void 0;
const send_recover_password_request_dto_1 = require("../../dtos/sign-in/send-recover-password-request-dto");
const send_recover_password_use_case_factory_1 = require("../../../factories/sign-in/send-recover-password-use-case-factory");
class SendRecoverPasswordController {
    /**
     * @openapi
     * /api/v1/sign-in/recover-password/send:
     *   post:
     *     tags:
     *       - Sign In
     *     summary: Send recover password
     *     requestBody:
     *       description: SendRecoverPasswordRequestDTO
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/SendRecoverPasswordRequestDTO'
     *     responses:
     *       200:
     *         description: OK
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/SuccessDTO'
     *       400:
     *         description: Bad Request
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/BadRequestDTO'
     *       404:
     *         description: Not Found
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/NotFoundDTO'
     *       500:
     *         description: Internal Server Error
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/InternalServerErrorDTO'
     */
    static async handle(req, res, next) {
        try {
            const sut = send_recover_password_use_case_factory_1.SendRecoverPasswordUseCaseFactory.create();
            const response = await sut.execute(send_recover_password_request_dto_1.SendRecoverPasswordRequestDTO.create(req.body));
            return res.sendResponse(200, response);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.SendRecoverPasswordController = SendRecoverPasswordController;
