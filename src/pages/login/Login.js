import { Card, Form, Input, Row, Col, Button, message } from "antd";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "../../store/actions/login/login";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../../store/slice/auth/authSlice";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import "./login.css";
import UserService from "../../services/UserService";
import { updateFireBaseToken } from "../../store/actions/user/user";
import { unwrapResult } from "@reduxjs/toolkit";

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

        const username = UserService.getSubject();

        handleUpdateFireBaseToken(username);

        navigate("/");
      } else if (res.payload.status === 409) {
        message.error(res.payload.response.data.message);
      } else if (res.payload.response.data.message === 403) {
        message.error("Error");
      }
    } catch (error) {
      message.error("Please try again later. Something went wrong.");
    }
  };

  const handleUpdateFireBaseToken = async (username) => {
    try {
      const actionResult = await dispatch(updateFireBaseToken(username));
      unwrapResult(actionResult);
      message.success("Firebase token successfully updated!");
    } catch (error) {
      message.warning("Failed to update Firebase token: " + error.message);
    }
  };

  return (
    <Row justify="center" align="top" className="login-background p-2">
      <Col
        className="login-card-container"
        xs={24}
        sm={18}
        md={14}
        lg={12}
        xl={8}
        xxl={6}
      >
        <Card className="p-3">
          <div className="text-center">
            <div className="fs-3 mb-2">Log in to your account</div>
          </div>
          <Form layout="vertical" onFinish={handleSubmit(onFinish)}>
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
                Log in
              </Button>
            </div>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default Login;
