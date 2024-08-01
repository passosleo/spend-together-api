import { Route } from '../../../types/generic';
import { ListSpendControlInvitesController } from '../../controllers/spend-control-invite/list-spend-control-invites-controller';
import { ReplySpendControlInviteController } from '../../controllers/spend-control-invite/reply-spend-control-invite-controller';
import { ReplySpendControlInviteSchema } from '../../schemas/spend-control-invite/reply-spend-control-invite-schema';

export const spendControlInviteRoutes: Route[] = [
  {
    path: '/api/v1/spend-control-invite',
    method: 'GET',
    auth: true,
    controller: ListSpendControlInvitesController.handle,
  },
  {
    path: '/api/v1/spend-control-invite/:spendControlInviteId/reply',
    method: 'POST',
    auth: true,
    schema: ReplySpendControlInviteSchema,
    controller: ReplySpendControlInviteController.handle,
  },
];
