import { Response, NextFunction } from 'express';
import { ReplySpendControlInviteUseCaseFactory } from '../../../factories/spend-control-invite/reply-spend-control-invite-use-case-factory';
import { TypedRequest } from '../../../types/generic';

export class ReplySpendControlInviteController {
  /**
   * @openapi
   * /api/v1/spend-control-invite/{spendControlInviteId}/reply:
   *   post:
   *     tags:
   *       - Spend Control Invite
   *     summary: Reply to an invite
   *     security:
   *       - JWTAuth: []
   *     parameters:
   *       - in: path
   *         name: spendControlInviteId
   *         required: true
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               isAccepted:
   *                 type: boolean
   *                 example: true
   *                 required: true
   *     responses:
   *       204:
   *         description: No Content
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
  public static async handle(
    req: TypedRequest<{ spendControlInviteId: string }, { isAccepted: boolean }, void>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const sut = ReplySpendControlInviteUseCaseFactory.create(req.account);
      await sut.execute(req.params.spendControlInviteId, req.body.isAccepted);
      return res.sendResponse(204);
    } catch (error) {
      next(error);
    }
  }
}
