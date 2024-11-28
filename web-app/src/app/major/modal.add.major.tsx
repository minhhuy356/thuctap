import React, { useEffect, useState } from "react";
import { Form, Input, Modal, Select, Switch } from "antd";
import { reqApi } from "../api/axios/httpRequest";
import toast from "react-hot-toast";
import { IDepartment } from "../interface/ITable";
import { IOptionsSelect } from "../interface/interface";

interface IProps {
  isModalOpenAdd: boolean;
  setIsModalOpenAdd: (isOpen: boolean) => void;
  fetchMajor: () => void;
}

interface FormValues {
  major: string;
  description: string;
  department: number;
  isSet: boolean;
}

const ModalAddMajor = (props: IProps) => {
  const { isModalOpenAdd, setIsModalOpenAdd, fetchMajor } = props;

  const [deparment, setDepartment] = useState<IOptionsSelect[]>([]);

  const [form] = Form.useForm();

  const handleOk = () => {
    form.submit(); // Submit form khi bấm nút OK
  };

  const handleCancel = () => {
    setIsModalOpenAdd(false);
    form.resetFields();
  };

  const onFinish = async (values: FormValues) => {
    console.log("Form values:", values);

    const res = await reqApi.post({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/major/${values.department}`,
      data: {
        name: values.major,
        description: values.description,
        isSet: values.isSet ? true : false,
      },
    });

    console.log(res);

    if (res) {
      toast.success(`Tạo mới thành công ${res.data.name}`);
      form.resetFields();
      setIsModalOpenAdd(false); // Đóng modal sau khi submit thành công
      fetchMajor();
    } else {
      toast.error(`Tạo mới thất bại`);
    }
  };

  const fetchDeparment = async () => {
    const res = await reqApi.get({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/department`,
    });
    if (res) {
      const optionsDepartment = res.data.map((item: IDepartment) => {
        return {
          value: item.id,
          label: item.name,
        };
      });

      setDepartment(optionsDepartment);
    }
  };

  useEffect(() => {
    fetchDeparment();
  }, [isModalOpenAdd]);

  return (
    <>
      <Modal
        title="Create new Major"
        open={isModalOpenAdd}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form style={{ maxWidth: 600 }} form={form} onFinish={onFinish}>
          <Form.Item
            label="Major"
            name="major"
            rules={[{ required: true, message: "Please input!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Department"
            name="department"
            rules={[{ required: true, message: "Please input!" }]}
          >
            <Select options={deparment} />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input.TextArea />
          </Form.Item>
          <Form.Item label="Sử dụng" valuePropName="checked" name="isSet">
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalAddMajor;
