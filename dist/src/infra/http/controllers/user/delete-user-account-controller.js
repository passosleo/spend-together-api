"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteUserAccountController = void 0;
const delete_user_account_use_case_factory_1 = require("../../../factories/user/delete-user-account-use-case-factory");
class DeleteUserAccountController {
    /**
     * @openapi
     * /api/v1/user/delete:
     *   delete:
     *     tags:
     *       - User
     *     summary: Delete user account
     *     security:
     *       - JWTAuth: []
     *     responses:
     *       204:
     *         description: No Content
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/SuccessDTO'
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
            const sut = delete_user_account_use_case_factory_1.DeleteUserAccountUseCaseFactory.create(req.account);
            const response = await sut.execute();
            return res.sendResponse(204, response);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.DeleteUserAccountController = DeleteUserAccountController;
