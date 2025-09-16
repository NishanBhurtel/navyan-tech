type IOrder = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  notes?: string | undefined;
  preferredContact?: "phone" | "whatsapp" | "email";
  productID: string;
  quantity: string;
};
