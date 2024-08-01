import { Response, NextFunction } from 'express';
import { TypedRequest } from '../../../types/generic';
import { UpdateSpendControlRequestDTO } from '../../dtos/spend-control/update-spend-control-request-dto';
import { UpdateSpendControlUseCaseFactory } from '../../../factories/spend-control/update-spend-control-use-case-factory';

export class UpdateSpendControlController {
  /**
   * @openapi
   * /api/v1/spend-control/{spendControlId}:
   *   put:
   *     tags:
   *       - Spend Control
   *     summary: Update spend control
   *     security:
   *       - JWTAuth: []
   *     parameters:
   *       - in: path
   *         name: spendControlId
   *         required: true
   *         schema:
   *           type: string
   *           format: uuid
   *     requestBody:
   *       description: UpdateSpendControlRequestDTO
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UpdateSpendControlRequestDTO'
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
    req: TypedRequest<{ spendControlId: string }, UpdateSpendControlRequestDTO, void>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const sut = UpdateSpendControlUseCaseFactory.create(req.account);
      const response = await sut.execute(req.params.spendControlId, UpdateSpendControlRequestDTO.create(req.body));
      return res.sendResponse(200, response);
    } catch (error) {
      next(error);
    }
  }
}
