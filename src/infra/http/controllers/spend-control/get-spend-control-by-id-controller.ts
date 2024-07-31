import { Response, NextFunction } from 'express';
import { GetSpendControlByIdUseCaseFactory } from '../../../factories/spend-control/get-spend-control-by-id-use-case-factory';
import { TypedRequest } from '../../../types/generic';

export class GetSpendControlByIdController {
  /**
   * @openapi
   * /api/v1/spend-control/{spendControlId}:
   *   get:
   *     tags:
   *       - Spend Control
   *     summary: Get spend control by id
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
   *                   example: 'OK'
   *                 data:
   *                   $ref: '#/components/schemas/SpendControlResponseDTO'
   *       401:
   *        description: Unauthorized
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/UnauthorizedDTO'
   *       404:
   *        description: Not Found
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/NotFoundDTO'
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
      const sut = GetSpendControlByIdUseCaseFactory.create(req.account);
      const response = await sut.execute(req.params.spendControlId);
      return res.sendResponse(200, response);
    } catch (error) {
      next(error);
    }
  }
}
