"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchUserResponseDTO = void 0;
/**
 * @openapi
 * components:
 *   schemas:
 *     SearchUserResponseDTO:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *         name:
 *           type: string
 *         avatar:
 *           type: string
 */
class SearchUserResponseDTO {
    username;
    name;
    avatar;
    constructor(data) {
        this.name = data.name;
        this.username = data.username;
        this.avatar = data.avatar;
    }
    static create(data) {
        return new SearchUserResponseDTO(data);
    }
}
exports.SearchUserResponseDTO = SearchUserResponseDTO;
