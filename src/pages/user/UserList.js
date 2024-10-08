import { Table, Card, Button } from "antd";
import UserService from "../../services/UserService";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUsersList } from "../../store/actions/user/user";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

const UserList = () => {
  const dispatch = useDispatch();
  const { userList } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUsersList());
  }, [dispatch]);

  const ActionComponent = () => {
    return (
      <div>
        <button title="Edit" className="btn btn-sm btn-outline-success me-1">
          <i className="bi bi-pencil-square" />
        </button>
        <button
          title="Change Status"
          className="btn btn-sm btn-outline-warning me-1"
        >
          <i className="bi bi-tag" />
        </button>
        <button title="Delete" className="btn btn-sm btn-outline-danger me-1">
          <i className="bi bi-trash" />
        </button>
      </div>
    );
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Role",
      dataIndex: "roleName",
      key: "roleName",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => dayjs(createdAt).format("MM-DD-YYYY hh:mm"),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, item) => <ActionComponent />,
    },
  ];

  return (
    <div>
      <Card
        extra={
          UserService.hasPermission("ADD_USER") && (
            <Link to={"/user-form"}>
              <Button type="primary">Create User</Button>
            </Link>
          )
        }
      >
        <Table
          scroll={{ x: 800 }}
          size="small"
          dataSource={userList}
          columns={columns}
        />
      </Card>
    </div>
  );
};

export default UserList;
