import React, { useEffect, useState } from "react";
import { Form, Input, Modal, Select, Space } from "antd";
import { reqApi } from "../api/axios/httpRequest";
import toast from "react-hot-toast";
import { IClass, ICourse, IDepartment } from "../interface/ITable";
import { IOptionsSelect } from "../interface/interface";

interface IProps {
  isModalOpenUpdate: boolean;
  setIsModalOpenUpdate: (isOpen: boolean) => void;
  fetchClass: () => void;
  dataClass: IClass | null;
  setDataClass: (dataClass: IClass | null) => void;
}

interface FormValues {
  name: string;
  departmentId: number;
  courseId: number;
}

const ModalUpdateClass = (props: IProps) => {
  const {
    isModalOpenUpdate,
    setIsModalOpenUpdate,
    fetchClass,
    dataClass,
    setDataClass,
  } = props;

  const [form] = Form.useForm();

  const [deparment, setDepartment] = useState<IOptionsSelect[]>([]);
  const [course, setCourse] = useState<IOptionsSelect[]>([]);

  const handleOk = () => {
    form.submit(); // Submit form khi bấm nút OK

    setIsModalOpenUpdate(false);
  };

  const handleCancel = () => {
    setIsModalOpenUpdate(false);
    form.resetFields();
    setDataClass(null);
  };

  const onFinish = async (values: FormValues) => {
    console.log("Form values:", values);

    const res = await reqApi.put({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/class/${dataClass?.id}`,
      data: {
        name: values.name,
        departmentId: values.departmentId,
        courseId: values.courseId,
      },
    });

    console.log(res);

    if (res) {
      toast.success(`Cập nhâp ${res.data.name} thành công`);
      form.resetFields();
      setIsModalOpenUpdate(false); // Đóng modal sau khi submit thành công
      fetchClass();
      setDataClass(null);
    } else {
      toast.error(`Cập nhâp thất bại`);
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
    form.setFieldsValue({
      class: dataClass?.name,
      department: dataClass?.department.name,
      course: dataClass?.course.name,
    });

    fetchDeparment();
    fetchCourse();
  }, [isModalOpenUpdate]);

  return (
    <>
      <Modal
        title="Update Class"
        open={isModalOpenUpdate}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form style={{ maxWidth: 600 }} form={form} onFinish={onFinish}>
          <Form.Item
            label="Class"
            name="class"
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

export default ModalUpdateClass;
