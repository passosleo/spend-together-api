import { TypedRequest } from '../../../types/generic';
import { Response, NextFunction } from 'express';
import { RecoverPasswordUseCaseFactory } from '../../../factories/sign-in/recover-password-use-case-factory';
import { RecoverPasswordRequestDTO } from '../../dtos/sign-in/recover-password-request-dto';

export class RecoverPasswordController {
  /**
   * @openapi
   * /api/v1/sign-in/recover-password:
   *   post:
   *     tags:
   *       - Sign In
   *     summary: Recover password
   *     parameters:
   *       - in: query
   *         name: token
   *         required: true
   *         schema:
   *           type: string
   *     requestBody:
   *       description: RecoverPasswordRequestDTO
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/RecoverPasswordRequestDTO'
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
  public static async handle(
    req: TypedRequest<void, Pick<RecoverPasswordRequestDTO, 'newPassword'>, Pick<RecoverPasswordRequestDTO, 'token'>>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const sut = RecoverPasswordUseCaseFactory.create();
      const response = await sut.execute(
        RecoverPasswordRequestDTO.create({
          newPassword: req.body.newPassword,
          token: req.query.token,
        }),
      );
      return res.sendResponse(200, response);
    } catch (error) {
      next(error);
    }
  }
}
