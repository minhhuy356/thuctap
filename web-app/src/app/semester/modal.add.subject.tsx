import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  InputNumberProps,
  Modal,
  Select,
} from "antd";
import { reqApi } from "../api/axios/httpRequest";
import toast from "react-hot-toast";
import { IOptionsSelect } from "../interface/interface";
import { IDepartment } from "../interface/ITable";

interface IProps {
  isModalOpenAdd: boolean;
  setIsModalOpenAdd: (isOpen: boolean) => void;
  fetchSemester: () => void;
}

interface FormValues {
  Semester: string;
}

const ModalAddSemester = (props: IProps) => {
  const { isModalOpenAdd, setIsModalOpenAdd, fetchSemester } = props;

  const [form] = Form.useForm();

  const [department, setDepartment] = useState<IOptionsSelect[]>([]);

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

  // Gọi hàm fetchYear khi component được render lần đầu tiên
  useEffect(() => {
    fetchDeparment();
  }, []);

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
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/Semester`,
      data: { name: values.Semester },
    });

    console.log(res);

    if (res) {
      toast.success(`Tạo mới thành công ${res.data.name}`);
      form.resetFields();
      setIsModalOpenAdd(false); // Đóng modal sau khi submit thành công
      fetchSemester();
    } else {
      toast.error(`Tạo mới thất bại`);
    }
  };

  const onChange: InputNumberProps["onChange"] = (value) => {
    console.log("changed", value);
  };

  return (
    <>
      <Modal
        title="Create new Semester"
        open={isModalOpenAdd}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form style={{ maxWidth: 600 }} form={form} onFinish={onFinish}>
          <Form.Item
            label="Semester"
            name="Semester"
            rules={[{ required: true, message: "Please input!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Code"
            name="code"
            rules={[{ required: true, message: "Please input!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Tín chỉ"
            name="creditHours"
            rules={[{ required: true, message: "Please input!" }]}
          >
            <InputNumber min={1} max={5} onChange={onChange} />
          </Form.Item>
          <Form.Item
            label="Khoa"
            name="departmentId"
            rules={[{ required: true, message: "Please input!" }]}
          >
            <Select options={department} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalAddSemester;
