import { SpendCategoryResponseDTO } from '../spend-category/spend-category-response-dto';
import { UserSummaryResponseDTO } from '../user/user-summary-response-dto';

/**
 * @openapi
 * components:
 *   schemas:
 *     SpendResponseDTO:
 *       type: object
 *       properties:
 *         spendId:
 *           type: string
 *           format: uuid
 *         spendControlId:
 *           type: string
 *           format: uuid
 *         spendCategoryId:
 *           type: string
 *           format: uuid
 *         userId:
 *           type: string
 *           format: uuid
 *         description:
 *           type: string
 *         amount:
 *           type: number
 *         isEnabled:
 *           type: boolean
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         spendCategory:
 *           $ref: '#/components/schemas/SpendCategoryResponseDTO'
 *         user:
 *           $ref: '#/components/schemas/UserSummaryResponseDTO'
 */
export class SpendResponseDTO {
  spendId: string;
  spendControlId: string;
  spendCategoryId: string;
  userId: string;
  description: string | null;
  amount: number;
  isEnabled: boolean;
  createdAt: Date;
  updatedAt: Date;
  spendCategory: SpendCategoryResponseDTO;
  user: UserSummaryResponseDTO;

  constructor(data: SpendResponseDTO) {
    this.spendId = data.spendId;
    this.spendControlId = data.spendControlId;
    this.spendCategoryId = data.spendCategoryId;
    this.userId = data.userId;
    this.description = data.description;
    this.amount = data.amount;
    this.isEnabled = data.isEnabled;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.spendCategory = SpendCategoryResponseDTO.create(data.spendCategory);
    this.user = UserSummaryResponseDTO.create(data.user);
  }

  public static create(data: SpendResponseDTO): SpendResponseDTO {
    return new SpendResponseDTO(data);
  }
}
