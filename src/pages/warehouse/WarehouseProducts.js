import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Popconfirm,
  Row,
  Select,
  Table,
  message,
} from "antd";
import dayjs from "dayjs";
import UserService from "../../services/UserService";
import { useDispatch, useSelector } from "react-redux";
import {
  createWarehouseProduct,
  deleteWarehouseProduct,
  getWarehouseProducts,
  updateWarehouseProduct,
  addQuantity,
  subtractQuantity,
} from "../../store/actions/warehouse/warehouse";
import { useEffect, useState } from "react";
import DraggableModal from "../../components/modal/DraggableModal";
import { useForm, Controller } from "react-hook-form";
import { getProductList } from "../../store/actions/product/product";

const WarehouseProducts = () => {
  const { control, handleSubmit, reset, setValue } = useForm();
  const {
    control: quantityControl,
    handleSubmit: quantityHandleSubmit,
    reset: quantityReset,
  } = useForm();
  const [modal, setModal] = useState(false);
  const [quantityModal, setQuantityModal] = useState(false);
  const [product, setProduct] = useState();
  const [selectedProductType, setSelectedProductType] = useState("");
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.product);
  const { warehouseProductList, isLoading } = useSelector(
    (state) => state.warehouse
  );
  const [operationType, setOperationType] = useState("");
  const [productId, setProductId] = useState();

  useEffect(() => {
    dispatch(getWarehouseProducts());
    dispatch(getProductList());
    if (product) {
      reset(product);
    }
  }, [dispatch, reset, product]);

  const handleOpenModal = (item) => {
    setModal(true);
    setProduct(item);
    setSelectedProductType(item?.type || "");
  };

  const handleModalClose = () => {
    setModal(false);
    setProduct({});
    reset({});
    setSelectedProductType("");
  };

  const handleOpenQuantityModal = (id, operationType) => {
    setQuantityModal(true);
    setOperationType(operationType);
    setProductId(id);
  };

  const handleCloseQuantityModal = () => {
    setQuantityModal(false);
    quantityReset({});
  };

  const onFinish = async (data) => {
    try {
      let res;
      if (product) {
        res = await dispatch(updateWarehouseProduct(data));
      } else {
        res = await dispatch(createWarehouseProduct(data));
      }
      if (res.payload.status === 200) {
        message.success(res.payload.data.message);
        handleModalClose();
        dispatch(getWarehouseProducts());
        reset({});
      } else if (res.payload.status === 409) {
        message.error(res.payload.response.data.message);
      }
    } catch (e) {}
  };

  const handleDeleteProduct = async (id) => {
    try {
      let res = await dispatch(deleteWarehouseProduct(id));
      if (res.payload.status === 200) {
        message.success(res.payload.data.message);
        dispatch(getWarehouseProducts());
      } else if (res.payload.status === 409) {
        message.error(res.payload.response.data.message);
      }
    } catch (e) {}
  };

  const quantityOperations = async (data) => {
    try {
      let res;
      const payload = {
        id: productId,
        quantity: data.quantity,
      };
      console.log(payload);
      if (operationType === "add") {
        res = await dispatch(addQuantity(payload));
      } else if (operationType === "subtract") {
        res = await dispatch(subtractQuantity(payload));
      }

      if (res.payload.status === 200) {
        message.success(res.payload.data.message);
        handleCloseQuantityModal();
        dispatch(getWarehouseProducts());
      } else if (res.payload.status === 409) {
        message.error(res.payload.response.data.message);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const ActionComponent = ({
    item,
    handleOpenModal,
    handleOpenQuantityModal,
  }) => {
    return (
      <div>
        <button
          onClick={() => handleOpenQuantityModal(item.id, "add")}
          title="Add quantity"
          className="btn btn-sm btn-outline-primary me-1"
        >
          <i className="bi bi-plus-circle"></i>
        </button>
        <button
          onClick={() => handleOpenQuantityModal(item.id, "subtract")}
          title="Subtract quantity"
          className="btn btn-sm btn-outline-warning me-1"
        >
          <i className="bi bi-dash-circle"></i>
        </button>
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
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity) => (
        <span style={{ color: quantity < 0 ? "red" : "inherit" }}>
          {quantity}
        </span>
      ),
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
          handleOpenQuantityModal={handleOpenQuantityModal}
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
          UserService.hasPermission("ADD_WAREHOUSE_PRODUCT") && (
            <Button
              className="mt-1 mb-1"
              onClick={() => handleOpenModal()}
              type="primary"
            >
              Add Product
            </Button>
          )
        }
      >
        <Table
          size="small"
          loading={isLoading}
          dataSource={warehouseProductList}
          scroll={{ x: 600 }}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>
      <DraggableModal
        width={800}
        title={product ? "Edit Product" : "Add Product"}
        visible={modal}
        modalClose={handleModalClose}
      >
        <Form layout="vertical" onFinish={handleSubmit(onFinish)}>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item labelAlign="left" label="Product">
                <Controller
                  name="product"
                  control={control}
                  rules={{ required: "Product selection is required" }}
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
                          (option?.label ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        filterSort={(optionA, optionB) =>
                          (optionA?.label ?? "")
                            .toLowerCase()
                            .localeCompare((optionB?.label ?? "").toLowerCase())
                        }
                        status={fieldState.invalid ? "error" : ""}
                        options={productList.map((value) => ({
                          value: value.name,
                          label: value.name,
                        }))}
                        onChange={(value) => {
                          const selectedProduct = productList.find(
                            (p) => p.name === value
                          );
                          setSelectedProductType(selectedProduct?.type || "");
                          setValue("product", value);
                          setValue("type", selectedProduct?.type);
                        }}
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
              <Form.Item label="Quantity" labelAlign="left">
                <Controller
                  name="quantity"
                  control={control}
                  rules={{ required: "Quantity is required" }}
                  render={({ field, fieldState }) => (
                    <>
                      <Input
                        placeholder="Quantity"
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
              <Form.Item label="Type" labelAlign="left">
                <Controller
                  name="type"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Input
                      placeholder="Type"
                      {...field}
                      value={selectedProductType} // Automatically set type
                      status={fieldState.invalid ? "error" : ""}
                    />
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
      <DraggableModal
        visible={quantityModal}
        modalClose={handleCloseQuantityModal}
      >
        <Form
          layout="vertical"
          onFinish={quantityHandleSubmit(quantityOperations)}
        >
          <Form.Item>
            <Controller
              name="quantity"
              control={quantityControl}
              rules={{ required: "Quantity is required" }}
              render={({ field, fieldState }) => (
                <>
                  <Input
                    placeholder="Quantity"
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
            <Button className="me-1" onClick={handleCloseQuantityModal}>
              Cancel
            </Button>
            <Button htmlType="submit" type="primary">
              {operationType === "add" ? "Add" : "Subtract"}
            </Button>
          </div>
        </Form>
      </DraggableModal>
    </div>
  );
};

export default WarehouseProducts;
