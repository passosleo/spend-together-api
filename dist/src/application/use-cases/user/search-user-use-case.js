"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchUserUseCase = void 0;
const search_user_response_dto_1 = require("../../../infra/http/dtos/user/search-user-response-dto");
class SearchUserUseCase {
    authProvider;
    userRepository;
    constructor(authProvider, userRepository) {
        this.authProvider = authProvider;
        this.userRepository = userRepository;
    }
    async execute({ username }) {
        const userAccount = this.authProvider.getAuthenticatedUser();
        const users = await this.userRepository.findAllByUsername(username, userAccount.username);
        return users.map((user) => search_user_response_dto_1.SearchUserResponseDTO.create(user));
    }
}
exports.SearchUserUseCase = SearchUserUseCase;
