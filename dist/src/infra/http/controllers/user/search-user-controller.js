"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchUserController = void 0;
const search_user_use_case_factory_1 = require("../../../factories/user/search-user-use-case-factory");
const search_user_request_dto_1 = require("../../dtos/user/search-user-request-dto");
class SearchUserController {
    /**
     * @openapi
     * /api/v1/user/search:
     *   get:
     *     tags:
     *       - User
     *     summary: Search for users
     *     security:
     *       - JWTAuth: []
     *     parameters:
     *       - in: query
     *         name: username
     *         required: true
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
     *                   type: array
     *                   items:
     *                     $ref: '#/components/schemas/SearchUserResponseDTO'
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
            const sut = search_user_use_case_factory_1.SearchUserUseCaseFactory.create(req.account);
            const response = await sut.execute(search_user_request_dto_1.SearchUserRequestDTO.create(req.query));
            return res.sendResponse(200, response);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.SearchUserController = SearchUserController;
