import { Button, Card, Form, Input, Popconfirm, Table } from "antd";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getSpanList } from "../../store/actions/span/span";
import UserService from "../../services/UserService";
import DraggableModal from "../../components/modal/DraggableModal";

const Span = () => {
  const { control, handleSubmit, reset } = useForm();
  const [modal, setModal] = useState(false);
  const [span, setSpan] = useState();
  const dispatch = useDispatch();
  const { spanList, isLoading } = useSelector((state) => state.span);

  useEffect(() => {
    dispatch(getSpanList());
    if (span) {
      reset(span);
    }
  }, [dispatch, span, reset]);

  const handleOpenModal = (item) => {
    setModal(true);
    setSpan(item);
  };

  const handleModalClose = () => {
    setModal(false);
    setSpan({});
    reset({});
  };

  const onFinish = (data) => {
    console.log(data);
  };

  const ActionComponent = ({
    item,
    // handleDeletePermission,
    // handleOpenModal,
  }) => {
    return (
      <div>
        <button
          //   onClick={() => handleOpenModal(item)}
          title="Edit"
          className="btn btn-sm btn-outline-success me-1"
        >
          <i className="bi bi-pencil-square" />
        </button>
        <Popconfirm
          title="Are you sure to Delete"
          okText="Yes"
          cancelText="No"
          //   onConfirm={() => handleDeletePermission(item.id)}
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
      title: "Why",
      dataIndex: "why",
      key: "why",
      width: 700,
    },
    {
      title: "How Much",
      dataIndex: "howMuch",
      key: "howMuch",
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
          //   handleDeletePermission={handleDeletePermission}
          //   handleOpenModal={handleOpenModal}
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
        title={span ? "Edit Span" : "Create Span"}
        visible={modal}
        modalClose={handleModalClose}
      >
        <Form onFinish={handleSubmit(onFinish)}>
          <Form.Item label="Why" labelAlign="left">
            <Controller
              name="why"
              control={control}
              rules={{ required: "Why is required" }}
              render={({ field, fieldState }) => (
                <>
                  <Input
                    placeholder="Why"
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

export default Span;
