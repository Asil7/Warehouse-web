import {
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
  Tag,
  Button,
  Space,
  message,
} from "antd";
import { useCallback, useEffect, useRef } from "react";
import { Controller, useForm, useFieldArray, useWatch } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getCompanyList } from "../../store/actions/company/company";
import { getWarehouseProducts } from "../../store/actions/warehouse/warehouse";
import { createOrder } from "../../store/actions/order/order";
import { getUsersList } from "../../store/actions/user/user";

const OrderForm = () => {
  const dispatch = useDispatch();
  const { control, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      productList: [{ product: "", quantity: "", type: "", totalWeight: "" }],
    },
  });
  const { companyList, isLoading } = useSelector((state) => state.company);
  const { warehouseProductList } = useSelector((state) => state.warehouse);
  const { userList } = useSelector((state) => state.user);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "productList",
  });

  const watchedProducts = useWatch({
    control,
    name: "productList",
  });

  const previousProductsRef = useRef([]);
  const productSelectRefs = useRef([]);

  useEffect(() => {
    dispatch(getCompanyList());
    dispatch(getWarehouseProducts());
    dispatch(getUsersList());
  }, [dispatch]);

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

  const onSubmit = useCallback(
    async (data) => {
      console.log(data);
      try {
        let res = await dispatch(createOrder(data));
        if (res.payload.status === 200) {
          reset({});
          message.success(res.payload.data.message);
        } else if (res.payload.status === 409) {
          message.error(res.payload.response.data.message);
        }
      } catch (error) {}
    },
    [dispatch, reset]
  );

  const onQuantityKeyDown = (index) => (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      if (productSelectRefs.current[index + 1]) {
        productSelectRefs.current[index + 1].focus();
      }
    }
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
      } else if (e.key === "Enter" && e.code === "NumpadEnter") {
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
      <Card size="small" title={<Tag color="cyan">Add order</Tag>}>
        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
          <Row>
            <Col xs={24} sm={16} md={12} lg={10} xl={8} xxl={6}>
              <Form.Item labelAlign="left" label="Company">
                <Controller
                  name="companyId"
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
                        onChange={(value) => {
                          field.onChange(value);
                          const selectedCompany = companyList.find(
                            (p) => p.id === value
                          );
                          if (selectedCompany) {
                            setValue("username", selectedCompany?.username);
                          }
                        }}
                      />
                      {fieldState.invalid && (
                        <div className="position-absolute text-danger">
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
            <Col xs={24} sm={16} md={12} lg={10} xl={8} xxl={6}>
              <Form.Item label="User">
                <Controller
                  name="username"
                  control={control}
                  rules={{ required: "User selection is required" }}
                  render={({ field, fieldState }) => (
                    <>
                      <Select
                        placeholder="--Choose--"
                        allowClear
                        {...field}
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
                      {fieldState.invalid && (
                        <div className="position-absolute text-danger">
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

                    <button
                      onClick={() => remove(index)}
                      title="Remove"
                      className="btn btn-sm btn-outline-danger"
                    >
                      <i className="bi bi-trash"></i>
                    </button>
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
      </Card>
    </div>
  );
};

export default OrderForm;
