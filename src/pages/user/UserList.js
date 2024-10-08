import { Table, Card, Button } from "antd";
import UserService from "../../services/UserService";

const UserList = () => {
  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];
  return (
    <div>
      <Card
        extra={
          UserService.hasPermission("ADD_USER") && <Button>Create User</Button>
        }
      >
        <Table size="small" dataSource={dataSource} columns={columns} />
      </Card>
    </div>
  );
};

export default UserList;
