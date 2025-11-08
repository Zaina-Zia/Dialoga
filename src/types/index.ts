export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[]; // URLs or base64, max 3
  createdAt?: string;
  updatedAt?: string;
};

export type PaymentMethod = {
  id: string;
  cardNumber: string; // Last 4 digits
  expiryMonth: string;
  expiryYear: string;
  cardholderName: string;
  cardType: "visa" | "mastercard" | "amex" | "other";
  billingAddress?: string;
};

export type Company = {
  id: string;
  name: string;
  user: string;
  phone: string;
  token: string;
  status: "active" | "paused";
};

export type Message = {
  id: string;
  text: string;
  timestamp: string;
  sender: "user" | "customer";
  attachments?: string[];
};

export type Conversation = {
  id: string;
  customerName: string;
  lastMessage: string;
  time: string;
  unread?: number;
};
