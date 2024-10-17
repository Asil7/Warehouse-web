import { Button, DatePicker, Form, Input, message } from "antd";
import DraggableModal from "../../components/modal/DraggableModal";
import dayjs from "dayjs";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserSalary,
  getUsersList,
  giveSalary,
} from "../../store/actions/user/user";
import { useEffect, useState } from "react";

const UserSalaryModal = ({ salaryModal, setSalaryModal, userDetail }) => {
  const [formVisible, setFormVisible] = useState(false);
  const { control, handleSubmit, reset } = useForm();
  const {
    control: salaryControl,
    handleSubmit: salaryHandleSubmit,
    setValue: salarySetValue,
  } = useForm();
  const dispatch = useDispatch();
  const { userSalary } = useSelector((state) => state.user);

  const handleModalClose = () => {
    setSalaryModal(false);
    setFormVisible(false);
    reset({});
  };

  useEffect(() => {
    console.log(userDetail);
  }, [dispatch, userDetail]);

  useEffect(() => {
    if (formVisible && userSalary) {
      //   const formattedSalary = new Intl.NumberFormat("en-US").format(userSalary);
      salarySetValue("salary", userSalary);
    }
  }, [formVisible, userSalary, salarySetValue]);

  const onFinish = async (data) => {
    try {
      data.date = dayjs(data.date).format("YYYY-MM-DD");
      const payload = {
        userId: userDetail.id,
        givenDate: data.date,
      };
      let res = await dispatch(getUserSalary(payload));

      if (res.payload.status === 200) {
        message.success(res.payload.data.message);
        setFormVisible(true);
      } else if (res.payload.status === 409) {
        console.log(res.payload.response.data);

        message.error(res.payload.response.data.message);
      }
    } catch (e) {}
  };

  const handleGiveSalary = async (data) => {
    try {
      const payload = {
        username: userDetail.username,
        salary: data.salary,
        givenSalary: data.givenSalary,
      };
      let res = await dispatch(giveSalary(payload));
      if (res.payload.status === 200) {
        message.success(res.payload.data.message);
        dispatch(getUsersList());
        handleModalClose();
      } else if (res.payload.status === 409) {
        message.error(res.payload.response.data.message);
      }
    } catch (e) {}
  };

  return (
    <div>
      <DraggableModal
        title="Salary"
        modalClose={handleModalClose}
        visible={salaryModal}
      >
        <>
          {!formVisible && (
            <Form layout="vertical" onFinish={handleSubmit(onFinish)}>
              <Form.Item label="Date" labelAlign="left">
                <Controller
                  name="date"
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: "Date is required",
                    },
                  }}
                  render={({ field, fieldState }) => (
                    <>
                      <DatePicker
                        //   className="w-100"
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
                <Button htmlType="submit" type="primary">
                  Continue
                </Button>
              </div>
            </Form>
          )}
          {formVisible && (
            <Form
              onFinish={salaryHandleSubmit(handleGiveSalary)}
              layout="vertical"
            >
              <Form.Item label="Salary" labelAlign="left">
                <Controller
                  name="salary"
                  control={salaryControl}
                  value={userSalary}
                  render={({ field, fieldState }) => (
                    <Input
                      readOnly
                      {...field}
                      className={
                        fieldState.invalid
                          ? "custom-input error"
                          : "custom-input"
                      }
                    />
                  )}
                />
              </Form.Item>
              <Form.Item label="Given Salary" labelAlign="left">
                <Controller
                  name="givenSalary"
                  control={salaryControl}
                  render={({ field, fieldState }) => (
                    <Input
                      {...field}
                      className={
                        fieldState.invalid
                          ? "custom-input error"
                          : "custom-input"
                      }
                    />
                  )}
                />
              </Form.Item>
              <div className="text-end">
                <Button className="me-1" onClick={handleModalClose}>
                  Cancel
                </Button>
                <Button type="primary" htmlType="submit">
                  Give
                </Button>
              </div>
            </Form>
          )}
        </>
      </DraggableModal>
    </div>
  );
};

export default UserSalaryModal;
