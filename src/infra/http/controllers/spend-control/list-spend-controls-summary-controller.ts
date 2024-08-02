import { Request, Response, NextFunction } from 'express';
import { ListSpendControlsSummaryUseCaseFactory } from '../../../factories/spend-control/list-spend-controls-summary-use-case-factory';

export class ListSpendControlsSummaryController {
  /**
   * @openapi
   * /api/v1/spend-control/list/summary:
   *   get:
   *     tags:
   *       - Spend Control
   *     summary: List spend controls summary
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
   *                   example: 'OK'
   *                 data:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/SpendControlSummaryResponseDTO'
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
      const sut = ListSpendControlsSummaryUseCaseFactory.create(req.account);
      const response = await sut.execute();
      return res.sendResponse(200, response);
    } catch (error) {
      next(error);
    }
  }
}
