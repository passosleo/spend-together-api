"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignInController = void 0;
const sign_in_use_case_factory_1 = require("../../../factories/sign-in/sign-in-use-case-factory");
const sign_in_request_dto_1 = require("../../dtos/sign-in/sign-in-request-dto");
class SignInController {
    /**
     * @openapi
     * /api/v1/sign-in:
     *   post:
     *     tags:
     *       - Sign In
     *     summary: Sign In
     *     requestBody:
     *       required: true
     *       description: SignInRequestDTO
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/SignInRequestDTO'
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
     *                   $ref: '#/components/schemas/SignInResponseDTO'
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
            const sut = sign_in_use_case_factory_1.SignInUseCaseFactory.create();
            const response = await sut.execute(sign_in_request_dto_1.SignInRequestDTO.create(req.body));
            return res.sendResponse(200, response);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.SignInController = SignInController;
