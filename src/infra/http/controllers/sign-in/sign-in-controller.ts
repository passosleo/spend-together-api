import { SignInUseCaseFactory } from '../../../factories/sign-in/sign-in-use-case-factory';
import { SignInRequestDTO } from '../../dtos/sign-in/sign-in-request-dto';
import { TypedRequest } from '../../../types/generic';
import { Response, NextFunction } from 'express';

export class SignInController {
  /**
   * @openapi
   * /api/v1/sign-in:
   *   post:
   *     tags:
   *       - Sign In
   *     summary: Sign In
   *     requestBody:
   *       required: true
   *       description: SignInRequestDTO
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/SignInRequestDTO'
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
   *                   $ref: '#/components/schemas/SignInResponseDTO'
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
  public static async handle(req: TypedRequest<void, SignInRequestDTO, void>, res: Response, next: NextFunction) {
    try {
      const sut = SignInUseCaseFactory.create();
      const response = await sut.execute(SignInRequestDTO.create(req.body));
      return res.sendResponse(200, response);
    } catch (error) {
      next(error);
    }
  }
}
