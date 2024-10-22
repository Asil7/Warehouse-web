import { Card } from "antd";

const OrderProductList = () => {
  const columns = [
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
  ];

  return (
    <div>
      <Card></Card>
    </div>
  );
};

export default OrderProductList;
