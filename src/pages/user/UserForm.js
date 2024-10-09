import { Button, Card, Col, Form, Input, Select, message } from "antd";
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
  const { control, handleSubmit, reset, setValue } = useForm();
  const dispatch = useDispatch();
  const { roleList, isLoading } = useSelector((state) => state.role);
  const { userById } = useSelector((state) => state.user);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getRoleList());
    if (id) dispatch(getUserById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (id) {
      reset(userById);
      // setValue("roleId", userById.roleName);
    }
  }, [reset, id, userById, setValue]);

  const onFinish = async (data) => {
    let res;
    if (id) {
      res = await dispatch(updateUser(data));
    } else {
      res = await dispatch(createUser(data));
    }
    if (res.payload.status === 200) {
      reset({});
      message.success(res.payload.data.message);
    } else if (res.payload.status === 409) {
      message.error(res.payload.response.data.message);
    }
  };

  return (
    <div>
      <Card>
        <Col xs={24} sm={24} md={18} lg={14} xl={10} xxl={6}>
          <Form layout="vertical" onFinish={handleSubmit(onFinish)}>
            <Form.Item label="Full Name" labelAlign="left">
              <Controller
                name="fullName"
                control={control}
                render={({ field, fieldState }) => (
                  <Input
                    {...field}
                    status={fieldState.invalid ? "error" : ""}
                  />
                )}
              />
            </Form.Item>
            <Form.Item label="Username" labelAlign="left">
              <Controller
                name="username"
                control={control}
                render={({ field, fieldState }) => (
                  <Input
                    {...field}
                    status={fieldState.invalid ? "error" : ""}
                  />
                )}
              />
            </Form.Item>
            {!id && (
              <Form.Item label="Password" labelAlign="left">
                <Controller
                  name="password"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Input.Password
                      {...field}
                      status={fieldState.invalid ? "error" : ""}
                    />
                  )}
                />
              </Form.Item>
            )}
            <Form.Item label="Role">
              <Controller
                name="roleId"
                rules={{
                  required: true,
                }}
                control={control}
                render={({ field, fieldState }) => (
                  <Select
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
                    options={roleList.map((value) => {
                      return {
                        value: value.id,
                        label: value.name,
                      };
                    })}
                  />
                )}
              />
            </Form.Item>
            <div className="text-end">
              <Button htmlType="submit" className="me-1" type="primary">
                Save
              </Button>
              <Link to={"/users"}>
                <Button>Cancel</Button>
              </Link>
            </div>
          </Form>
        </Col>
      </Card>
    </div>
  );
};

export default UserForm;
