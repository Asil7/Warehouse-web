import { Card, Table } from "antd";

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
      <Card>
        <Table
          size="small"
          // loading={isLoading}
          // dataSource={orderList}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 20 }}
        />
      </Card>
    </div>
  );
};

export default OrderProductList;
