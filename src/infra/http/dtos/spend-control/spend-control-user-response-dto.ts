import { UserSummaryResponseDTO } from '../user/user-summary-response-dto';

/**
 * @openapi
 * components:
 *   schemas:
 *     SpendControlUserResponseDTO:
 *       type: object
 *       properties:
 *         user:
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *             name:
 *               type: string
 *               nullable: true
 *             avatar:
 *               type: string
 *               nullable: true
 *         isOwner:
 *           type: boolean
 *         invitedAt:
 *           type: string
 *           format: date-time
 *         joinedAt:
 *           type: string
 *           format: date-time
 *           nullable: true
 */
export class SpendControlUserResponseDTO {
  user: UserSummaryResponseDTO;
  isOwner: boolean;
  invitedAt: Date;
  joinedAt: Date | null;

  constructor(data: SpendControlUserResponseDTO) {
    this.user = UserSummaryResponseDTO.create(data.user);
    this.isOwner = data.isOwner;
    this.invitedAt = data.invitedAt;
    this.joinedAt = data.joinedAt;
  }

  public static create(data: SpendControlUserResponseDTO): SpendControlUserResponseDTO {
    return new SpendControlUserResponseDTO(data);
  }
}
