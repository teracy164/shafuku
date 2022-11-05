import { User } from "~~/openapi";
import { AUTHORITY, AuthorityInfo } from "../constants/authorities";

export class UserUtil {
    static getAuthorityName(user: User) {
        const authorityId = user.authority as AUTHORITY;
        return AuthorityInfo[authorityId]?.name || '';
    }
}