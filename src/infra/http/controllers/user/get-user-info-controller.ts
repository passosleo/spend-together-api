import { Request, Response, NextFunction } from 'express';
import { GetUserInfoUseCaseFactory } from '../../../factories/user/get-user-info-use-case-factory';

export class GetUserInfoController {
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
  public static async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const sut = GetUserInfoUseCaseFactory.create(req.account);
      const response = await sut.execute();
      return res.sendResponse(200, response);
    } catch (error) {
      next(error);
    }
  }
}
