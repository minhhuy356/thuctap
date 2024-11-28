import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  InputNumberProps,
  Modal,
  Radio,
  RadioChangeEvent,
} from "antd";
import { reqApi } from "../api/axios/httpRequest";
import toast from "react-hot-toast";
import { IAccount, IGrade, ISubject } from "../interface/ITable";

interface IProps {
  isModalOpenUpdate: boolean;
  setIsModalOpenUpdate: (isOpen: boolean) => void;
  fetchGrade: () => void;
  dataGrade: IGrade | null;
  setDataGrade: (dataGrade: IGrade | null) => void;
}

interface FormValues {
  appUserId: string;
  sectionId: number;
  score: Float64Array;
  isDone: boolean;
}

const ModalUpdateGrade = (props: IProps) => {
  const {
    isModalOpenUpdate,
    setIsModalOpenUpdate,
    fetchGrade,
    dataGrade,
    setDataGrade,
  } = props;

  const [value, setValue] = useState<boolean>(false);

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      appUser: dataGrade?.appUser.userName,
      subject: dataGrade?.section.subjects.name,
      score: dataGrade?.score,
      isDone: dataGrade?.isDone,
    });
  }, [isModalOpenUpdate]);

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    setIsModalOpenUpdate(false);
    form.resetFields();
    setDataGrade(null);
  };

  const onFinish = async (values: FormValues) => {
    console.log("Form values:", values);

    if (values.isDone && values.score === null) {
      toast.error("Nếu đã hoàn thành thì hãy ghi điểm cho học sinh!");
    }

    const res = await reqApi.put({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/grade/${dataGrade?.appUserId}&${dataGrade?.sectionId}`,
      data: {
        score: values.isDone ? values.score : null,
        isDone: values.isDone,
      },
    });

    console.log(res);

    if (res) {
      toast.success(`Cập nhâp ${res.data.name} thành công`);
      form.resetFields();
      setIsModalOpenUpdate(false); // Đóng modal sau khi submit thành công
      fetchGrade();
      setDataGrade(null);
    } else {
      toast.error(`Cập nhâp thất bại`);
    }
  };

  const onChangeInputNumber: InputNumberProps["onChange"] = (value) => {
    console.log("changed", value);
  };

  const onChangeRadio = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  return (
    <>
      <Modal
        title="Cập nhập điểm"
        open={isModalOpenUpdate}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form style={{ maxWidth: 600 }} form={form} onFinish={onFinish}>
          <Form.Item
            label="AppUser "
            name="appUser"
            rules={[{ required: true, message: "Please input!" }]}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="Môn học"
            name="subject"
            rules={[{ required: true, message: "Please input!" }]}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item label="Điểm" name="score">
            <InputNumber min={0} max={10} onChange={onChangeInputNumber} />
          </Form.Item>
          <Form.Item
            label="Hoàn thành"
            name="isDone"
            rules={[{ required: true, message: "Please input!" }]}
          >
            <Radio.Group onChange={onChangeRadio} value={value}>
              <Radio value={true}>Hoàn thành</Radio>
              <Radio value={false}>Đang học/ Nợ</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalUpdateGrade;
