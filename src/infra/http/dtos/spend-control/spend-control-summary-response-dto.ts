/**
 * @openapi
 * components:
 *   schemas:
 *     SpendControlSummaryResponseDTO:
 *       type: object
 *       properties:
 *         spendControlId:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *         description:
 *           type: string
 *           nullable: true
 *         color:
 *           type: string
 *           nullable: true
 *           example: '#F03550'
 */
export class SpendControlSummaryResponseDTO {
  spendControlId: string;
  name: string;
  description: string | null;
  color: string | null;

  constructor(data: SpendControlSummaryResponseDTO) {
    this.spendControlId = data.spendControlId;
    this.name = data.name;
    this.description = data.description;
    this.color = data.color;
  }

  public static create(data: SpendControlSummaryResponseDTO): SpendControlSummaryResponseDTO {
    return new SpendControlSummaryResponseDTO(data);
  }
}
