/**
 * @openapi
 * components:
 *   schemas:
 *     CreateSpendControlRequestDTO:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           required: true
 *         color:
 *           type: string
 *           example: '#123456'
 *           required: true
 *         description:
 *           type: string
 *           required: false
 *         invitedUsernames:
 *           type: array
 *           items:
 *             type: string
 *             required: true
 */
export class CreateSpendControlRequestDTO {
  name: string;
  color: string;
  description?: string;
  invitedUsernames: string[];

  constructor(data: CreateSpendControlRequestDTO) {
    this.name = data.name;
    this.color = data.color;
    this.description = data.description;
    this.invitedUsernames = data.invitedUsernames ?? [];
  }

  public static create(data: CreateSpendControlRequestDTO): CreateSpendControlRequestDTO {
    return new CreateSpendControlRequestDTO(data);
  }
}
