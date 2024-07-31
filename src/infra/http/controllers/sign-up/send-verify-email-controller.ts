import { TypedRequest } from '../../../types/generic';
import { Response, NextFunction } from 'express';
import { SendVerifyEmailUseCaseFactory } from '../../../factories/sign-up/send-verify-email-use-case-factory';
import { SendVerifyEmailRequestDTO } from '../../dtos/sign-up/send-verify-email-request-dto';

export class SendVerifyEmailController {
  /**
   * @openapi
   * /api/v1/sign-up/verify-email/send:
   *   post:
   *     tags:
   *       - Sign Up
   *     summary: Verify email send
   *     requestBody:
   *       description: SendVerifyEmailRequestDTO
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/SendVerifyEmailRequestDTO'
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
   *       401:
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
    req: TypedRequest<void, SendVerifyEmailRequestDTO, void>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const sut = SendVerifyEmailUseCaseFactory.create();
      await sut.execute(SendVerifyEmailRequestDTO.create(req.body));
      return res.sendResponse(200);
    } catch (error) {
      next(error);
    }
  }
}
