import React, { useEffect, useState } from "react";
import { Form, Input, Modal, Select, Space } from "antd";
import { reqApi } from "../api/axios/httpRequest";
import toast from "react-hot-toast";
import { ICourse } from "../interface/ITable";
import { IOptionsSelect } from "../interface/interface";

interface IProps {
  isModalOpenUpdate: boolean;
  setIsModalOpenUpdate: (isOpen: boolean) => void;
  fetchCourse: () => void;
  dataCourse: ICourse | null;
  setDataCourse: (dataCourse: ICourse | null) => void;
}

interface FormValues {
  name: string;
  startYear: number;
  endYear: number;
}

const ModalUpdateCourse = (props: IProps) => {
  const {
    isModalOpenUpdate,
    setIsModalOpenUpdate,
    fetchCourse,
    dataCourse,
    setDataCourse,
  } = props;

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
    form.setFieldsValue({
      course: dataCourse?.name,
      startYear: dataCourse?.startYear,
      endYear: dataCourse?.endYear,
    });

    fetchYear();
  }, [isModalOpenUpdate]);

  const handleOk = () => {
    form.submit(); // Submit form khi bấm nút OK

    setIsModalOpenUpdate(false);
  };

  const handleCancel = () => {
    setIsModalOpenUpdate(false);
    form.resetFields();
    setDataCourse(null);
  };

  const onFinish = async (values: FormValues) => {
    console.log("Form values:", values);

    const res = await reqApi.put({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/course/${dataCourse?.id}`,
      data: {
        name: values.name,
        startYear: values.startYear,
        endYear: values.endYear,
      },
    });

    console.log(res);

    if (res) {
      toast.success(`Cập nhâp ${res.data.name} thành công`);
      form.resetFields();
      setIsModalOpenUpdate(false); // Đóng modal sau khi submit thành công
      fetchCourse();
      setDataCourse(null);
    } else {
      toast.error(`Cập nhâp thất bại`);
    }
  };

  return (
    <>
      <Modal
        title="Update Course"
        open={isModalOpenUpdate}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form style={{ maxWidth: 600 }} form={form} onFinish={onFinish}>
          <Form.Item
            label="Course"
            name="course"
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

export default ModalUpdateCourse;
