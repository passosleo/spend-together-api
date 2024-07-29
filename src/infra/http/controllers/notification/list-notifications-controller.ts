import { Request, Response, NextFunction } from 'express';
import { ListNotificationsUseCaseFactory } from '../../../factories/notification/list-notifications-use-case-factory';

export class ListNotificationsController {
  /**
   * @openapi
   * /api/v1/notification:
   *   get:
   *     tags:
   *       - Notification
   *     summary: List all notifications
   *     security:
   *       - JWTAuth: []
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
   *                   example: 'Ok'
   *                 data:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/NotificationResponseDTO'
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
  public static async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const sut = ListNotificationsUseCaseFactory.create(req.account);
      const response = await sut.execute();
      return res.sendResponse(200, response);
    } catch (error) {
      next(error);
    }
  }
}
