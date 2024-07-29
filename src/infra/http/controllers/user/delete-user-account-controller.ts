import { Request, Response, NextFunction } from 'express';
import { DeleteUserAccountUseCaseFactory } from '../../../factories/user/delete-user-account-use-case-factory';

export class DeleteUserAccountController {
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
  public static async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const sut = DeleteUserAccountUseCaseFactory.create(req.account);
      const response = await sut.execute();
      return res.sendResponse(204, response);
    } catch (error) {
      next(error);
    }
  }
}
