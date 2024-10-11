import { Button, Card, Form, Input, message, Popconfirm, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import {
  deleteRole,
  getRoleList,
  updateRole,
} from "../../../store/actions/role/role";
import { useEffect, useState } from "react";
import UserService from "../../../services/UserService";
import { Link } from "react-router-dom";
import DraggableModal from "../../../components/modal/DraggableModal";
import { Controller, useForm } from "react-hook-form";

const RoleList = () => {
  const dispatch = useDispatch();
  const { roleList, isLoading } = useSelector((state) => state.role);
  const { control, handleSubmit, reset } = useForm();
  const [role, setRole] = useState();
  const [modal, setModal] = useState(false);

  useEffect(() => {
    dispatch(getRoleList());
    if (role) {
      reset(role);
    }
  }, [dispatch, reset, role]);

  useEffect(() => {});

  const ActionComponent = ({ item, handleDeleteRole, handleOpenModal }) => {
    return (
      <div>
        <button
          onClick={() => handleOpenModal(item)}
          title="Edit"
          className="btn btn-sm btn-outline-success me-1"
        >
          <i className="bi bi-pencil-square" />
        </button>
        <Link to={`/role-permission/${item.id}`}>
          <button
            title="Permissions"
            className="btn btn-sm btn-outline-primary me-1"
          >
            <i className="bi bi-link-45deg" />
          </button>
        </Link>
        <Popconfirm
          title="Are you sure to Delete"
          okText="Yes"
          cancelText="No"
          onConfirm={() => handleDeleteRole(item.id)}
        >
          <button title="Delete" className="btn btn-sm btn-outline-danger me-1">
            <i className="bi bi-trash" />
          </button>
        </Popconfirm>
      </div>
    );
  };

  const handleDeleteRole = async (roleId) => {
    try {
      let res = await dispatch(deleteRole(roleId));
      if (res.payload.status === 200) {
        dispatch(getRoleList());
        message.success(res.payload.data.message);
      } else if (res.payload.status === 409) {
        message.error(res.payload.response.data.message);
      }
    } catch (e) {}
  };

  const handleOpenModal = (item) => {
    setModal(true);
    setRole(item);
  };

  const handleCloseModal = () => {
    setModal(false);
  };

  const onFinish = async (data) => {
    try {
      let res = await dispatch(updateRole(data));
      if (res.payload.status === 200) {
        dispatch(getRoleList());
        message.success(res.payload.data.message);
        handleCloseModal();
      } else if (res.payload.status === 409) {
        message.error(res.payload.response.data.message);
      }
    } catch (e) {}
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
          handleDeleteRole={handleDeleteRole}
          handleOpenModal={handleOpenModal}
        />
      ),
    },
  ];

  const layout = {
    labelCol: {
      span: 6,
    },
  };

  return (
    <div>
      <Card
        size="small"
        extra={
          UserService.hasPermission("ADD_ROLE") && (
            <Link to={"/role-form"}>
              <Button className="mt-1 mb-1" type="primary">
                Create Role
              </Button>
            </Link>
          )
        }
      >
        <Table
          size="small"
          loading={isLoading}
          dataSource={roleList}
          scroll={{ x: 1200 }}
          columns={columns}
          rowKey="id"
        />
      </Card>
      <DraggableModal
        title="Edit Role"
        visible={modal}
        modalClose={handleCloseModal}
      >
        <Form {...layout} onFinish={handleSubmit(onFinish)}>
          <Form.Item
            label="Name"
            labelAlign="left"
            rules={[{ required: true, message: "Please input the name!" }]}
          >
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState }) => (
                <Input {...field} status={fieldState.invalid ? "error" : ""} />
              )}
            />
          </Form.Item>
          <Form.Item
            label="Description"
            labelAlign="left"
            rules={[
              { required: true, message: "Please input the description!" },
            ]}
          >
            <Controller
              name="description"
              control={control}
              render={({ field, fieldState }) => (
                <Input {...field} status={fieldState.invalid ? "error" : ""} />
              )}
            />
          </Form.Item>
          <div className="text-end">
            <Button className="me-1" onClick={handleCloseModal}>
              Close
            </Button>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </div>
        </Form>
      </DraggableModal>
    </div>
  );
};

export default RoleList;
