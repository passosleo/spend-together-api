"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUpRoutes = void 0;
const send_verify_email_controller_1 = require("../../controllers/sign-up/send-verify-email-controller");
const sign_up_controller_1 = require("../../controllers/sign-up/sign-up-controller");
const verify_email_controller_1 = require("../../controllers/sign-up/verify-email-controller");
const render_middleware_1 = require("../../middlewares/render-middleware");
const send_verify_email_schema_1 = require("../../schemas/sign-up/send-verify-email-schema");
const sign_up_schema_1 = require("../../schemas/sign-up/sign-up-schema");
const verify_email_schema_1 = require("../../schemas/sign-up/verify-email-schema");
exports.signUpRoutes = [
    {
        path: '/api/v1/sign-up',
        method: 'POST',
        schema: sign_up_schema_1.SignUpSchema,
        controller: sign_up_controller_1.SignUpController.handle,
    },
    {
        path: '/api/v1/sign-up/verify-email',
        method: 'GET',
        controller: (0, render_middleware_1.renderPage)('verify-email'),
    },
    {
        path: '/api/v1/sign-up/verify-email',
        method: 'POST',
        schema: verify_email_schema_1.VerifyEmailSchema,
        controller: verify_email_controller_1.VerifyEmailController.handle,
    },
    {
        path: '/api/v1/sign-up/verify-email/send',
        method: 'POST',
        schema: send_verify_email_schema_1.SendVerifyEmailSchema,
        controller: send_verify_email_controller_1.SendVerifyEmailController.handle,
    },
];
