/**
 * @openapi
 * components:
 *   schemas:
 *    SpendCategoryResponseDTO:
 *      type: object
 *      properties:
 *        spendCategoryId:
 *          type: string
 *          format: uuid
 *        name:
 *          type: string
 *        color:
 *          type: string
 *        description:
 *          type: string
 *        isEnabled:
 *          type: boolean
 *        createdAt:
 *          type: string
 *          format: date-time
 *        updatedAt:
 *          type: string
 *          format: date-time
 */
export class SpendCategoryResponseDTO {
  spendCategoryId: string;
  name: string;
  color: string;
  description: string | null;
  isEnabled: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: SpendCategoryResponseDTO) {
    this.spendCategoryId = data.spendCategoryId;
    this.name = data.name;
    this.color = data.color;
    this.description = data.description;
    this.isEnabled = data.isEnabled;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  public static create(data: SpendCategoryResponseDTO): SpendCategoryResponseDTO {
    return new SpendCategoryResponseDTO(data);
  }
}
