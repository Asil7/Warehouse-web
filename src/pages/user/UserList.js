import {
  Table,
  Card,
  Button,
  message,
  Popconfirm,
  Form,
  Input,
  Radio,
  Tag,
} from "antd";
import UserService from "../../services/UserService";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  deleteUser,
  getUsersList,
  updateUserPassword,
  updateUserStatus,
} from "../../store/actions/user/user";
import { Link } from "react-router-dom";
import DraggableModal from "../../components/modal/DraggableModal";
import { Controller, useForm } from "react-hook-form";
import { LockFilled } from "@ant-design/icons";
import UserSalaryModal from "./UserSalaryModal";

const UserList = () => {
  const dispatch = useDispatch();
  const [userDetail, setUserDetail] = useState();
  const [salaryModal, setSalaryModal] = useState(false);
  const { userList, isLoading } = useSelector((state) => state.user);
  const [user, setUser] = useState();
  const [password, setPassword] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [passwordModal, setPasswordModal] = useState(false);
  const { control, handleSubmit, reset, register, watch } = useForm();
  const {
    control: passwordControl,
    handleSubmit: passwordHandleSubmit,
    reset: passwordReset,
  } = useForm();
  const status = watch("status");

  useEffect(() => {
    dispatch(getUsersList());
  }, [dispatch]);

  useEffect(() => {
    reset(user);
    passwordReset(password);
  }, [reset, user, passwordReset, password]);

  const ActionComponent = ({
    item,
    handleDeleteUser,
    handleOpenModal,
    handleOpenSalaryModal,
  }) => {
    return (
      <div>
        {item.dateOfEmployment && (
          <button
            onClick={() => handleOpenSalaryModal(item)}
            title="Salary"
            className="btn btn-sm btn-outline-info me-1"
          >
            <i className="bi bi-cash-stack"></i>
          </button>
        )}
        <Link to={`/user-span/${item.username}`}>
          <button
            title="User span"
            className="btn btn-sm btn-outline-secondary me-1"
          >
            <i className="bi bi-graph-down-arrow" />
          </button>
        </Link>
        <Link to={`/user-form/${item.id}`}>
          <button title="Edit" className="btn btn-sm btn-outline-success me-1">
            <i className="bi bi-pencil-square" />
          </button>
        </Link>
        <button
          onClick={() => handleOpenModal(item)}
          title="Change Status"
          className="btn btn-sm btn-outline-warning me-1"
        >
          <i className="bi bi-tag" />
        </button>
        <button
          onClick={() => handleOpenModalPassword(item)}
          title="Change Password"
          className="btn btn-sm btn-outline-primary me-1"
        >
          <LockFilled />
        </button>
        <Popconfirm
          title="Are you sure to Delete"
          okText="Yes"
          cancelText="No"
          onConfirm={() => handleDeleteUser(item.id)}
        >
          <button title="Delete" className="btn btn-sm btn-outline-danger me-1">
            <i className="bi bi-trash" />
          </button>
        </Popconfirm>
      </div>
    );
  };

  const handleDeleteUser = async (id) => {
    let res = await dispatch(deleteUser(id));
    if (res.payload.status === 200) {
      message.success(res.payload.data.message);
      dispatch(getUsersList());
    } else if (res.payload.status === 409) {
      message.error(res.payload.response.data.message);
    }
  };

  const handleOpenSalaryModal = (item) => {
    setSalaryModal(true);
    setUserDetail(item);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    reset({});
  };

  const handleOpenModal = (item) => {
    setModalVisible(true);
    setUser(item);
  };

  const handlePasswordModalClose = () => {
    setPasswordModal(false);
    passwordReset({});
  };

  const handleOpenModalPassword = (item) => {
    setPasswordModal(true);
    setPassword(item);
  };

  const handleUpdateStatus = async (data) => {
    try {
      const payload = {
        id: data.id,
        status: data.new_status,
      };
      let res = await dispatch(updateUserStatus(payload));
      if (res.payload.status === 200) {
        message.success(res.payload.data.message);
        dispatch(getUsersList());
        handleModalClose();
      } else if (res.payload.status === 409) {
        message.error(res.payload.response.data.message);
      }
    } catch (e) {}
  };

  const handleUpdatePassword = async (data) => {
    try {
      const payload = {
        id: data.id,
        password: data.password,
      };
      let res = await dispatch(updateUserPassword(payload));
      if (res.payload.status === 200) {
        message.success(res.payload.data.message);
        dispatch(getUsersList());
        handlePasswordModalClose();
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
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Salary",
      dataIndex: "salary",
      key: "salary",
      render: (text) => new Intl.NumberFormat("en-US").format(text),
    },
    {
      title: "Date of Employment",
      dataIndex: "dateOfEmployment",
      key: "dateOfEmployment",
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
      render: (status) => {
        let color = status === "ACTIVE" ? "green" : "red";
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    // {
    //   title: "Created At",
    //   dataIndex: "createdAt",
    //   key: "createdAt",
    //   render: (createdAt) => dayjs(createdAt).format("MM-DD-YYYY hh:mm"),
    // },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, item) => (
        <ActionComponent
          item={item}
          handleDeleteUser={handleDeleteUser}
          handleOpenModal={handleOpenModal}
          handleOpenSalaryModal={handleOpenSalaryModal}
        />
      ),
    },
  ];

  return (
    <div>
      <Card
        size="small"
        extra={
          UserService.hasPermission("ADD_USER") && (
            <Link to={"/user-form"}>
              <Button type="primary">Create User</Button>
            </Link>
          )
        }
      >
        <Table
          loading={isLoading}
          scroll={{ x: 1200 }}
          size="small"
          dataSource={userList}
          columns={columns}
          rowKey="id"
        />
      </Card>
      {salaryModal && (
        <UserSalaryModal
          salaryModal={salaryModal}
          setSalaryModal={setSalaryModal}
          userDetail={userDetail}
        />
      )}
      <DraggableModal
        title="Change Status"
        visible={modalVisible}
        modalClose={handleModalClose}
      >
        <div>
          <Form {...layout} onFinish={handleSubmit(handleUpdateStatus)}>
            <Form.Item label="Username" labelAlign="left">
              <Controller
                name="username"
                control={control}
                disabled={true}
                render={({ field, fieldState }) => (
                  <Input
                    {...field}
                    className={
                      fieldState.invalid ? "custom-input error" : "custom-input"
                    }
                  />
                )}
              />
            </Form.Item>
            <Form.Item label="New" labelAlign="left">
              {(status === "ACTIVE" && (
                <>
                  <Radio.Group {...register("new_status")}>
                    <Radio value="INACTIVE" id="field-inactive">
                      INACTIVE
                    </Radio>
                  </Radio.Group>
                </>
              )) ||
                (status === "INACTIVE" && (
                  <>
                    <Radio.Group {...register("new_status")}>
                      <Radio value="ACTIVE" id="field-inactive">
                        ACTIVE
                      </Radio>
                    </Radio.Group>
                  </>
                ))}
            </Form.Item>
            <div className="text-end">
              <Button onClick={handleModalClose} className="me-1">
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                Change
              </Button>
            </div>
          </Form>
        </div>
      </DraggableModal>
      <DraggableModal
        title="Update Password"
        visible={passwordModal}
        modalClose={handlePasswordModalClose}
      >
        <div>
          <Form
            {...layout}
            onFinish={passwordHandleSubmit(handleUpdatePassword)}
          >
            <Form.Item label="Password" labelAlign="left">
              <Controller
                name="password"
                control={passwordControl}
                rules={{ required: "Password is required" }}
                render={({ field, fieldState }) => (
                  <>
                    <Input.Password
                      placeholder="Password"
                      {...field}
                      className={
                        fieldState.invalid
                          ? "custom-input error"
                          : "custom-input"
                      }
                    />
                    {fieldState.invalid && (
                      <div className="position-fixed text-danger">
                        {fieldState.error.message}
                      </div>
                    )}
                  </>
                )}
              />
            </Form.Item>

            <div className="text-end">
              <Button onClick={handlePasswordModalClose} className="me-1">
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </div>
          </Form>
        </div>
      </DraggableModal>
    </div>
  );
};

export default UserList;
