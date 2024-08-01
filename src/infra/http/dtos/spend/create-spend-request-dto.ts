/**
 * @openapi
 * components:
 *   schemas:
 *     CreateSpendRequestDTO:
 *       type: object
 *       properties:
 *         spendControlId:
 *           type: string
 *           format: uuid
 *           required: true
 *         spendCategoryId:
 *           type: string
 *           format: uuid
 *           required: true
 *         amount:
 *           type: number
 *           required: true
 *         description:
 *           type: string
 *           required: false
 */
export class CreateSpendRequestDTO {
  spendControlId: string;
  spendCategoryId: string;
  amount: number;
  description?: string;

  constructor(data: CreateSpendRequestDTO) {
    this.spendControlId = data.spendControlId;
    this.spendCategoryId = data.spendCategoryId;
    this.amount = data.amount;
    this.description = data.description;
  }

  public static create(data: CreateSpendRequestDTO): CreateSpendRequestDTO {
    return new CreateSpendRequestDTO(data);
  }
}
