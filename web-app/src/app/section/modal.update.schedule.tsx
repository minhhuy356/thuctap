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
  Space,
} from "antd";
import { reqApi } from "../api/axios/httpRequest";
import toast from "react-hot-toast";
import {
  IDepartment,
  ISchedule,
  ISection,
  ISubject,
} from "../interface/ITable";
import { IOptionsSelect } from "../interface/interface";
import moment from "moment";
import dayjs from "dayjs";
import TimeInput from "../components/button/timeInput";

interface IProps {
  isScheduleModalOpenUpdate: boolean;
  setIsScheduleModalOpenUpdate: (isOpen: boolean) => void;
  fetchSection: () => void;
  dataSchedule: ISchedule | null;
  setDataSchedule: (dataSchedule: ISchedule | null) => void;
}

interface FormValues {
  id: number;
  dayOfWeek: number;
  timeStart: string;
  timeEnd: string;
  sectionId: number;
  sections: ISection;
}
const ModalUpdateSchedule = (props: IProps) => {
  const {
    isScheduleModalOpenUpdate,
    setIsScheduleModalOpenUpdate,
    fetchSection,
    dataSchedule,
    setDataSchedule,
  } = props;

  const [form] = Form.useForm();

  const [dayOfWeek, setDayOfWeek] = useState<any[]>([]);

  const fetchDayOfWeek = async () => {
    const optionsDayOfWeek = Array.from({ length: 7 }, (_, index) => {
      if (index === 7) {
        return {
          value: `${index}`,
          label: `Chủ nhật`, // Hiển thị năm
        };
      }
      return {
        value: `${index + 1}`,
        label: `${index + 1}`, // Hiển thị năm
      };
    });

    setDayOfWeek(optionsDayOfWeek);
  };

  const fetchSectionWithId = async () => {
    try {
      const res = await reqApi.get({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/section/${
          dataSchedule?.sectionId ?? 0
        }`,
      });
      if (res) {
        form.setFieldsValue({
          subject: res?.data?.subjects?.name ?? "",
          character: res?.data?.character ?? "",
          dayOfWeek: dataSchedule?.dayOfWeek,
          timeStart: dataSchedule?.timeStart || null,
          timeEnd: dataSchedule?.timeEnd || null,
        });
      }
    } catch (error) {
      console.error("Có lỗi xảy ra:", error);
    }
  };
  // Gọi hàm fetchYear khi component được render lần đầu tiên
  useEffect(() => {
    fetchSectionWithId();
    console.log("dataSchedule", dataSchedule);
    fetchDayOfWeek();
    // fetchSubject(dataSchedule?.subjects.departmentId ?? 0);
  }, [isScheduleModalOpenUpdate]);

  const handleOk = () => {
    form.submit(); // Submit form khi bấm nút OK

    setIsScheduleModalOpenUpdate(false);
  };

  const handleCancel = () => {
    setIsScheduleModalOpenUpdate(false);
    form.resetFields();
    setDataSchedule(null);
  };

  const onFinish = async (values: FormValues) => {
    console.log("Form values:", values);

    const res = await reqApi.put({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/schedule/${dataSchedule?.id}`,
      data: {
        dayOfWeek: values?.dayOfWeek,
        timeStart: values?.timeStart || null,
        timeEnd: values?.timeEnd || null,
        sectionId: dataSchedule?.sectionId,
      },
    });

    console.log(res);

    if (res) {
      toast.success(`Cập nhâp ${res.data.name} thành công`);
      form.resetFields();
      setIsScheduleModalOpenUpdate(false); // Đóng modal sau khi submit thành công
      fetchSection();
      setDataSchedule(null);
    } else {
      toast.error(`Cập nhâp thất bại`);
    }
  };

  return (
    <>
      <Modal
        title="Cập nhập lớp học"
        open={isScheduleModalOpenUpdate}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form style={{ maxWidth: 600 }} form={form} onFinish={onFinish}>
          <Row gutter={16}>
            <Col span={16}>
              <Form.Item label="Môn học" name="subject">
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Mã" name="character">
                <Input disabled />
              </Form.Item>
            </Col>
          </Row>
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
          >
            <TimeInput />
          </Form.Item>

          <Form.Item
            label="Thời gian kết thúc"
            name="timeEnd"
            valuePropName="value"
            getValueFromEvent={(value) => value}
          >
            <TimeInput />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalUpdateSchedule;
