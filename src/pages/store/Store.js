import {
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  Input,
  message,
  Popconfirm,
  Row,
  Select,
} from "antd";
import CustomTable from "../../components/table/CustomTable";
import { useDispatch, useSelector } from "react-redux";
import {
  addStoreProduct,
  deleteStoreProduct,
  getProductFromWarehouse,
  getStoreProducts,
  updateStorePaidStatus,
  updateStoreProduct,
  updateStoreReceivedStatus,
} from "../../store/actions/store/store";
import { useEffect, useState } from "react";
import DraggableModal from "../../components/modal/DraggableModal";
import { useForm, Controller } from "react-hook-form";
import { getProductList } from "../../store/actions/product/product";
import { createStyles } from "antd-style";

const useStyle = createStyles(({ css }) => ({
  primaryButton: css`
    color: #fff;
    cursor: pointer;

    > span {
      position: relative;
      z-index: 1;
      color: #fff;
    }

    &::before {
      color: #fff;
      content: "";
      background: linear-gradient(135deg, #6253e1, #04befe);
      position: absolute;
      inset: 0;
      opacity: 1;
      border-radius: inherit;
    }

    &:hover::before {
      color: #fff;
      background: linear-gradient(135deg, #4939da, #006cdf);
    }
  `,
}));

const Store = () => {
  const [modal, setModal] = useState(false);
  const [selectedProductType, setSelectedProductType] = useState("");
  const { control, handleSubmit, reset, setValue } = useForm();
  const dispatch = useDispatch();
  const { storeProductList, isLoading } = useSelector((state) => state.store);
  const { productList } = useSelector((state) => state.product);
  const { styles } = useStyle();

  useEffect(() => {
    dispatch(getStoreProducts());
    dispatch(getProductList());
  }, [dispatch]);

  const handleOpenModal = (item) => {
    setModal(true);
  };

  const handleModalClose = () => {
    setModal(false);
    reset({});
  };

  const onFinish = async (data) => {
    try {
      let res = await dispatch(addStoreProduct(data));
      if (res.payload.status === 200) {
        message.success(res.payload.data.message);
        handleModalClose();
        dispatch(getStoreProducts());
      } else if (res.payload.status === 409) {
        message.error(res.payload.response.data.message);
      }
    } catch (error) {
      message.error(error.message, 6);
    }
  };

  const handleUpdateProduct = async (data) => {
    try {
      const payload = {
        id: data.id,
        product: data.product,
        quantity: data.quantity,
        price: data.price,
        type: data.type,
      };
      let res = await dispatch(updateStoreProduct(payload));
      if (res.payload.status === 200) {
        message.success(res.payload.data.message);
        handleModalClose();
        dispatch(getStoreProducts());
      } else if (res.payload.status === 409) {
        message.error(res.payload.response.data.message);
      }
    } catch (error) {
      message.error(error.message, 6);
    }
  };

  const handleChangeReceivedStatus = async (data) => {
    try {
      const payload = { ...data, received: !data.received };
      let res = await dispatch(updateStoreReceivedStatus(payload));
      if (res.payload.status === 200) {
        message.success(res.payload.data.message);
        dispatch(getStoreProducts());
      } else if (res.payload.status === 409) {
        message.error(res.payload.response.data.message);
      }
    } catch (error) {
      message.error(error.message, 6);
    }
  };

  const handleChangePaidStatus = async (data) => {
    console.log(data);
    const payload = {
      id: data.id,
      paid: !data.paid,
    };
    try {
      let res = await dispatch(updateStorePaidStatus(payload));
      if (res.payload.status === 200) {
        message.success(res.payload.data.message);
        dispatch(getStoreProducts());
      } else if (res.payload.status === 409) {
        message.error(res.payload.response.data.message);
      }
    } catch (e) {
      message.error("Failed to update the paid status");
    }
  };

  const handleGetProductsFromWarehouse = async () => {
    try {
      let res = await dispatch(getProductFromWarehouse());
      if (res.payload.status === 200) {
        message.success(res.payload.data.message);
        dispatch(getStoreProducts());
      } else if (res.payload.status === 409) {
        message.error(res.payload.response.data.message);
      }
    } catch (error) {
      message.error(error.message, 5);
    }
  };

  const handleDeleteStoreProduct = async (id) => {
    try {
      let res = await dispatch(deleteStoreProduct(id));
      if (res.payload.status === 200) {
        message.success(res.payload.data.message);
        dispatch(getStoreProducts());
      } else if (res.payload.status === 409) {
        message.error(res.payload.response.data.message);
      }
    } catch (e) {}
  };

  const columns = [
    {
      // title: "Received",
      dataIndex: "received",
      key: "received",
      width: 50,
      render: (received, record) => (
        <Popconfirm
          title="Mark as received?"
          onConfirm={() => handleChangeReceivedStatus(record)}
          okText="Yes"
          cancelText="No"
        >
          <Checkbox checked={received} onChange={(e) => e.preventDefault()} />
        </Popconfirm>
      ),
    },
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
      width: 350,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      editable: true,
      width: 250,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      editable: true,
      width: 250,
    },
    {
      title: "Paid",
      dataIndex: "paid",
      key: "paid",
      width: 250,
      render: (paid, record) => (
        <Popconfirm
          title="Mark as paid?"
          onConfirm={() => handleChangePaidStatus(record)}
          okText="Yes"
          cancelText="No"
        >
          <Checkbox checked={paid} onChange={(e) => e.preventDefault()} />
        </Popconfirm>
      ),
    },
  ];
  return (
    <div>
      <Card
        title={
          <Popconfirm
            okText="Yes"
            cancelText="No"
            title="Getting products will erase changes. Continue?"
            onConfirm={handleGetProductsFromWarehouse}
          >
            <Button className={styles.primaryButton}>
              Get Products from Warehouse
            </Button>
          </Popconfirm>
        }
        size="small"
        extra={
          <Button onClick={() => handleOpenModal()} type="primary">
            Add Product
          </Button>
        }
      >
        <CustomTable
          loading={isLoading}
          data={storeProductList}
          columns={columns}
          scroll={{ x: 300 }}
          rowKey="id"
          onEdit={handleUpdateProduct}
          onDelete={handleDeleteStoreProduct}
        />
      </Card>
      <DraggableModal
        width={900}
        title={"Add Product"}
        visible={modal}
        modalClose={handleModalClose}
      >
        <Form layout="vertical" onFinish={handleSubmit(onFinish)}>
          <Row gutter={16}>
            <Col xs={24} sm={12} md={6} lg={6} xl={6} xxl={6}>
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
            <Col xs={24} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <Form.Item label="Quantity" labelAlign="left">
                <Controller
                  name="quantity"
                  control={control}
                  rules={{ required: "Quantity is required" }}
                  render={({ field, fieldState }) => (
                    <>
                      <Input
                        autoComplete="off"
                        type="number"
                        allowClear
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
            <Col xs={24} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <Form.Item label="Price" labelAlign="left">
                <Controller
                  name="price"
                  control={control}
                  rules={{ required: "Price is required" }}
                  render={({ field, fieldState }) => (
                    <>
                      <Input
                        autoComplete="off"
                        type="number"
                        allowClear
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
            <Col xs={24} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <Form.Item label="Type" labelAlign="left">
                <Controller
                  name="type"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Input
                      readOnly
                      autoComplete="off"
                      placeholder="Type"
                      {...field}
                      value={selectedProductType}
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
    </div>
  );
};

export default Store;
