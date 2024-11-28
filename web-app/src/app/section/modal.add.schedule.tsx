import React, { useEffect, useState } from "react";
import {
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  InputNumberProps,
  Modal,
  Row,
  Select,
} from "antd";
import { reqApi } from "../api/axios/httpRequest";
import toast from "react-hot-toast";
import { IOptionsSelect } from "../interface/interface";
import {
  IDepartment,
  ISection,
  ISemester,
  ISubject,
} from "../interface/ITable";
import TimeInput from "../components/button/timeInput";

interface IProps {
  isScheduleModalOpenAdd: boolean;
  setIsScheduleModalOpenAdd: (isOpen: boolean) => void;
  fetchSection: () => void;
  sectionId: number;
}

interface FormValues {
  id: number;
  dayOfWeek: number;
  timeStart: string;
  timeEnd: string;
  sectionId: number;
  sections: ISection;
}

const ModalAddSchedule = (props: IProps) => {
  const {
    isScheduleModalOpenAdd,
    setIsScheduleModalOpenAdd,
    fetchSection,
    sectionId,
  } = props;

  const [form] = Form.useForm();

  const [dayOfWeek, setDayOfWeek] = useState<any[]>([]);

  const fetchDayOfWeek = async () => {
    const optionsDayOfWeek = Array.from({ length: 7 }, (_, index) => {
      if (index + 2 === 8) {
        return {
          value: `${index + 2}`,
          label: `Chủ nhật`, // Hiển thị năm
        };
      }
      return {
        value: `${index + 2}`,
        label: `${index + 2}`, // Hiển thị năm
      };
    });

    setDayOfWeek(optionsDayOfWeek);
  };
  // Gọi hàm fetchYear khi component được render lần đầu tiên
  useEffect(() => {
    fetchDayOfWeek();
  }, []);

  const handleOk = () => {
    form.submit(); // Submit form khi bấm nút OK

    // setIsModalOpenAdd(false);
  };

  const handleCancel = () => {
    setIsScheduleModalOpenAdd(false);
    form.resetFields();
  };

  const onFinish = async (values: FormValues) => {
    const res = await reqApi.post({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/schedule`,
      data: {
        dayOfWeek: values.dayOfWeek,
        timeStart: values.timeStart,
        timeEnd: values.timeEnd,
        sectionId: sectionId,
      },
    });

    if (res) {
      toast.success(`Tạo mới thành công ${res.data.name}`);
      form.resetFields();
      setIsScheduleModalOpenAdd(false);
      fetchSection();
    } else {
      toast.error("Tạo mới thất bại");
    }
  };

  return (
    <>
      <Modal
        title="Tạo mới lớp học"
        open={isScheduleModalOpenAdd}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form style={{ maxWidth: 800 }} form={form} onFinish={onFinish}>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="Thứ" name="dayOfWeek">
                <Select options={dayOfWeek} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            label="Thời gian bắt đầu"
            name="timeStart"
            valuePropName="value" // Chỉ định giá trị lấy từ TimeInput
            getValueFromEvent={(value) => value} // Lấy giá trị từ sự kiện onChange
            // initialValue={{ hours: 0, minutes: 0, seconds: 0 }} // Đặt giá trị mặc định là 07:00:00
          >
            <TimeInput />
          </Form.Item>

          <Form.Item
            label="Thời gian kết thúc"
            name="timeEnd"
            valuePropName="value"
            getValueFromEvent={(value) => value}
            // initialValue={{ hours: 0, minutes: 0, seconds: 0 }} // Đặt giá trị mặc định là 07:00:00
          >
            <TimeInput />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalAddSchedule;
