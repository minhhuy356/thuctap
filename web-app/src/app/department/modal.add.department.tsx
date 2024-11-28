import React, { useState } from "react";
import { Form, Input, Modal } from "antd";
import { reqApi } from "../api/axios/httpRequest";
import toast from "react-hot-toast";

interface IProps {
  isModalOpenAdd: boolean;
  setIsModalOpenAdd: (isOpen: boolean) => void;
  fetchDepartment: () => void;
}

interface FormValues {
  department: string;
}

const ModalAddDepartment = (props: IProps) => {
  const { isModalOpenAdd, setIsModalOpenAdd, fetchDepartment } = props;

  const [form] = Form.useForm();

  const handleOk = () => {
    form.submit(); // Submit form khi bấm nút OK

    setIsModalOpenAdd(false);
  };

  const handleCancel = () => {
    setIsModalOpenAdd(false);
    form.resetFields();
  };

  const onFinish = async (values: FormValues) => {
    console.log("Form values:", values);

    const res = await reqApi.post({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/department`,
      data: { name: values.department },
    });

    console.log(res);

    if (res) {
      toast.success(`Tạo mới thành công ${res.data.name}`);
      form.resetFields();
      setIsModalOpenAdd(false); // Đóng modal sau khi submit thành công
      fetchDepartment();
    } else {
      toast.error(`Tạo mới thất bại`);
    }
  };

  return (
    <>
      <Modal
        title="Create new Department"
        open={isModalOpenAdd}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form style={{ maxWidth: 600 }} form={form} onFinish={onFinish}>
          <Form.Item
            label="Department"
            name="department"
            rules={[{ required: true, message: "Please input!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalAddDepartment;
