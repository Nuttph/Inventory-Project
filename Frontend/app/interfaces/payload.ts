export interface Payload {
  user: User;
  token: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  created_at: string;
  updated_at: string;
  role: string;
  active:number;
}

export interface UserInfoProps{
  username:string;
  name:string;
  role:string;
}