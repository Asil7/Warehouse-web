import { Button, Card, Col, Form, Input, message, Select, Tag } from "antd";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import {
  createCompany,
  getCompanyById,
  updateCompany,
} from "../../store/actions/company/company";
import { getUsersList } from "../../store/actions/user/user";

const CompanyForm = () => {
  const { control, handleSubmit, reset, setValue } = useForm();
  const dispatch = useDispatch();
  const { companyById } = useSelector((state) => state.company);
  const { id } = useParams();
  const { userList, isLoading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUsersList());
    if (id) dispatch(getCompanyById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (id) {
      reset(companyById);
    }
  }, [reset, id, companyById, setValue]);

  const onFinish = async (data) => {
    let res;
    if (id) {
      res = await dispatch(updateCompany(data));
    } else {
      res = await dispatch(createCompany(data));
    }
    if (res.payload.status === 200) {
      reset({});
      if (id) {
        dispatch(getCompanyById(id));
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
        title={<Tag color="cyan">{id ? "Edit Company" : "Create Company"}</Tag>}
      >
        <Col xs={24} sm={24} md={18} lg={14} xl={10} xxl={6}>
          <Form layout="vertical" onFinish={handleSubmit(onFinish)}>
            <Form.Item label="Name" labelAlign="left">
              <Controller
                name="name"
                control={control}
                rules={{ required: "Name is required" }}
                render={({ field, fieldState }) => (
                  <>
                    <Input
                      placeholder="Name"
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
                rules={{ required: "Phone is required" }}
                render={({ field, fieldState }) => (
                  <>
                    <Input
                      placeholder="Phone"
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
            <Form.Item label="Additional Phone" labelAlign="left">
              <Controller
                name="additionalPhone"
                control={control}
                render={({ field, fieldState }) => (
                  <Input
                    placeholder="Additional Phone"
                    {...field}
                    status={fieldState.invalid ? "error" : ""}
                  />
                )}
              />
            </Form.Item>
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
            <Form.Item label="Description" labelAlign="left">
              <Controller
                name="description"
                control={control}
                render={({ field, fieldState }) => (
                  <Input
                    placeholder="Description"
                    {...field}
                    status={fieldState.invalid ? "error" : ""}
                  />
                )}
              />
            </Form.Item>
            <Form.Item label="Location" labelAlign="left">
              <Controller
                name="location"
                control={control}
                rules={{ required: "Location is required" }}
                render={({ field, fieldState }) => (
                  <>
                    <Input
                      placeholder="Location"
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
            <Form.Item label="Location Map" labelAlign="left">
              <Controller
                name="locationMap"
                control={control}
                render={({ field, fieldState }) => (
                  <Input
                    placeholder="Location Map"
                    {...field}
                    status={fieldState.invalid ? "error" : ""}
                  />
                )}
              />
            </Form.Item>
            <div className="text-end">
              <Link to={"/companies"}>
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

export default CompanyForm;
