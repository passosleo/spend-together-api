import { NextFunction, Response } from 'express';
import { DeleteNotificationUseCaseFactory } from '../../../factories/notification/delete-notification-use-case-factory';
import { TypedRequest } from '../../../types/generic';

export class DeleteNotificationController {
  /**
   * @openapi
   * /api/v1/notification/{notificationId}:
   *   delete:
   *     tags:
   *       - Notification
   *     summary: Delete notification
   *     security:
   *       - JWTAuth: []
   *     parameters:
   *       - in: path
   *         name: notificationId
   *         required: true
   *         schema:
   *           type: string
   *           format: uuid
   *     responses:
   *       204:
   *         description: No Content
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
  public static async handle(
    req: TypedRequest<{ notificationId: string }, void, void>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const sut = DeleteNotificationUseCaseFactory.create(req.account);
      await sut.execute(req.params.notificationId);
      return res.sendResponse(204);
    } catch (error) {
      next(error);
    }
  }
}
