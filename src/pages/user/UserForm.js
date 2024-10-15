import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Select,
  Space,
  Tag,
  message,
} from "antd";
import dayjs from "dayjs";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getRoleList } from "../../store/actions/role/role";
import { useEffect } from "react";
import {
  createUser,
  getUserById,
  updateUser,
} from "../../store/actions/user/user";

const UserForm = () => {
  const { control, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const { roleList, isLoading } = useSelector((state) => state.role);
  const { userById } = useSelector((state) => state.user);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getRoleList());
    if (id) dispatch(getUserById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (id && userById) {
      reset({
        ...userById,
        phone: userById.phone ? { phone: userById.phone } : { phone: "" },
      });
    }
  }, [reset, id, userById]);

  const onFinish = async (data) => {
    data.phone = data.phone.phone;
    data.dateOfEmployment = dayjs(data.dateOfEmployment).format("YYYY-MM-DD");
    let res;
    if (id) {
      res = await dispatch(updateUser(data));
    } else {
      res = await dispatch(createUser(data));
    }
    if (res.payload.status === 200) {
      reset({});
      if (id) {
        dispatch(getUserById(id));
      }
      message.success(res.payload.data.message);
    } else if (res.payload.status === 409) {
      message.error(res.payload.response.data.message);
    }
  };

  return (
    <div>
      <Card
        size="small"
        title={<Tag color="cyan">{id ? "Edit User" : "Create User"}</Tag>}
      >
        <Col xs={24} sm={24} md={18} lg={14} xl={10} xxl={6}>
          <Form layout="vertical" onFinish={handleSubmit(onFinish)}>
            <Form.Item label="Full Name" labelAlign="left">
              <Controller
                name="fullName"
                control={control}
                rules={{
                  required: { value: true, message: "Full Name is required" },
                }}
                render={({ field, fieldState }) => (
                  <>
                    <Input
                      placeholder="Full Name"
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

            <Form.Item label="Username" labelAlign="left">
              <Controller
                name="username"
                control={control}
                rules={{
                  required: { value: true, message: "Username is required" },
                }}
                render={({ field, fieldState }) => (
                  <>
                    <Input
                      placeholder="Username"
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

            <Form.Item label="Phone" labelAlign="left">
              <Controller
                name="phone"
                control={control}
                render={({ field, fieldState }) => (
                  <Space.Compact style={{ width: "100%" }}>
                    <Input readOnly value="🇺🇿 +998" style={{ width: "20%" }} />
                    <Input
                      placeholder="Phone number"
                      style={{ width: "80%" }}
                      value={field.value?.phone || ""}
                      onChange={(e) =>
                        field.onChange({
                          ...field.value,
                          phone: e.target.value,
                        })
                      }
                      status={fieldState.invalid ? "error" : ""}
                    />
                  </Space.Compact>
                )}
              />
            </Form.Item>
            {!id && (
              <Form.Item label="Password" labelAlign="left">
                <Controller
                  name="password"
                  control={control}
                  rules={{
                    required: { value: true, message: "Password is required" },
                  }}
                  render={({ field, fieldState }) => (
                    <>
                      <Input.Password
                        placeholder="Password"
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
            )}
            <Form.Item label="Role">
              <Controller
                name="roleId"
                control={control}
                rules={{
                  required: { value: true, message: "Role is required" },
                }}
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
                      options={roleList.map((value) => ({
                        value: value.id,
                        label: value.name,
                      }))}
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

            <Form.Item label="Salary" labelAlign="left">
              <Controller
                name="salary"
                control={control}
                rules={{
                  required: { value: true, message: "Salary is required" },
                }}
                render={({ field, fieldState }) => (
                  <>
                    <Input
                      placeholder="Salary"
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

            <Form.Item label="Date of Employment" labelAlign="left">
              <Controller
                name="dateOfEmployment"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Date of Employment is required",
                  },
                }}
                render={({ field, fieldState }) => (
                  <>
                    <DatePicker
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

            <div className="text-end">
              <Link to={"/users"}>
                <Button className="me-1">Cancel</Button>
              </Link>
              <Button htmlType="submit" type="primary">
                Save
              </Button>
            </div>
          </Form>
        </Col>
      </Card>
    </div>
  );
};

export default UserForm;
