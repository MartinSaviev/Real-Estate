export type Email = {
  email: string;
  _id?: string;
};

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


