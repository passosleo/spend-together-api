import { Response, NextFunction } from 'express';
import { TypedRequest } from '../../../types/generic';
import { DeleteSpendControlUseCaseFactory } from '../../../factories/spend-control/delete-spend-control-use-case-factory';

export class DeleteSpendControlController {
  /**
   * @openapi
   * /api/v1/spend-control/{spendControlId}:
   *   delete:
   *     tags:
   *       - Spend Control
   *     summary: Delete spend control
   *     security:
   *       - JWTAuth: []
   *     parameters:
   *       - in: path
   *         name: spendControlId
   *         required: true
   *         schema:
   *           type: string
   *           format: uuid
   *     responses:
   *       204:
   *         description: No Content
   *       401:
   *         description: Unauthorized
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/UnauthorizedDTO'
   *       403:
   *         description: Forbidden
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ForbiddenDTO'
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
    req: TypedRequest<{ spendControlId: string }, void, void>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const sut = DeleteSpendControlUseCaseFactory.create(req.account);
      await sut.execute(req.params.spendControlId);
      return res.sendResponse(204);
    } catch (error) {
      next(error);
    }
  }
}
