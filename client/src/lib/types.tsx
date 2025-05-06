export type Category = {
  category_id: number;
  category_name: string;
  category_description: string;
};
export type Product = {
  id: number;
  prod_name: string;
  prod_price: number;
  prod_quantity: number;
  prod_description: string;
  category: Category;
};
