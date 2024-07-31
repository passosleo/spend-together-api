import { TypedRequest } from '../../../types/generic';
import { Response, NextFunction } from 'express';
import { SignUpUseCaseFactory } from '../../../factories/sign-up/sign-up-use-case-factory';
import { SignUpRequestDTO } from '../../dtos/sign-up/sign-up-request-dto';

export class SignUpController {
  /**
   * @openapi
   * /api/v1/sign-up:
   *   post:
   *     tags:
   *       - Sign Up
   *     summary: Sign Up
   *     requestBody:
   *       description: SignUpRequestDTO
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/SignUpRequestDTO'
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
   *                   $ref: '#/components/schemas/SignUpResponseDTO'
   *       400:
   *         description: Bad Request
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/BadRequestDTO'
   *       403:
   *         description: Forbidden
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ForbiddenDTO'
   *       409:
   *         description: Conflict
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ConflictDTO'
   *       500:
   *         description: Internal Server Error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/InternalServerErrorDTO'
   */
  public static async handle(req: TypedRequest<void, SignUpRequestDTO, void>, res: Response, next: NextFunction) {
    try {
      const sut = SignUpUseCaseFactory.create();
      const response = await sut.execute(SignUpRequestDTO.create(req.body));
      return res.sendResponse(200, response);
    } catch (error) {
      next(error);
    }
  }
}
