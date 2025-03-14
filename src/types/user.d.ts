declare interface UserInfo {
  token: string;
  user: {
    email?: string;
    id?: number;
    username?: string;
    avatar?: string;
    createTime?: string;
    updateTime?: string;
  };
}
