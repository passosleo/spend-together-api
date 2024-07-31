import { Request, Response, NextFunction } from 'express';
import { GetPrivacyPolicyUseCaseFactory } from '../../../factories/privacy-policy/get-privacy-policy-use-case-factory';

export class GetPrivacyPolicyController {
  /**
   * @openapi
   * /api/v1/privacy-policy:
   *   get:
   *     tags:
   *       - Privacy Policy
   *     summary: Get privacy policy
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
   *                   $ref: '#/components/schemas/PrivacyPolicyResponseDTO'
   *       500:
   *         description: Internal Server Error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/InternalServerErrorDTO'
   */
  public static async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const sut = GetPrivacyPolicyUseCaseFactory.create();
      const response = await sut.execute();
      return res.sendResponse(200, response);
    } catch (error) {
      next(error);
    }
  }
}
