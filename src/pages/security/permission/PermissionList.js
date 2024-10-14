import { Button, Card, Form, Input, message, Popconfirm, Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import {
  createPermission,
  updatePermission,
  getPermissionList,
  deletePermission,
} from "../../../store/actions/permission/permission";
import UserService from "../../../services/UserService";
import DraggableModal from "../../../components/modal/DraggableModal";
import { Controller, useForm } from "react-hook-form";

const PermissionList = () => {
  const { control, handleSubmit, reset } = useForm();
  const [modal, setModal] = useState(false);
  const [permission, setPermission] = useState();
  const dispatch = useDispatch();
  const { permissionList, isLoading } = useSelector(
    (state) => state.permission
  );

  useEffect(() => {
    dispatch(getPermissionList());
    if (permission) {
      reset(permission);
    }
  }, [dispatch, permission, reset]);

  const handleOpenModal = (item) => {
    setModal(true);
    setPermission(item);
  };

  const handleModalClose = () => {
    setModal(false);
    setPermission({});
    reset({});
  };

  const onFinish = async (data) => {
    try {
      let res;
      if (permission) {
        res = await dispatch(updatePermission(data));
      } else {
        res = await dispatch(createPermission(data));
      }
      if (res.payload.status === 200) {
        message.success(res.payload.data.message);
        handleModalClose();
        dispatch(getPermissionList());
      } else if (res.payload.status === 409) {
        message.error(res.payload.response.data.message);
      }
    } catch (e) {}
  };

  const handleDeletePermission = async (id) => {
    try {
      let res = await dispatch(deletePermission(id));
      if (res.payload.status === 200) {
        message.success(res.payload.data.message);
        dispatch(getPermissionList());
      } else if (res.payload.status === 409) {
        message.error(res.payload.response.data.message);
      }
    } catch (e) {}
  };

  const layout = {
    labelCol: {
      span: 6,
    },
  };

  const ActionComponent = ({
    item,
    handleDeletePermission,
    handleOpenModal,
  }) => {
    return (
      <div>
        <button
          onClick={() => handleOpenModal(item)}
          title="Edit"
          className="btn btn-sm btn-outline-success me-1"
        >
          <i className="bi bi-pencil-square" />
        </button>
        <Popconfirm
          title="Are you sure to Delete"
          okText="Yes"
          cancelText="No"
          onConfirm={() => handleDeletePermission(item.id)}
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
          handleDeletePermission={handleDeletePermission}
          handleOpenModal={handleOpenModal}
        />
      ),
    },
  ];

  return (
    <div>
      <Card
        size="small"
        extra={
          UserService.hasPermission("ADD_PERMISSION") && (
            <Button
              className="mt-1 mb-1"
              onClick={() => handleOpenModal()}
              type="primary"
            >
              Create Permission
            </Button>
          )
        }
      >
        <Table
          size="small"
          loading={isLoading}
          dataSource={permissionList}
          scroll={{ x: 1000 }}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>
      <DraggableModal
        title={permission ? "Edit Permission" : "Create Permission"}
        visible={modal}
        modalClose={handleModalClose}
      >
        <Form {...layout} onFinish={handleSubmit(onFinish)}>
          <Form.Item label="Name" labelAlign="left">
            <Controller
              name="name"
              control={control}
              rules={{ required: "Name is required" }}
              render={({ field, fieldState }) => (
                <>
                  <Input
                    placeholder="Name"
                    {...field}
                    status={fieldState.invalid ? "error" : ""}
                  />
                  {fieldState.invalid && (
                    <div className="position-fixed text-danger">
                      {fieldState.error?.message}
                    </div>
                  )}
                </>
              )}
            />
          </Form.Item>
          <Form.Item label="Description" labelAlign="left">
            <Controller
              name="description"
              control={control}
              rules={{ required: "Description is required" }}
              render={({ field, fieldState }) => (
                <>
                  <Input
                    placeholder="Description"
                    {...field}
                    status={fieldState.invalid ? "error" : ""}
                  />
                  {fieldState.invalid && (
                    <div className="position-fixed text-danger">
                      {fieldState.error?.message}
                    </div>
                  )}
                </>
              )}
            />
          </Form.Item>
          <div className="text-end">
            <Button className="me-1" onClick={handleModalClose}>
              Cancel
            </Button>
            <Button htmlType="submit" type="primary">
              Save
            </Button>
          </div>
        </Form>
      </DraggableModal>
    </div>
  );
};

export default PermissionList;
