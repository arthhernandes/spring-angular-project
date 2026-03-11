
export interface Order {
  id: number;
  customerName: string;
  productNames: string[];
  description: string;
  price: number;
  date: string;
  status: string;
}