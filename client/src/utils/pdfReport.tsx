import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Product } from "../lib/types";

export const generatePDFReport = (products: Product[]) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Product Report", 14, 22);

  const tableColumn = ["ID", "Name", "Category", "Price", "Quantity"];

  // ✅ Use explicit, safe type
  const tableRows: (string | number)[][] = [];

  products.forEach((product) => {
    const productData: (string | number)[] = [
      product.id,
      product.prod_name,
      product.category.category_name,
      product.prod_price,
      product.prod_quantity,
    ];
    tableRows.push(productData);
  });

  autoTable(doc, {
    startY: 30,
    head: [tableColumn],
    body: tableRows,
  });

  doc.save("product_report.pdf");
};
