import React, { useEffect, useState } from "react";
import { Form, Input, Modal, Select } from "antd";
import { reqApi } from "../api/axios/httpRequest";
import toast from "react-hot-toast";
import { IOptionsSelect } from "../interface/interface";
import { ICourse, IDepartment } from "../interface/ITable";

interface IProps {
  isModalOpenAdd: boolean;
  setIsModalOpenAdd: (isOpen: boolean) => void;
  fetchClass: () => void;
}

interface FormValues {
  Class: string;
}

const ModalAddClass = (props: IProps) => {
  const { isModalOpenAdd, setIsModalOpenAdd, fetchClass } = props;

  const [deparment, setDepartment] = useState<IOptionsSelect[]>([]);
  const [course, setCourse] = useState<IOptionsSelect[]>([]);

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
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/Class`,
      data: { name: values.Class },
    });

    console.log(res);

    if (res) {
      toast.success(`Tạo mới thành công ${res.data.name}`);
      form.resetFields();
      setIsModalOpenAdd(false); // Đóng modal sau khi submit thành công
      fetchClass();
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

  const fetchCourse = async () => {
    const res = await reqApi.get({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/course`,
    });
    if (res) {
      const optionsCourse = res.data.map((item: ICourse) => {
        return {
          value: item.id,
          label: item.name,
        };
      });

      setCourse(optionsCourse);
    }
  };

  useEffect(() => {
    fetchDeparment();
    fetchCourse();
  }, [isModalOpenAdd]);

  return (
    <>
      <Modal
        title="Create new Class"
        open={isModalOpenAdd}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form style={{ maxWidth: 600 }} form={form} onFinish={onFinish}>
          <Form.Item
            label="Class"
            name="Class"
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
          <Form.Item
            label="Course"
            name="course"
            rules={[{ required: true, message: "Please input!" }]}
          >
            <Select options={course} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalAddClass;
