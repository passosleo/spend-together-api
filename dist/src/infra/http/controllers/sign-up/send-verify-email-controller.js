"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendVerifyEmailController = void 0;
const send_verify_email_use_case_factory_1 = require("../../../factories/sign-up/send-verify-email-use-case-factory");
const send_verify_email_request_dto_1 = require("../../dtos/sign-up/send-verify-email-request-dto");
class SendVerifyEmailController {
    /**
     * @openapi
     * /api/v1/sign-up/verify-email/send:
     *   post:
     *     tags:
     *       - Sign Up
     *     summary: Verify email send
     *     requestBody:
     *       description: SendVerifyEmailDTO
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/SendVerifyEmailRequestDTO'
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
     *       401:
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
            const sut = send_verify_email_use_case_factory_1.SendVerifyEmailUseCaseFactory.create();
            await sut.execute(send_verify_email_request_dto_1.SendVerifyEmailRequestDTO.create(req.body));
            return res.sendResponse(200);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.SendVerifyEmailController = SendVerifyEmailController;
