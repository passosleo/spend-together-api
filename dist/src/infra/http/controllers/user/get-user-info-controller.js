"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserInfoController = void 0;
const get_user_info_use_case_factory_1 = require("../../../factories/user/get-user-info-use-case-factory");
class GetUserInfoController {
    /**
     * @openapi
     * /api/v1/user/info:
     *   get:
     *     tags:
     *       - User
     *     summary: Get user info
     *     security:
     *       - JWTAuth: []
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
     *                   $ref: '#/components/schemas/UserDTO'
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
            const sut = get_user_info_use_case_factory_1.GetUserInfoUseCaseFactory.create(req.account);
            const response = await sut.execute();
            return res.sendResponse(200, response);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.GetUserInfoController = GetUserInfoController;
