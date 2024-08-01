import { Response, NextFunction } from 'express';
import { TypedRequest } from '../../../types/generic';
import { GetSpendByIdUseCaseFactory } from '../../../factories/spend/get-spend-by-id-use-case-factory';

export class GetSpendByIdController {
  /**
   * @openapi
   * /api/v1/spend/{spendId}:
   *   get:
   *     tags:
   *       - Spend
   *     summary: Get spend by id
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
   *                   $ref: '#/components/schemas/SpendResponseDTO'
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
      const sut = GetSpendByIdUseCaseFactory.create(req.account);
      const response = await sut.execute(req.params.spendId);
      return res.sendResponse(200, response);
    } catch (error) {
      next(error);
    }
  }
}
