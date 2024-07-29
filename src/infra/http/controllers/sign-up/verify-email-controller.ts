import { TypedRequest } from '../../../types/generic';
import { Response, NextFunction } from 'express';
import { VerifyEmailUseCaseFactory } from '../../../factories/sign-up/verify-email-use-case-factory';
import { VerifyEmailRequestDTO } from '../../dtos/sign-up/verify-email-request-dto';

export class VerifyEmailController {
  /**
   * @openapi
   * /api/v1/sign-up/verify-email:
   *   post:
   *     tags:
   *       - Sign Up
   *     summary: Verify email
   *     parameters:
   *       - in: query
   *         name: token
   *         required: true
   *         schema:
   *           type: string
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
   *       500:
   *         description: Internal Server Error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/InternalServerErrorDTO'
   */
  public static async handle(req: TypedRequest<void, void, VerifyEmailRequestDTO>, res: Response, next: NextFunction) {
    try {
      const sut = VerifyEmailUseCaseFactory.create();
      await sut.execute(VerifyEmailRequestDTO.create(req.query));
      return res.sendResponse(200);
    } catch (error) {
      next(error);
    }
  }
}
