/**
 * @openapi
 * components:
 *   schemas:
 *     SpendControlSummaryResponseDTO:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 */
export class SpendControlSummaryResponseDTO {
  name: string;

  constructor(data: SpendControlSummaryResponseDTO) {
    this.name = data.name;
  }

  public static create(data: SpendControlSummaryResponseDTO): SpendControlSummaryResponseDTO {
    return new SpendControlSummaryResponseDTO(data);
  }
}
