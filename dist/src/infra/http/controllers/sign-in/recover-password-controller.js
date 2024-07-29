"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecoverPasswordController = void 0;
const recover_password_use_case_factory_1 = require("../../../factories/sign-in/recover-password-use-case-factory");
const recover_password_request_dto_1 = require("../../dtos/sign-in/recover-password-request-dto");
class RecoverPasswordController {
    /**
     * @openapi
     * /api/v1/sign-in/recover-password:
     *   post:
     *     tags:
     *       - Sign In
     *     summary: Recover password
     *     parameters:
     *       - in: query
     *         name: token
     *         required: true
     *         schema:
     *           type: string
     *     requestBody:
     *       description: RecoverPasswordRequestDTO
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/RecoverPasswordRequestDTO'
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
     *       500:
     *         description: Internal Server Error
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/InternalServerErrorDTO'
     */
    static async handle(req, res, next) {
        try {
            const sut = recover_password_use_case_factory_1.RecoverPasswordUseCaseFactory.create();
            const response = await sut.execute(recover_password_request_dto_1.RecoverPasswordRequestDTO.create({
                newPassword: req.body.newPassword,
                token: req.query.token,
            }));
            return res.sendResponse(200, response);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.RecoverPasswordController = RecoverPasswordController;
