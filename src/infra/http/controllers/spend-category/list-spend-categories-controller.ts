import { Request, Response, NextFunction } from 'express';
import { ListSpendCategoriesUseCaseFactory } from '../../../factories/spend-category/list-spend-categories-use-case-factory';

export class ListSpendCategoriesController {
  /**
   * @openapi
   * /api/v1/spend-category:
   *   get:
   *     tags:
   *       - Spend Category
   *     summary: List spend categories
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
   *                     $ref: '#/components/schemas/SpendCategoryResponseDTO'
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
      const sut = ListSpendCategoriesUseCaseFactory.create();
      const response = await sut.execute();
      return res.sendResponse(200, response);
    } catch (error) {
      next(error);
    }
  }
}
