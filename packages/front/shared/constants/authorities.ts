export enum AUTHORITY {
  SYSTEM_ADMIN = 1,
  GENERAL,
}

export const AuthorityInfo = {
  [AUTHORITY.SYSTEM_ADMIN]: {
    name: '管理者',
  },
  [AUTHORITY.GENERAL]: {
    name: '一般ユーザー',
  },
};
