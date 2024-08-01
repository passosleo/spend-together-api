import { Response, NextFunction } from 'express';
import { TypedRequest } from '../../../types/generic';
import { CreateSpendRequestDTO } from '../../dtos/spend/create-spend-request-dto';
import { CreateSpendUseCaseFactory } from '../../../factories/spend/create-spend-use-case-factory';

export class CreateSpendController {
  /**
   * @openapi
   * /api/v1/spend:
   *   post:
   *     tags:
   *       - Spend
   *     summary: Create spend
   *     security:
   *       - JWTAuth: []
   *     requestBody:
   *       description: CreateSpendRequestDTO
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateSpendRequestDTO'
   *     responses:
   *       201:
   *         description: Created
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: number
   *                   example: 201
   *                 message:
   *                   type: string
   *                   example: 'Created'
   *                 data:
   *                   $ref: '#/components/schemas/SpendDTO'
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
  public static async handle(req: TypedRequest<void, CreateSpendRequestDTO, void>, res: Response, next: NextFunction) {
    try {
      const sut = CreateSpendUseCaseFactory.create(req.account);
      const response = await sut.execute(CreateSpendRequestDTO.create(req.body));
      return res.sendResponse(201, response);
    } catch (error) {
      next(error);
    }
  }
}
