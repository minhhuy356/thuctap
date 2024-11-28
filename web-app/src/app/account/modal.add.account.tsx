import React, { useEffect, useState } from "react";
import { Col, DatePicker, Form, Input, Modal, Row, Select } from "antd";
import { reqApi } from "../api/axios/httpRequest";
import toast from "react-hot-toast";
import { IOptionsSelect } from "../interface/interface";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

interface IProps {
  isModalOpenAdd: boolean;
  setIsModalOpenAdd: (isOpen: boolean) => void;
  fetchAccount: () => void;
}

interface FormValues {
  name: string;
  password: string;
  email: string;
}

const ModalAddAccount = (props: IProps) => {
  const { isModalOpenAdd, setIsModalOpenAdd, fetchAccount } = props;

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
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/account/register`,
      data: {
        userName: values.name,
        password: values.password,
        email: values.email,
      },
    });

    console.log(res);

    if (res) {
      toast.success(`Tạo mới thành công ${res.data.name}`);
      form.resetFields();
      setIsModalOpenAdd(false); // Đóng modal sau khi submit thành công
      fetchAccount();
    } else {
      toast.error(`Tạo mới thất bại`);
    }
  };

  return (
    <>
      <Modal
        title="Create new Account"
        open={isModalOpenAdd}
        onOk={handleOk}
        onCancel={handleCancel}
        className="!max-w-[600px] !w-full"
      >
        <Form
          className="w-full"
          form={form}
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            label="Tài khoản"
            name="userName"
            rules={[{ required: true, message: "Please input!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Tài khoản" />
          </Form.Item>
          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Please input!" }]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="mật khẩu"
            />
          </Form.Item>{" "}
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input!" }]}
          >
            <Input placeholder="abc@gmail.com" type="email" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalAddAccount;
