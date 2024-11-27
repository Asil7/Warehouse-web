import { Button, Card, Col, Form, Input, message, Row, Select } from "antd";
import dayjs from "dayjs";
import UserService from "../../services/UserService";
import CustomTable from "../../components/table/CustomTable";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  createProductReceipt,
  deleteReceivedProduct,
  editReceivedProduct,
  getReceivedProducts,
} from "../../store/actions/product/productReceipt";
import { useForm, Controller } from "react-hook-form";
import DraggableModal from "../../components/modal/DraggableModal";
import { getProductList } from "../../store/actions/product/product";

const ProductReceipt = () => {
  const { control, handleSubmit, reset, setValue } = useForm();
  const [modal, setModal] = useState(false);
  const [selectedProductType, setSelectedProductType] = useState("");
  const dispatch = useDispatch();
  const { receivedProductList, isLoading } = useSelector(
    (state) => state.productReceipt
  );
  const { productList } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getReceivedProducts());
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
      let res = await dispatch(createProductReceipt(data));
      if (res.payload.status === 200) {
        message.success(res.payload.data.message);
        handleModalClose();
        dispatch(getReceivedProducts());
      } else if (res.payload.status === 409) {
        message.error(res.payload.response.data.message);
      }
    } catch (e) {}
  };

  const handleEditReceivedProduct = async (data) => {
    try {
      let res = await dispatch(editReceivedProduct(data));
      if (res.payload.status === 200) {
        message.success(res.payload.data.message);
        dispatch(getReceivedProducts());
      } else if (res.payload.status === 409) {
        message.error(res.payload.response.data.message);
      }
    } catch (e) {}
  };

  const handleDeleteReceivedProduct = async (id) => {
    try {
      let res = await dispatch(deleteReceivedProduct(id));
      if (res.payload.status === 200) {
        message.success(res.payload.data.message);
        dispatch(getReceivedProducts());
      } else if (res.payload.status === 409) {
        message.error(res.payload.response.data.message);
      }
    } catch (e) {}
  };

  const columns = [
    // {
    //   title: "ID",
    //   dataIndex: "id",
    //   key: "id",
    //   width: 150,
    // },
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
      searchable: true,
      width: 250,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      width: 200,
      editable: true,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: 200,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      width: 150,
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
          UserService.hasPermission("ADD_PRODUCT_RECEIPT") && (
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
          data={receivedProductList}
          columns={columns}
          scroll={{ x: 750 }}
          rowKey="id"
          onEdit={handleEditReceivedProduct}
          onDelete={handleDeleteReceivedProduct}
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

export default ProductReceipt;
