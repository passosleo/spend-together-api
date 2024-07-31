import { Response, NextFunction } from 'express';
import { TypedRequest } from '../../../types/generic';
import { CreateSpendControlUseCaseFactory } from '../../../factories/spend-control/create-spend-control-use-case-factory';
import { CreateSpendControlRequestDTO } from '../../dtos/spend-control/create-spend-control-request-dto';

export class CreateSpendControlController {
  /**
   * @openapi
   * /api/v1/spend-control:
   *   post:
   *     tags:
   *       - Spend Control
   *     summary: Create spend control
   *     security:
   *       - JWTAuth: []
   *     requestBody:
   *       description: CreateSpendControlRequestDTO
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateSpendControlRequestDTO'
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
   *                   $ref: '#/components/schemas/SpendControlResponseDTO'
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
    req: TypedRequest<void, CreateSpendControlRequestDTO, void>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const sut = CreateSpendControlUseCaseFactory.create(req.account);
      const response = await sut.execute(CreateSpendControlRequestDTO.create(req.body));
      return res.sendResponse(201, response);
    } catch (error) {
      next(error);
    }
  }
}
