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
import { IDepartment, ISemester } from "../interface/ITable";
import { IOptionsSelect } from "../interface/interface";

interface IProps {
  isModalOpenUpdate: boolean;
  setIsModalOpenUpdate: (isOpen: boolean) => void;
  fetchSemester: () => void;
  dataSemester: ISemester | null;
  setDataSemester: (dataSemester: ISemester | null) => void;
}

interface FormValues {
  name: string;
  startYear: number;
  endYear: number;
}

const ModalUpdateSemester = (props: IProps) => {
  const {
    isModalOpenUpdate,
    setIsModalOpenUpdate,
    fetchSemester,
    dataSemester,
    setDataSemester,
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
      // Semester: dataSemester?.name,
      // code: dataSemester?.code,
      // creditHours: dataSemester?.creditHours,
      // departmentId: dataSemester?.departmentId,
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
    setDataSemester(null);
  };

  const onFinish = async (values: FormValues) => {
    console.log("Form values:", values);

    const res = await reqApi.put({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/Semester/${dataSemester?.id}`,
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
      fetchSemester();
      setDataSemester(null);
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
        title="Update Semester"
        open={isModalOpenUpdate}
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

export default ModalUpdateSemester;
