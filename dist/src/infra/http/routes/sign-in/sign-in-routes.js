"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInRoutes = void 0;
const recover_password_controller_1 = require("../../controllers/sign-in/recover-password-controller");
const send_recover_password_controller_1 = require("../../controllers/sign-in/send-recover-password-controller");
const sign_in_controller_1 = require("../../controllers/sign-in/sign-in-controller");
const render_middleware_1 = require("../../middlewares/render-middleware");
const recover_password_schema_1 = require("../../schemas/sign-in/recover-password-schema");
const send_recover_password_schema_1 = require("../../schemas/sign-in/send-recover-password-schema");
const sign_in_schema_1 = require("../../schemas/sign-in/sign-in-schema");
exports.signInRoutes = [
    {
        path: '/api/v1/sign-in',
        method: 'POST',
        schema: sign_in_schema_1.SignInSchema,
        controller: sign_in_controller_1.SignInController.handle,
    },
    {
        path: '/api/v1/sign-in/recover-password',
        method: 'GET',
        controller: (0, render_middleware_1.renderPage)('recover-password'),
    },
    {
        path: '/api/v1/sign-in/recover-password',
        method: 'POST',
        schema: recover_password_schema_1.RecoverPasswordSchema,
        controller: recover_password_controller_1.RecoverPasswordController.handle,
    },
    {
        path: '/api/v1/sign-in/recover-password/send',
        method: 'POST',
        schema: send_recover_password_schema_1.SendRecoverPasswordSchema,
        controller: send_recover_password_controller_1.SendRecoverPasswordController.handle,
    },
];
