import { Button, Card, Form, Input, Checkbox, Row, Col, message } from "antd";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getPermissionList } from "../../../store/actions/permission/permission";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { createRole } from "../../../store/actions/role/role";

const RoleForm = () => {
  const { control, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const { permissionList } = useSelector((state) => state.permission);

  useEffect(() => {
    dispatch(getPermissionList());
  }, [dispatch]);

  const onFinish = async (data) => {
    const payload = {
      name: data.name,
      description: data.description,
      permissionIds: data.permissions,
    };

    let res = await dispatch(createRole(payload));

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
        <div className="scroll-role-card">
          <Form onFinish={handleSubmit(onFinish)} layout="vertical">
            <Col xs={24} sm={24} md={18} lg={14} xl={10} xxl={6}>
              <Form.Item label="Name" labelAlign="left">
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: "Name is required" }}
                  render={({ field, fieldState }) => (
                    <>
                      <Input
                        {...field}
                        status={fieldState.invalid ? "error" : ""}
                      />
                      {fieldState.invalid && (
                        <span className="text-danger">
                          {fieldState.error?.message}
                        </span>
                      )}
                    </>
                  )}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={18} lg={14} xl={10} xxl={6}>
              <Form.Item label="Description" labelAlign="left">
                <Controller
                  name="description"
                  control={control}
                  rules={{ required: "Description is required" }}
                  render={({ field, fieldState }) => (
                    <>
                      <Input
                        {...field}
                        status={fieldState.invalid ? "error" : ""}
                      />
                      {fieldState.invalid && (
                        <span className="text-danger">
                          {fieldState.error?.message}
                        </span>
                      )}
                    </>
                  )}
                />
              </Form.Item>
            </Col>
            <Form.Item label="Permissions">
              <Controller
                name="permissions"
                control={control}
                render={({ field }) => (
                  <Checkbox.Group {...field}>
                    <Row gutter={[16, 16]}>
                      {permissionList.map((permission) => (
                        <Col
                          xs={24}
                          sm={24}
                          md={13}
                          lg={10}
                          xl={8}
                          xxl={
                            permissionList.length >= 2 &&
                            permissionList.length <= 4
                              ? 10
                              : 6
                          }
                          key={permission.id}
                        >
                          <Checkbox value={permission.id}>
                            {permission.name}
                          </Checkbox>
                        </Col>
                      ))}
                    </Row>
                  </Checkbox.Group>
                )}
              />
            </Form.Item>

            <div className="text-end mt-1">
              <Link to={"/roles"}>
                <Button className="me-2">Cancel</Button>
              </Link>
              <Button htmlType="submit" type="primary">
                Save
              </Button>
            </div>
          </Form>
        </div>
      </Card>
    </div>
  );
};

export default RoleForm;
