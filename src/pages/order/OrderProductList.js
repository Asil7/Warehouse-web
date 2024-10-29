import {
  Card,
  Row,
  Col,
  Button,
  message,
  Form,
  Space,
  Select,
  Input,
} from "antd";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createOrderProduct,
  deleteOrderProduct,
  editOrderProduct,
  getOrderById,
  getOrderProductList,
} from "../../store/actions/order/order";
import { useParams } from "react-router-dom";
import { PrinterOutlined } from "@ant-design/icons";
import CustomTable from "../../components/table/CustomTable";
import DraggableModal from "../../components/modal/DraggableModal";
import { Controller, useForm, useFieldArray, useWatch } from "react-hook-form";
import { getWarehouseProducts } from "../../store/actions/warehouse/warehouse";
import UserService from "../../services/UserService";

const OrderProductList = () => {
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  const { control, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      productList: [{ product: "", quantity: "", type: "", totalWeight: "" }],
    },
  });
  const { orderProductList, orderById, isLoading } = useSelector(
    (state) => state.order
  );
  const { id } = useParams();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "productList",
  });

  const watchedProducts = useWatch({
    control,
    name: "productList",
  });

  const { warehouseProductList } = useSelector((state) => state.warehouse);

  const previousProductsRef = useRef([]);
  const productSelectRefs = useRef([]);

  useEffect(() => {
    if (watchedProducts && Array.isArray(watchedProducts)) {
      watchedProducts.forEach((item, index) => {
        const selectedProduct = warehouseProductList.find(
          (product) => product.product === item.product
        );

        if (
          selectedProduct &&
          previousProductsRef.current[index] !== item.product
        ) {
          setValue(`productList[${index}].type`, selectedProduct.type || "");
          setValue(
            `productList[${index}].totalWeight`,
            selectedProduct.quantity || ""
          );
        }

        previousProductsRef.current[index] = item.product;
      });
    }
  }, [watchedProducts, warehouseProductList, setValue]);

  useEffect(() => {
    dispatch(getWarehouseProducts());
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      dispatch(getOrderProductList(id));
      dispatch(getOrderById(id));
    }
  }, [dispatch, id]);

  const handleOpenModal = () => {
    setModal(true);
  };

  const handleCloseModal = useCallback(() => {
    setModal(false);
    reset({
      productList: [{ product: "", quantity: "", type: "", totalWeight: "" }],
    });
  }, [reset]);

  const handleEditOrderProduct = async (data) => {
    try {
      let res = await dispatch(editOrderProduct(data));
      if (res.payload.status === 200) {
        message.success(res.payload.data.message);
        dispatch(getOrderProductList(id));
      } else if (res.payload.status === 409) {
        message.error(res.payload.response.data.message);
      }
    } catch (e) {}
  };

  const handleDeleteOrderProduct = async (productId) => {
    try {
      let res = await dispatch(deleteOrderProduct(productId));
      if (res.payload.status === 200) {
        message.success(res.payload.data.message);
        dispatch(getOrderProductList(id));
      } else if (res.payload.status === 409) {
        message.error(res.payload.response.data.message);
      }
    } catch (e) {}
  };

  const onQuantityKeyDown = (index) => (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      if (productSelectRefs.current[index + 1]) {
        productSelectRefs.current[index + 1].focus();
      }
    }
  };

  const onSubmit = useCallback(
    async (data) => {
      data = { productList: data.productList, orderId: orderById?.id };
      console.log(data);
      try {
        let res = await dispatch(createOrderProduct(data));
        if (res.payload.status === 200) {
          handleCloseModal();
          dispatch(getOrderProductList(id));
          reset({});
          message.success(res.payload.data.message);
        } else if (res.payload.status === 409) {
          message.error(res.payload.response.data.message);
        }
      } catch (error) {}
    },
    [dispatch, reset, orderById.id, handleCloseModal, id]
  );

  const items = [
    { label: "Company", value: orderById.company },
    { label: "Phone", value: orderById.phone },
    { label: "Total Weight", value: orderById.totalWeight },
    { label: "Location", value: orderById.location },
  ];

  const columns = [
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
      width: 400,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      editable: true,
      width: 400,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      width: 400,
    },
  ];

  const printCard = () => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Order</title>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/4.21.5/antd.min.css" />
          <style>
            body { font-family: Arial, sans-serif; }
            .print-card { padding: 20px; }
            h2 { text-align: center; }
          </style>
        </head>
        <body>
          <div class="print-card">
            <h2>Order Details</h2>
            <div>
              ${items
                .map(
                  (item) =>
                    `<strong>${item.label}:</strong> ${item.value}<br />`
                )
                .join("")}
            </div>
            <h3>Product List</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr>
                  <th style="border: 1px solid black; padding: 8px;">Product</th>
                  <th style="border: 1px solid black; padding: 8px;">Quantity</th>
                  <th style="border: 1px solid black; padding: 8px;">Type</th>
                </tr>
              </thead>
              <tbody>
                ${orderProductList
                  .map(
                    (item) => `
                  <tr>
                    <td style="border: 1px solid black; padding: 8px;">${item.product}</td>
                    <td style="border: 1px solid black; padding: 8px;">${item.quantity}</td>
                    <td style="border: 1px solid black; padding: 8px;">${item.type}</td>
                  </tr>
                `
                  )
                  .join("")}
              </tbody>
            </table>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "+") {
        append({
          product: "",
          quantity: "",
          type: "",
          totalWeight: "",
        });
        e.preventDefault();
      } else if (e.key === "-" && fields.length > 0) {
        remove(fields.length - 1);
        e.preventDefault();
      } else if (e.code === "NumpadEnter") {
        handleSubmit(onSubmit)();
        e.preventDefault();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [append, remove, fields.length, handleSubmit, onSubmit]);

  return (
    <div>
      <Card
        size="small"
        extra={
          UserService.hasPermission("PRINT_ORDER") && (
            <Button className="m-1" type="primary" onClick={printCard}>
              Print Order <PrinterOutlined />
            </Button>
          )
        }
      >
        <Card>
          <Row gutter={16}>
            {items.map((item, index) => (
              <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6} key={index}>
                <strong>{item.label}:</strong> {item.value}
              </Col>
            ))}
          </Row>
        </Card>
        <div className="mt-3 mb-3 text-end">
          <Button onClick={() => handleOpenModal()}>Add Product</Button>
        </div>
        <CustomTable
          size="small"
          loading={isLoading}
          data={orderProductList}
          columns={columns}
          rowKey="id"
          scroll={{ x: 300 }}
          pagination={false}
          onEdit={handleEditOrderProduct}
          onDelete={handleDeleteOrderProduct}
        />
      </Card>
      <DraggableModal
        width={1000}
        title="Add Product"
        visible={modal}
        modalClose={handleCloseModal}
      >
        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
          <Row>
            <Col span={24}>
              <Form.Item label="Products" labelAlign="left">
                {fields.map((item, index) => (
                  <Space
                    key={item.id}
                    style={{ display: "flex", marginBottom: 8 }}
                    align="baseline"
                  >
                    <Controller
                      name={`productList[${index}].product`}
                      control={control}
                      rules={{ required: "Product selection is required" }}
                      render={({ field, fieldState }) => (
                        <Col span={24}>
                          <Form.Item
                            validateStatus={fieldState.invalid ? "error" : ""}
                            help={fieldState.error?.message}
                          >
                            <Select
                              placeholder="--Choose--"
                              style={{ width: "200px" }}
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
                                  .localeCompare(
                                    (optionB?.label ?? "").toLowerCase()
                                  )
                              }
                              ref={(el) =>
                                (productSelectRefs.current[index] = el)
                              } // Save ref to product select
                              status={fieldState.invalid ? "error" : ""}
                              options={warehouseProductList.map((value) => ({
                                value: value.product,
                                label: value.product,
                              }))}
                            />
                          </Form.Item>
                        </Col>
                      )}
                    />

                    <Controller
                      name={`productList[${index}].quantity`}
                      control={control}
                      rules={{
                        required: "Quantity is required",
                        validate: (value) =>
                          value > 0 || "Quantity must be greater than 0",
                      }}
                      render={({ field, fieldState }) => (
                        <Form.Item
                          validateStatus={fieldState.invalid ? "error" : ""}
                          help={fieldState.error?.message}
                        >
                          <Input
                            placeholder="Quantity"
                            type="number"
                            onKeyDown={onQuantityKeyDown(index)}
                            {...field}
                            status={fieldState.invalid ? "error" : ""}
                          />
                        </Form.Item>
                      )}
                    />

                    <Controller
                      name={`productList[${index}].type`}
                      control={control}
                      render={({ field, fieldState }) => (
                        <Form.Item
                          validateStatus={fieldState.invalid ? "error" : ""}
                        >
                          <Input
                            readOnly
                            autoComplete="off"
                            placeholder="Type"
                            {...field}
                            status={fieldState.invalid ? "error" : ""}
                          />
                        </Form.Item>
                      )}
                    />

                    <Controller
                      name={`productList[${index}].totalWeight`}
                      control={control}
                      render={({ field, fieldState }) => (
                        <Form.Item
                          validateStatus={fieldState.invalid ? "error" : ""}
                        >
                          <Input
                            autoComplete="off"
                            readOnly
                            placeholder="Total Weight"
                            {...field}
                            status={fieldState.invalid ? "error" : ""}
                          />
                        </Form.Item>
                      )}
                    />

                    <Button type="danger" onClick={() => remove(index)}>
                      Remove
                    </Button>
                  </Space>
                ))}
                <Button
                  type="dashed"
                  onClick={() =>
                    append({
                      product: "",
                      quantity: "",
                      type: "",
                      totalWeight: "",
                    })
                  }
                >
                  Add Product
                </Button>
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Save
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </DraggableModal>
    </div>
  );
};

export default OrderProductList;
