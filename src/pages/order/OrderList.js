import { Button, Card, Table } from "antd";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import UserService from "../../services/UserService";

const OrderList = () => {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
    },
    {
      title: "User",
      dataIndex: "user",
      key: "user",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Delivered",
      dataIndex: "delivered",
      key: "delivered",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => dayjs(createdAt).format("MM-DD-YYYY hh:mm"),
      width: 200,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
  ];

  return (
    <div>
      <Card
        size="small"
        extra={
          UserService.hasPermission("ADD_ORDER") && (
            <Link to={"/order-form"}>
              <Button className="mt-1 mb-1" type="primary">
                Add Order
              </Button>
            </Link>
          )
        }
      >
        <Table
          size="small"
          // loading={isLoading}
          // dataSource={companyList}
          columns={columns}
          rowKey="id"
          scroll={{ x: 1200 }}
          pagination={{ pageSize: 20 }}
        />
      </Card>
    </div>
  );
};

export default OrderList;
