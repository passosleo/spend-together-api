import { Response, NextFunction } from 'express';
import { UpdateUserUseCaseFactory } from '../../../factories/user/update-user-use-case-factory';
import { UpdateUserRequestDTO } from '../../dtos/user/update-user-request-dto';
import { TypedRequest } from '../../../types/generic';

export class UpdateUserController {
  /**
   * @openapi
   * /api/v1/user/preferences:
   *   put:
   *     tags:
   *       - User
   *     summary: Update user preferences
   *     security:
   *       - JWTAuth: []
   *     requestBody:
   *       description: UpdateUserRequestDTO
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UpdateUserRequestDTO'
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
   *                   $ref: '#/components/schemas/UserAccountDTO'
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
   *       500:
   *         description: Internal Server Error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/InternalServerErrorDTO'
   */
  public static async handle(req: TypedRequest<void, UpdateUserRequestDTO, void>, res: Response, next: NextFunction) {
    try {
      const sut = UpdateUserUseCaseFactory.create(req.account);
      const response = await sut.execute(UpdateUserRequestDTO.create(req.body));
      return res.sendResponse(200, response);
    } catch (error) {
      next(error);
    }
  }
}
