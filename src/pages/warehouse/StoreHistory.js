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
import dayjs from "dayjs";
import UserService from "../../services/UserService";
import CustomTable from "../../components/table/CustomTable";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import DraggableModal from "../../components/modal/DraggableModal";
import { getProductList } from "../../store/actions/product/product";
import {
  createStoreProduct,
  deleteStoreHistoryProduct,
  editStoreProduct,
  getStoreHistoryProducts,
  updateStoreHistoryPaidStatus,
} from "../../store/actions/store/store";

const Store = () => {
  const { control, handleSubmit, reset, setValue } = useForm();
  const [modal, setModal] = useState(false);
  const [selectedProductType, setSelectedProductType] = useState("");
  const dispatch = useDispatch();
  const { storeHistoryProductList, isLoading } = useSelector(
    (state) => state.store
  );
  const { productList } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getStoreHistoryProducts());
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
      let res = await dispatch(createStoreProduct(data));
      if (res.payload.status === 200) {
        message.success(res.payload.data.message);
        handleModalClose();
        dispatch(getStoreHistoryProducts());
      } else if (res.payload.status === 409) {
        message.error(res.payload.response.data.message);
      }
    } catch (e) {}
  };

  const handleEditStoreProduct = async (data) => {
    try {
      let res = await dispatch(editStoreProduct(data));
      if (res.payload.status === 200) {
        message.success(res.payload.data.message);
        dispatch(getStoreHistoryProducts());
      } else if (res.payload.status === 409) {
        message.error(res.payload.response.data.message);
      }
    } catch (e) {}
  };

  const handleDeleteStoreProduct = async (id) => {
    try {
      let res = await dispatch(deleteStoreHistoryProduct(id));
      if (res.payload.status === 200) {
        message.success(res.payload.data.message);
        dispatch(getStoreHistoryProducts());
      } else if (res.payload.status === 409) {
        message.error(res.payload.response.data.message);
      }
    } catch (e) {}
  };

  const handleChangePaidStatus = async (data) => {
    console.log(data);
    const payload = {
      id: data.id,
      paid: !data.paid,
    };
    try {
      let res = await dispatch(updateStoreHistoryPaidStatus(payload));
      if (res.payload.status === 200) {
        message.success(res.payload.data.message);
        dispatch(getStoreHistoryProducts());
      } else if (res.payload.status === 409) {
        message.error(res.payload.response.data.message);
      }
    } catch (e) {
      message.error("Failed to update the paid status");
    }
  };

  const columns = [
    // {
    //   title: "ID",
    //   dataIndex: "id",
    //   key: "id",
    //   width: 100,
    // },
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
      searchable: true,
      width: 300,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      width: 300,
      editable: true,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: 300,
      editable: true,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      width: 150,
    },
    {
      title: "Paid",
      dataIndex: "paid",
      key: "paid",
      width: 150,
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
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 300,

      render: (createdAt) => dayjs(createdAt).format("MM-DD-YYYY hh:mm"),
    },
  ];

  return (
    <div>
      <Card
        size="small"
        extra={
          UserService.hasPermission("ADD_STORE_PRODUCT") && (
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
        <CustomTable
          loading={isLoading}
          data={storeHistoryProductList}
          columns={columns}
          scroll={{ x: 900 }}
          rowKey="id"
          onEdit={handleEditStoreProduct}
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
