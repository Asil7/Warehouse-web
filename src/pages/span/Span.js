import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Popconfirm,
  Row,
  Select,
  Table,
  message,
} from "antd";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  createSpan,
  deleteSpan,
  getSpanList,
  updateSpan,
} from "../../store/actions/span/span";
import UserService from "../../services/UserService";
import DraggableModal from "../../components/modal/DraggableModal";
import dayjs from "dayjs";
import { getUsersList } from "../../store/actions/user/user";

const Span = () => {
  const { control, handleSubmit, reset } = useForm();
  const [modal, setModal] = useState(false);
  const [span, setSpan] = useState();
  const dispatch = useDispatch();
  const { spanList, isLoading } = useSelector((state) => state.span);
  const { userList } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getSpanList());
    if (span) {
      reset(span);
    }
  }, [dispatch, span, reset]);

  useEffect(() => {
    dispatch(getUsersList());
  }, [dispatch]);

  const handleOpenModal = (item) => {
    setModal(true);
    setSpan(item);
  };

  const handleModalClose = () => {
    setModal(false);
    setSpan({});
    reset({});
  };

  const onFinish = async (data) => {
    try {
      let res;
      if (span) {
        res = await dispatch(updateSpan(data));
      } else {
        res = await dispatch(createSpan(data));
      }
      if (res.payload.status === 200) {
        message.success(res.payload.data.message);
        handleModalClose();
        dispatch(getSpanList());
      } else if (res.payload.status === 409) {
        message.error(res.payload.response.data.message);
      }
    } catch (e) {}
  };

  const handleDeleteSpan = async (id) => {
    try {
      let res = await dispatch(deleteSpan(id));
      if (res.payload.status === 200) {
        message.success(res.payload.data.message);
        dispatch(getSpanList());
      } else if (res.payload.status === 409) {
        message.error(res.payload.response.data.message);
      }
    } catch (e) {}
  };

  const ActionComponent = ({ item, handleDeleteSpan, handleOpenModal }) => {
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
          onConfirm={() => handleDeleteSpan(item.id)}
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
      title: "Reason",
      dataIndex: "reason",
      key: "reason",
      width: 700,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, item) => (
        <ActionComponent
          item={item}
          handleDeleteSpan={handleDeleteSpan}
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
          UserService.hasPermission("ADD_SPAN") && (
            <Button
              className="mt-1 mb-1"
              onClick={() => handleOpenModal()}
              type="primary"
            >
              Create Span
            </Button>
          )
        }
      >
        <Table
          size="small"
          loading={isLoading}
          dataSource={spanList}
          scroll={{ x: 1000 }}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>
      <DraggableModal
        width={800}
        title={span ? "Edit Span" : "Create Span"}
        visible={modal}
        modalClose={handleModalClose}
      >
        <Form layout="vertical" onFinish={handleSubmit(onFinish)}>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="Reason" labelAlign="left">
                <Controller
                  name="reason"
                  control={control}
                  rules={{ required: "Reason is required" }}
                  render={({ field, fieldState }) => (
                    <>
                      <Input
                        placeholder="Reason"
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
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="Price" labelAlign="left">
                <Controller
                  name="price"
                  control={control}
                  rules={{ required: "Price is required" }}
                  render={({ field, fieldState }) => (
                    <>
                      <Input
                        placeholder="Price"
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
            </Col>
            <Col span={8}>
              <Form.Item label="Username">
                <Controller
                  name="username"
                  control={control}
                  render={({ field, fieldState }) => (
                    <>
                      <Select
                        placeholder="--Choose--"
                        allowClear
                        {...field}
                        loading={isLoading}
                        showSearch
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          (option?.label ?? "").includes(input)
                        }
                        filterSort={(optionA, optionB) =>
                          (optionA?.label ?? "")
                            .toLowerCase()
                            .localeCompare((optionB?.label ?? "").toLowerCase())
                        }
                        status={fieldState.invalid ? "error" : ""}
                        options={userList.map((value) => ({
                          value: value.username,
                          label: value.username,
                        }))}
                      />
                    </>
                  )}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Date" labelAlign="left">
                <Controller
                  name="date"
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: "Date is required",
                    },
                  }}
                  render={({ field, fieldState }) => (
                    <>
                      <DatePicker
                        className="w-100"
                        {...field}
                        value={field.value ? dayjs(field.value) : null}
                        onChange={(date) =>
                          field.onChange(date ? date.toISOString() : null)
                        }
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
            </Col>
          </Row>
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

export default Span;
