import { DeleteSpendUseCaseFactory } from './../../../factories/spend/delete-spend-use-case-factory';
import { Response, NextFunction } from 'express';
import { TypedRequest } from '../../../types/generic';

export class DeleteSpendController {
  /**
   * @openapi
   * /api/v1/spend/{spendId}:
   *   delete:
   *     tags:
   *       - Spend
   *     summary: Delete spend
   *     security:
   *       - JWTAuth: []
   *     parameters:
   *       - in: path
   *         name: spendId
   *         required: true
   *         schema:
   *           type: string
   *           format: uuid
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
  public static async handle(req: TypedRequest<{ spendId: string }, void, void>, res: Response, next: NextFunction) {
    try {
      const sut = DeleteSpendUseCaseFactory.create(req.account);
      await sut.execute(req.params.spendId);
      return res.sendResponse(204);
    } catch (error) {
      next(error);
    }
  }
}
