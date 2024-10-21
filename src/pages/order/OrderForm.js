import { Card, Col, Form, Input, Row, Select, Tag, Button, Space } from "antd";
import { useEffect, useRef } from "react";
import { Controller, useForm, useFieldArray, useWatch } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getCompanyList } from "../../store/actions/company/company";
import { getWarehouseProducts } from "../../store/actions/warehouse/warehouse";

const OrderForm = () => {
  const dispatch = useDispatch();
  const { control, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      products: [{ product: "", quantity: "", type: "", maxQuantity: "" }],
    },
  });
  const { companyList, isLoading } = useSelector((state) => state.company);
  const { warehouseProductList } = useSelector((state) => state.warehouse);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "products",
  });

  const watchedProducts = useWatch({
    control,
    name: "products",
  });

  const previousProductsRef = useRef([]);

  useEffect(() => {
    dispatch(getCompanyList());
    dispatch(getWarehouseProducts());
  }, [dispatch]);

  useEffect(() => {
    if (Array.isArray(watchedProducts) && Array.isArray(warehouseProductList)) {
      watchedProducts.forEach((item, index) => {
        const selectedProduct = warehouseProductList.find(
          (product) => product.product === item.product
        );

        if (
          selectedProduct &&
          previousProductsRef.current[index] !== item.product
        ) {
          setValue(`products[${index}].type`, selectedProduct.type || "");
          setValue(
            `products[${index}].maxQuantity`,
            selectedProduct.quantity || ""
          );
        }

        previousProductsRef.current[index] = item.product;
      });
    }
  }, [watchedProducts, warehouseProductList, setValue]);

  const onSubmit = (data) => {
    reset({});
    console.log(data);
  };

  return (
    <div>
      <Card size="small" title={<Tag color="cyan">Add order</Tag>}>
        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
          <Row>
            <Col span={6}>
              <Form.Item labelAlign="left" label="Company">
                <Controller
                  name="company"
                  control={control}
                  rules={{ required: "Company selection is required" }}
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
                        options={companyList.map((value) => ({
                          value: value.id,
                          label: value.name,
                        }))}
                      />
                      {fieldState.invalid && (
                        <div className="text-danger">
                          {fieldState.error?.message}
                        </div>
                      )}
                    </>
                  )}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={6}>
              <Form.Item label="User" labelAlign="left">
                <Controller
                  name="user"
                  control={control}
                  rules={{ required: "User is required" }}
                  render={({ field, fieldState }) => (
                    <>
                      <Input
                        placeholder="User"
                        {...field}
                        status={fieldState.invalid ? "error" : ""}
                      />
                      {fieldState.invalid && (
                        <div className="text-danger">
                          {fieldState.error?.message}
                        </div>
                      )}
                    </>
                  )}
                />
              </Form.Item>
            </Col>
          </Row>

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
                      name={`products[${index}].product`}
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
                      name={`products[${index}].quantity`}
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
                            {...field}
                            status={fieldState.invalid ? "error" : ""}
                          />
                        </Form.Item>
                      )}
                    />

                    <Controller
                      name={`products[${index}].type`}
                      control={control}
                      render={({ field, fieldState }) => (
                        <Form.Item
                          validateStatus={fieldState.invalid ? "error" : ""}
                        >
                          <Input
                            readOnly
                            placeholder="Type"
                            {...field}
                            status={fieldState.invalid ? "error" : ""}
                          />
                        </Form.Item>
                      )}
                    />

                    <Controller
                      name={`products[${index}].maxQuantity`}
                      control={control}
                      render={({ field, fieldState }) => (
                        <Form.Item
                          validateStatus={fieldState.invalid ? "error" : ""}
                        >
                          <Input
                            readOnly
                            placeholder="Max Quantity"
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
                      maxQuantity: "",
                    })
                  }
                >
                  Add Product
                </Button>
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
};

export default OrderForm;
