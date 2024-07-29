import { TypedRequest } from '../../../types/generic';
import { Response, NextFunction } from 'express';
import { SendRecoverPasswordRequestDTO } from '../../dtos/sign-in/send-recover-password-request-dto';
import { SendRecoverPasswordUseCaseFactory } from '../../../factories/sign-in/send-recover-password-use-case-factory';

export class SendRecoverPasswordController {
  /**
   * @openapi
   * /api/v1/sign-in/recover-password/send:
   *   post:
   *     tags:
   *       - Sign In
   *     summary: Send recover password
   *     requestBody:
   *       description: SendRecoverPasswordRequestDTO
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/SendRecoverPasswordRequestDTO'
   *     responses:
   *       200:
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/SuccessDTO'
   *       400:
   *         description: Bad Request
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/BadRequestDTO'
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
    req: TypedRequest<void, SendRecoverPasswordRequestDTO, void>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const sut = SendRecoverPasswordUseCaseFactory.create();
      const response = await sut.execute(SendRecoverPasswordRequestDTO.create(req.body));
      return res.sendResponse(200, response);
    } catch (error) {
      next(error);
    }
  }
}
