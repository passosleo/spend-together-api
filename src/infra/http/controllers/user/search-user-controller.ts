import { Response, NextFunction } from 'express';
import { SearchUserUseCaseFactory } from '../../../factories/user/search-user-use-case-factory';
import { SearchUserRequestDTO } from '../../dtos/user/search-user-request-dto';
import { TypedRequest } from '../../../types/generic';

export class SearchUserController {
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

  public static async handle(req: TypedRequest<void, void, SearchUserRequestDTO>, res: Response, next: NextFunction) {
    try {
      const sut = SearchUserUseCaseFactory.create(req.account);
      const response = await sut.execute(SearchUserRequestDTO.create(req.query));
      return res.sendResponse(200, response);
    } catch (error) {
      next(error);
    }
  }
}
