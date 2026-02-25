import { Customer } from "./customer.model";
import { Product } from "./product.model";

export interface Order {
  id?: number;
  customer: Customer;
  product: Product[];
  description: string;
  price: number;
  date: string;
  status: string;
}