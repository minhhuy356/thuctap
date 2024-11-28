import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  InputNumberProps,
  Modal,
  Select,
  Space,
} from "antd";
import { reqApi } from "../api/axios/httpRequest";
import toast from "react-hot-toast";
import { IDepartment, ISubject } from "../interface/ITable";
import { IOptionsSelect } from "../interface/interface";

interface IProps {
  isModalOpenUpdate: boolean;
  setIsModalOpenUpdate: (isOpen: boolean) => void;
  fetchSubject: () => void;
  dataSubject: ISubject | null;
  setDataSubject: (dataSubject: ISubject | null) => void;
}

interface FormValues {
  name: string;
  startYear: number;
  endYear: number;
}

const ModalUpdateSubject = (props: IProps) => {
  const {
    isModalOpenUpdate,
    setIsModalOpenUpdate,
    fetchSubject,
    dataSubject,
    setDataSubject,
  } = props;

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
    form.setFieldsValue({
      subject: dataSubject?.name,
      code: dataSubject?.code,
      creditHours: dataSubject?.creditHours,
      departmentId: dataSubject?.departmentId,
    });

    fetchDeparment();
  }, [isModalOpenUpdate]);

  const handleOk = () => {
    form.submit(); // Submit form khi bấm nút OK

    setIsModalOpenUpdate(false);
  };

  const handleCancel = () => {
    setIsModalOpenUpdate(false);
    form.resetFields();
    setDataSubject(null);
  };

  const onFinish = async (values: FormValues) => {
    console.log("Form values:", values);

    const res = await reqApi.put({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/subject/${dataSubject?.id}`,
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
      fetchSubject();
      setDataSubject(null);
    } else {
      toast.error(`Cập nhâp thất bại`);
    }
  };
  const onChange: InputNumberProps["onChange"] = (value) => {
    console.log("changed", value);
  };
  return (
    <>
      <Modal
        title="Update Subject"
        open={isModalOpenUpdate}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form style={{ maxWidth: 600 }} form={form} onFinish={onFinish}>
          <Form.Item
            label="Subject"
            name="subject"
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

export default ModalUpdateSubject;
