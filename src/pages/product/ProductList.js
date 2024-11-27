import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  deleteProduct,
  getProductList,
  updateProduct,
} from "../../store/actions/product/product";
import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Form,
  Input,
  message,
  Popconfirm,
  Select,
  Table,
} from "antd";
import dayjs from "dayjs";
import UserService from "../../services/UserService";
import { Controller, useForm } from "react-hook-form";
import DraggableModal from "../../components/modal/DraggableModal";

const ProductList = () => {
  const { control, handleSubmit, reset } = useForm();
  const [modal, setModal] = useState(false);
  const [product, setProduct] = useState();
  const dispatch = useDispatch();
  const { productList, isLoading } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProductList());
    if (product) {
      reset(product);
    }
  }, [dispatch, product, reset]);

  const handleOpenModal = (item) => {
    setModal(true);
    setProduct(item);
  };

  const handleModalClose = () => {
    setModal(false);
    setProduct({});
    reset({});
  };

  const onFinish = async (data) => {
    try {
      let res;
      if (product) {
        res = await dispatch(updateProduct(data));
      } else {
        res = await dispatch(createProduct(data));
      }
      if (res.payload.status === 200) {
        message.success(res.payload.data.message);
        handleModalClose();
        dispatch(getProductList());
      } else if (res.payload.status === 409) {
        message.error(res.payload.response.data.message);
      }
    } catch (e) {}
  };

  const handleDeleteProduct = async (id) => {
    try {
      let res = await dispatch(deleteProduct(id));
      if (res.payload.status === 200) {
        message.success(res.payload.data.message);
        dispatch(getProductList());
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

  const ActionComponent = ({ item, handleOpenModal, handleDeleteProduct }) => {
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
          onConfirm={() => handleDeleteProduct(item.id)}
        >
          <button title="Delete" className="btn btn-sm btn-outline-danger me-1">
            <i className="bi bi-trash" />
          </button>
        </Popconfirm>
      </div>
    );
  };

  const columns = [
    // {
    //   title: "ID",
    //   dataIndex: "id",
    //   key: "id",
    // },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
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
          handleOpenModal={handleOpenModal}
          handleDeleteProduct={handleDeleteProduct}
        />
      ),
    },
  ];

  return (
    <div>
      <Card
        size="small"
        extra={
          UserService.hasPermission("ADD_PRODUCT") && (
            <Button
              className="mt-1 mb-1"
              onClick={() => handleOpenModal()}
              type="primary"
            >
              Create Product
            </Button>
          )
        }
      >
        <Table
          size="small"
          loading={isLoading}
          dataSource={productList}
          scroll={{ x: 600 }}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>
      <DraggableModal
        title={product ? "Edit Product" : "Create Product"}
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
          <Form.Item label="Type" labelAlign="left">
            <Controller
              name="type"
              control={control}
              render={({ field, fieldState }) => (
                <Select
                  {...field}
                  className={
                    fieldState.invalid ? "custom-input error" : "custom-input"
                  }
                  options={[
                    { value: "", label: "-" },
                    { value: "kg", label: "kg" },
                    { value: "l", label: "l" },
                  ]}
                  placeholder="-"
                />
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

export default ProductList;
