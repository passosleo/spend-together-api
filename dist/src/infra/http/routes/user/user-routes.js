"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const delete_user_account_controller_1 = require("../../controllers/user/delete-user-account-controller");
const get_user_info_controller_1 = require("../../controllers/user/get-user-info-controller");
const search_user_controller_1 = require("../../controllers/user/search-user-controller");
const update_user_controller_1 = require("../../controllers/user/update-user-controller");
const update_user_schema_1 = require("../../schemas/user/update-user-schema");
const search_user_schema_1 = require("../../schemas/user/search-user-schema");
exports.userRoutes = [
    {
        path: '/api/v1/user/info',
        method: 'GET',
        auth: true,
        controller: get_user_info_controller_1.GetUserInfoController.handle,
    },
    {
        path: '/api/v1/user/delete',
        method: 'DELETE',
        auth: true,
        controller: delete_user_account_controller_1.DeleteUserAccountController.handle,
    },
    {
        path: '/api/v1/user/preferences',
        method: 'PUT',
        auth: true,
        schema: update_user_schema_1.UpdateUserSchema,
        controller: update_user_controller_1.UpdateUserController.handle,
    },
    {
        path: '/api/v1/user/search',
        method: 'GET',
        auth: true,
        schema: search_user_schema_1.SearchUserSchema,
        controller: search_user_controller_1.SearchUserController.handle,
    },
];
