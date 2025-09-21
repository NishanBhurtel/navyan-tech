interface ISessionUser {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "admin" | "customer";
  token: string;
}
export interface ISession {
  user: ISessionUser;
}
