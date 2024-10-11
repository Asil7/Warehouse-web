import { Card, Form, Input, Row, Col, Button, message } from "antd";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "../../store/actions/login/login";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../../store/slice/auth/authSlice";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

const Login = () => {
  const { control, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (data) => {
    try {
      let res = await dispatch(login(data));
      console.log();

      if (res.payload.status === 200) {
        const token = res.payload.data.object;
        dispatch(loginSuccess(token));

        message.success("Login successful!");

        navigate("/");
      } else if (res.payload.status === 409) {
        message.error(res.payload.response.data.message);
      } else if (res.payload.response.data.message === 403) {
        message.error("Error");
      }
    } catch (error) {
      message.error("An error occurred. Please try again." + error, 30);
    }
  };

  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <Col xs={24} sm={18} md={14} lg={12} xl={8} xxl={6}>
        <Card>
          <Form onFinish={handleSubmit(onFinish)}>
            <Form.Item label="Username" labelAlign="left">
              <Controller
                name="username"
                control={control}
                render={({ field, fieldState }) => (
                  <Input
                    prefix={<UserOutlined />}
                    {...field}
                    status={fieldState.invalid ? "error" : ""}
                  />
                )}
              />
            </Form.Item>
            <Form.Item label="Password" labelAlign="left">
              <Controller
                name="password"
                control={control}
                render={({ field, fieldState }) => (
                  <Input.Password
                    prefix={<LockOutlined />}
                    {...field}
                    status={fieldState.invalid ? "error" : ""}
                  />
                )}
              />
            </Form.Item>
            <div>
              <Button block htmlType="submit" type="primary">
                Login
              </Button>
            </div>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default Login;
