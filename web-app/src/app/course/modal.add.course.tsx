import React, { useEffect, useState } from "react";
import { Form, Input, Modal, Select } from "antd";
import { reqApi } from "../api/axios/httpRequest";
import toast from "react-hot-toast";
import { IOptionsSelect } from "../interface/interface";

interface IProps {
  isModalOpenAdd: boolean;
  setIsModalOpenAdd: (isOpen: boolean) => void;
  fetchCourse: () => void;
}

interface FormValues {
  Course: string;
}

const ModalAddCourse = (props: IProps) => {
  const { isModalOpenAdd, setIsModalOpenAdd, fetchCourse } = props;

  const [form] = Form.useForm();

  const [year, setYear] = useState<IOptionsSelect[]>([]);

  const fetchYear = () => {
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 20;
    const endYear = currentYear + 80;

    const years: IOptionsSelect[] = [];
    for (let y = startYear; y <= endYear; y++) {
      years.push({ value: y, label: y.toString() });
    }
    setYear(years);
  };

  // Gọi hàm fetchYear khi component được render lần đầu tiên
  useEffect(() => {
    fetchYear();
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
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/Course`,
      data: { name: values.Course },
    });

    console.log(res);

    if (res) {
      toast.success(`Tạo mới thành công ${res.data.name}`);
      form.resetFields();
      setIsModalOpenAdd(false); // Đóng modal sau khi submit thành công
      fetchCourse();
    } else {
      toast.error(`Tạo mới thất bại`);
    }
  };

  return (
    <>
      <Modal
        title="Create new Course"
        open={isModalOpenAdd}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form style={{ maxWidth: 600 }} form={form} onFinish={onFinish}>
          <Form.Item
            label="Course"
            name="Course"
            rules={[{ required: true, message: "Please input!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Năm học"
            name="startYear"
            rules={[{ required: true, message: "Please input!" }]}
          >
            <Select options={year} />
          </Form.Item>
          <Form.Item
            label="Năm kết thúc"
            name="endYear"
            rules={[{ required: true, message: "Please input!" }]}
          >
            <Select options={year} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalAddCourse;
