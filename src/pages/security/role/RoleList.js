import { Button, Card, Popconfirm, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { getRoleList } from "../../../store/actions/role/role";
import { useEffect } from "react";
import UserService from "../../../services/UserService";

const RoleList = () => {
  const dispatch = useDispatch();
  const { roleList, isLoading } = useSelector((state) => state.role);

  useEffect(() => {
    dispatch(getRoleList());
  }, [dispatch]);

  const ActionComponent = ({
    item,
    // handleDeletePermission,
    // handleOpenModal,
  }) => {
    return (
      <div>
        <button
          // onClick={() => handleOpenModal(item)}
          title="Edit"
          className="btn btn-sm btn-outline-success me-1"
        >
          <i className="bi bi-pencil-square" />
        </button>
        <Popconfirm
          title="Are you sure to Delete"
          okText="Yes"
          cancelText="No"
          // onConfirm={() => handleDeletePermission(item.id)}
        >
          <button title="Delete" className="btn btn-sm btn-outline-danger me-1">
            <i className="bi bi-trash" />
          </button>
        </Popconfirm>
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
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
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
      render: (_, item) => (
        <ActionComponent
          item={item}
          // handleDeletePermission={handleDeletePermission}
          // handleOpenModal={handleOpenModal}
        />
      ),
    },
  ];
  return (
    <div>
      <Card
        extra={
          UserService.hasPermission("ADD_ROLE") && (
            <Button type="primary">Create Role</Button>
          )
        }
      >
        <Table
          size="small"
          loading={isLoading}
          dataSource={roleList}
          columns={columns}
          rowKey="id"
        />
      </Card>
    </div>
  );
};

export default RoleList;
