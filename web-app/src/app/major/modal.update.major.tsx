import React, { useEffect, useState } from "react";
import { Form, Input, Modal, Select, Space, Switch } from "antd";
import { reqApi } from "../api/axios/httpRequest";
import toast from "react-hot-toast";
import { IDepartment, IMajor } from "../interface/ITable";
import { IOptionsSelect } from "../interface/interface";

interface IProps {
  isModalOpenUpdate: boolean;
  setIsModalOpenUpdate: (isOpen: boolean) => void;
  fetchMajor: () => void;
  dataMajor: IMajor | null;
  setDataMajor: (dataMajor: IMajor | null) => void;
}

interface FormValues {
  name: string;
  description: string;
  department: number;
  isSet: boolean;
}

const ModalUpdateMajor = (props: IProps) => {
  const {
    isModalOpenUpdate,
    setIsModalOpenUpdate,
    fetchMajor,
    dataMajor,
    setDataMajor,
  } = props;

  const [deparment, setDepartment] = useState<IOptionsSelect[]>([]);
  const [form] = Form.useForm();

  const handleOk = () => {
    form.submit(); // Submit form khi bấm nút OK

    setIsModalOpenUpdate(false);
  };

  const handleCancel = () => {
    setIsModalOpenUpdate(false);
    form.resetFields();
    setDataMajor(null);
  };

  const onFinish = async (values: FormValues) => {
    console.log("Form values:", values);

    const res = await reqApi.put({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/major/${dataMajor?.id}`,
      data: {
        name: values.name,
        description: values.description,
        departmentId: values.department,
        isSet: values.isSet,
      },
    });

    console.log(res);

    if (res) {
      toast.success(`Cập nhâp ${res.data.name} thành công`);
      form.resetFields();
      setIsModalOpenUpdate(false); // Đóng modal sau khi submit thành công
      fetchMajor();
      setDataMajor(null);
    } else {
      toast.error(`Cập nhâp thất bại`);
    }
  };

  const fetchMajorById = async () => {};

  useEffect(() => {
    fetchMajorById();
  }, [dataMajor, isModalOpenUpdate]);

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
    form.setFieldsValue({
      major: dataMajor?.name,
      department: dataMajor?.department.name,
      description: dataMajor?.description,
    });

    fetchDeparment();
  }, [isModalOpenUpdate]);

  return (
    <>
      <Modal
        title="Update Major"
        open={isModalOpenUpdate}
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
          </Form.Item>{" "}
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

export default ModalUpdateMajor;
