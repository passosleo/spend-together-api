import { Request, Response, NextFunction } from 'express';
import { ListSpendControlInvitesUseCaseFactory } from '../../../factories/spend-control-invite/list-spend-control-invites-use-case-factory';

export class ListSpendControlInvitesController {
  /**
   * @openapi
   * /api/v1/spend-control-invite:
   *   get:
   *     tags:
   *       - Spend Control Invite
   *     summary: Get all invites
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
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/SpendControlInviteResponseDTO'
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
      const sut = ListSpendControlInvitesUseCaseFactory.create(req.account);
      const response = await sut.execute();
      return res.sendResponse(200, response);
    } catch (error) {
      next(error);
    }
  }
}
