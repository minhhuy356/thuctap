import React, { useEffect, useState } from "react";
import { Form, Input, Modal, Select, Space } from "antd";
import { reqApi } from "../api/axios/httpRequest";
import toast from "react-hot-toast";
import { IDepartment, IMajor } from "../interface/ITable";

interface IProps {
  isModalOpenUpdate: boolean;
  setIsModalOpenUpdate: (isOpen: boolean) => void;
  fetchDepartment: () => void;
  _id: number | null;
  setId: (_id: number | null) => void;
}

interface FormValues {
  name: string;
  majors: [];
}

const ModalUpdateDepartment = (props: IProps) => {
  const {
    isModalOpenUpdate,
    setIsModalOpenUpdate,
    fetchDepartment,
    _id,
    setId,
  } = props;
  const [optionsMajors, setOptionsMajors] = useState<
    { label: string; value: number }[]
  >([]);
  const [previousMajors, setPreviousMajors] = useState<string[]>([]);
  const [dataMajors, setDataMajors] = useState<IMajor[] | null>(null);
  const [form] = Form.useForm();

  const handleOk = () => {
    form.submit(); // Submit form khi bấm nút OK

    setIsModalOpenUpdate(false);
  };

  const handleCancel = () => {
    setIsModalOpenUpdate(false);
    form.resetFields();
    setId(null);
  };

  const onFinish = async (values: FormValues) => {
    console.log("Form values:", values);

    const res = await reqApi.put({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/department/${_id}`,
      data: { Name: values.name },
    });

    console.log(res);

    if (res) {
      toast.success(`Cập nhâp ${res.data.name} thành công`);
      form.resetFields();
      setIsModalOpenUpdate(false); // Đóng modal sau khi submit thành công
      fetchDepartment();
      setId(null);
    } else {
      toast.error(`Cập nhâp thất bại`);
    }
  };

  const fetchDepartmentById = async () => {
    try {
      const resDepartment = await reqApi.get({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/department/${_id}`,
      });
      const resMajor = await reqApi.get({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/major?DepartmentId=${_id}`,
      });

      const resCurrentMajor = await reqApi.get({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/major?DepartmentId=${_id}&isSet=true`,
      });

      if (
        resDepartment &&
        resDepartment.data &&
        resMajor &&
        resMajor.data &&
        resCurrentMajor &&
        resCurrentMajor.data
      ) {
        const department: IDepartment = resDepartment.data;
        form.setFieldValue("name", department.name);

        // Danh sách majors trong department hiện tại
        const currentMajors = resCurrentMajor.data.map(
          (item: IMajor) => item.id
        );

        // Danh sách tất cả majors từ API
        const allMajors = resMajor.data.map((item: IMajor) => ({
          label: item.name,
          value: item.id,
        }));
        setOptionsMajors(allMajors);

        setDataMajors(resCurrentMajor.data);

        setPreviousMajors(currentMajors);

        // Thiết lập giá trị mặc định cho Select
        form.setFieldsValue({ majors: currentMajors });
      }
    } catch (error) {
      console.error("Failed to fetch department data:", error);
    }
  };

  useEffect(() => {
    fetchDepartmentById();
  }, [_id, isModalOpenUpdate]);

  const handleChange = async (values: string[]) => {
    console.log(`selected ${values}`);
    form.setFieldValue("majors", values);

    // Các giá trị đã được thêm vào (có trong `values` mới nhưng không có trong `previousValues`)
    const addedValues = values.filter(
      (value) => !previousMajors.includes(value)
    );

    // Các giá trị đã bị xóa (có trong `previousValues` nhưng không có trong `values` mới)
    const removedValues = previousMajors.filter(
      (value) => !values.includes(value)
    );
    console.log("Added:", addedValues);
    console.log("Removed:", removedValues);
    console.log("dataMajors:", dataMajors);
    if (addedValues) {
      const dataMajor = await reqApi.get({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/major/${addedValues[0]}`,
      });

      await reqApi.put({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/major/${addedValues[0]}`,
        data: {
          name: dataMajor?.data?.name,
          description: dataMajor?.data?.description || "",
          departmentId: _id,
          isSet: true,
        },
      });
    }
    if (removedValues) {
      const data = dataMajors?.find(
        (item: IMajor) => item.id === parseInt(removedValues[0])
      );
      await reqApi.put({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/major/${removedValues[0]}`,
        data: {
          name: data?.name,
          description: data?.description || "",
          departmentId: _id,
          isSet: false,
        },
      });
    }

    // Cập nhật `previousValues` với giá trị mới
    setPreviousMajors(values);
  };

  return (
    <>
      <Modal
        title="Create new Department"
        open={isModalOpenUpdate}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form style={{ maxWidth: 600 }} form={form} onFinish={onFinish}>
          <Form.Item
            label="Department"
            name="name"
            rules={[{ required: true, message: "Please input!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Majors"
            name="majors"
            rules={[{ required: true, message: "Please input!" }]}
          >
            <Select
              mode="multiple"
              style={{ width: "100%" }}
              placeholder="Select majors"
              options={optionsMajors} // Sử dụng options từ state
              defaultValue={form.getFieldValue("majors")} // Các giá trị majors hiện có
              onChange={(values) => handleChange(values)} // Cập nhật giá trị khi thay đổi
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalUpdateDepartment;
