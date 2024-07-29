"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyEmailController = void 0;
const verify_email_use_case_factory_1 = require("../../../factories/sign-up/verify-email-use-case-factory");
const verify_email_request_dto_1 = require("../../dtos/sign-up/verify-email-request-dto");
class VerifyEmailController {
    /**
     * @openapi
     * /api/v1/sign-up/verify-email:
     *   post:
     *     tags:
     *       - Sign Up
     *     summary: Verify email
     *     parameters:
     *       - in: query
     *         name: token
     *         required: true
     *         schema:
     *           type: string
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
            const sut = verify_email_use_case_factory_1.VerifyEmailUseCaseFactory.create();
            await sut.execute(verify_email_request_dto_1.VerifyEmailRequestDTO.create(req.query));
            return res.sendResponse(200);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.VerifyEmailController = VerifyEmailController;
