/**
 * @openapi
 * components:
 *   schemas:
 *     UpdateSpendControlRequestDTO:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           required: false
 *         color:
 *           type: string
 *           example: '#123456'
 *           required: false
 *         description:
 *           type: string
 *           required: false
 */
export class UpdateSpendControlRequestDTO {
  spendControlId: string;
  name?: string;
  color?: string;
  description?: string;
  isEnabled?: boolean;

  constructor(data: UpdateSpendControlRequestDTO) {
    this.spendControlId = data.spendControlId;
    this.name = data.name;
    this.color = data.color;
    this.description = data.description;
    this.isEnabled = data.isEnabled;
  }

  public static create(data: UpdateSpendControlRequestDTO): UpdateSpendControlRequestDTO {
    return new UpdateSpendControlRequestDTO(data);
  }
}
