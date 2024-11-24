export type Email ={
  email:string;
  _id?: string; 
}

export interface House {
  imageUrl: string;
  price: string;
  address: string;
  furniture: string;
  bedrooms: number;
  description: string;
  _id?: string;
  owner?: Email;
}

export interface UserLogin {
  email: string;
  password: string;
  accessToken?:string;
  _id?: string;
}

export interface UserRegister {
  email: string;
  password: string;
  rePassword: string;
  accessToken?:string;
  _id?: string;
}

export type Comment ={
  email:string;
  _id?: string;
  comment: string;
}
