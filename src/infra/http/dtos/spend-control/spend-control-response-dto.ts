import { SpendControlUserResponseDTO } from './spend-control-user-response-dto';

/**
 * @openapi
 * components:
 *   schemas:
 *     SpendControlResponseDTO:
 *       type: object
 *       properties:
 *         spendControlId:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         color:
 *           type: string
 *           example: '#123456'
 *         isEnabled:
 *           type: boolean
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         users:
 *           type: array
 *           items:
 *             type: object
 *             $ref: '#/components/schemas/SpendControlUserResponseDTO'
 *         isShared:
 *           type: boolean
 *         balance:
 *           type: number
 *         totalSpent:
 *           type: number
 *         totalSpentByUser:
 *           type: number
 *         totalSpentByOthers:
 *           type: number
 */
export class SpendControlResponseDTO {
  spendControlId: string;
  name: string;
  description: string | null;
  color: string | null;
  isEnabled: boolean;
  createdAt: Date;
  updatedAt: Date;
  users: SpendControlUserResponseDTO[];
  isShared: boolean;
  balance: number;
  totalSpent: number;
  totalSpentByUser: number;
  totalSpentByOthers: number;

  constructor(data: Omit<SpendControlResponseDTO, 'isShared'>) {
    this.spendControlId = data.spendControlId;
    this.name = data.name;
    this.description = data.description;
    this.color = data.color;
    this.isEnabled = data.isEnabled;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.users = data.users.map(SpendControlUserResponseDTO.create);
    this.isShared = this.users.length > 1;
    this.balance = data.balance;
    this.totalSpent = data.totalSpent;
    this.totalSpentByUser = data.totalSpentByUser;
    this.totalSpentByOthers = data.totalSpentByOthers;
  }

  public static create(data: Omit<SpendControlResponseDTO, 'isShared'>): SpendControlResponseDTO {
    return new SpendControlResponseDTO(data);
  }
}
