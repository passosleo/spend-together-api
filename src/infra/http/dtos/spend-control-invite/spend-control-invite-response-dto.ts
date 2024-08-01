import { SpendControlSummaryResponseDTO } from '../spend-control/spend-control-summary-response-dto';
import { UserSummaryResponseDTO } from '../user/user-summary-response-dto';

/**
 * @openapi
 * components:
 *   schemas:
 *    SpendControlInviteResponseDTO:
 *      type: object
 *      properties:
 *        spendControlInviteId:
 *          type: string
 *          format: uuid
 *        isAccepted:
 *          type: boolean
 *        isEnabled:
 *          type: boolean
 *        createdAt:
 *          type: string
 *          format: date-time
 *        updatedAt:
 *          type: string
 *          format: date-time
 *        invitedUser:
 *          $ref: '#/components/schemas/UserSummaryResponseDTO'
 *        ownerUser:
 *          $ref: '#/components/schemas/UserSummaryResponseDTO'
 *        spendControl:
 *          $ref: '#/components/schemas/SpendControlSummaryResponseDTO'
 */
export class SpendControlInviteResponseDTO {
  spendControlInviteId: string;
  isAccepted: boolean;
  isEnabled: boolean;
  createdAt: Date;
  updatedAt: Date;
  invitedUser: UserSummaryResponseDTO;
  ownerUser: UserSummaryResponseDTO;
  spendControl: SpendControlSummaryResponseDTO;

  constructor(spendControlInvite: SpendControlInviteResponseDTO) {
    this.spendControlInviteId = spendControlInvite.spendControlInviteId;
    this.isAccepted = spendControlInvite.isAccepted;
    this.isEnabled = spendControlInvite.isEnabled;
    this.createdAt = spendControlInvite.createdAt;
    this.updatedAt = spendControlInvite.updatedAt;
    this.invitedUser = UserSummaryResponseDTO.create(spendControlInvite.invitedUser);
    this.ownerUser = UserSummaryResponseDTO.create(spendControlInvite.ownerUser);
    this.spendControl = SpendControlSummaryResponseDTO.create(spendControlInvite.spendControl);
  }

  public static create(spendControlInvite: SpendControlInviteResponseDTO): SpendControlInviteResponseDTO {
    return new SpendControlInviteResponseDTO(spendControlInvite);
  }
}
