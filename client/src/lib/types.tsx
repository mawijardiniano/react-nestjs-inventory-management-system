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

export type AddCategory = {
    category_name: string;
    category_description: string;
}

export type AddProduct = {
  prod_name: string;
  prod_price: string;
  prod_quantity: string;
  prod_description: string;
  category_id: string;
};


export type ProductChart = {
  id: number;
  prod_name: string;
  prod_price: number;
  prod_quantity: number;
  prod_description: string;
  category: Category;
  createdAt?: string;
  updatedAt?: string;
}


export type MonthlyChartData = {
  key: string;
  label: string;
  value: number;
}