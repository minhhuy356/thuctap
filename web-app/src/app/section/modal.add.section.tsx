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
import { IDepartment, ISemester, ISubject } from "../interface/ITable";

interface IProps {
  isModalOpenAdd: boolean;
  setIsModalOpenAdd: (isOpen: boolean) => void;
  fetchSection: () => void;
}

interface FormValues {
  subjectId: number;
  name: string;
  year: number;
  character: string;
  startDate: string;
  endDate: string;
  // timeStart: { hours: number; minutes: number; seconds: number };
  // timeEnd: { hours: number; minutes: number; seconds: number };
}

const ModalAddSection = (props: IProps) => {
  const { isModalOpenAdd, setIsModalOpenAdd, fetchSection } = props;

  const [form] = Form.useForm();

  const [department, setDepartment] = useState<IOptionsSelect[]>([]);
  const [subject, setSubject] = useState<IOptionsSelect[]>([]);
  const [semester, setSemester] = useState<any[]>([]);
  const [year, setYear] = useState<IOptionsSelect[]>([]);

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

  const fetchSubject = async (departmentId: number) => {
    const res = await reqApi.get({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/subject?DepartmentId=${departmentId}`,
    });
    if (res) {
      const optionsSubject = res.data.map((item: ISubject) => {
        return {
          value: item.id,
          label: item.name,
        };
      });

      setSubject(optionsSubject);
    }
  };

  const fetchSemester = async () => {
    const optionsSemester = [
      {
        value: 1,
        label: "1",
      },
      {
        value: 2,
        label: "2",
      },
      {
        value: "Hè",
        label: "Hè",
      },
    ];
    const now = new Date().getFullYear();

    const optionsYear = Array.from({ length: 8 }, (_, index) => {
      const year = now + index; // Tính năm từ hiện tại lùi dần
      return {
        value: year,
        label: `${year}`, // Hiển thị năm
      };
    });

    setSemester(optionsSemester);
    setYear(optionsYear);
  };

  // Gọi hàm fetchYear khi component được render lần đầu tiên
  useEffect(() => {
    fetchDeparment();
    fetchSemester();
  }, []);

  const handleOk = () => {
    form.submit(); // Submit form khi bấm nút OK

    // setIsModalOpenAdd(false);
  };

  const handleCancel = () => {
    setIsModalOpenAdd(false);
    form.resetFields();
  };

  const onFinish = async (values: FormValues) => {
    var semesterId = null;

    if ((values.name, values.year)) {
      const res = await reqApi.get({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/semester?Name=${values.name}&AcademicYear=${values.year}`,
      });

      console.log("res", res);

      if (!res) {
        const res = await reqApi.post({
          url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/semester`,
          data: { name: values.name, academicYear: values.year },
        });
        semesterId = res?.data[0].id;
      }

      semesterId = res?.data[0].id;
    }

    // const formatTime = (time: {
    //   hours: number;
    //   minutes: number;
    //   seconds: number;
    // }) =>
    //   `${time.hours.toString().padStart(2, "0")}:${time.minutes
    //     .toString()
    //     .padStart(2, "0")}:${time.seconds.toString().padStart(2, "0")}`;

    // console.log("Form values:", values);

    // const timeStartFormatted = formatTime(values.timeStart);
    // const timeEndFormatted = formatTime(values.timeEnd);

    const res = await reqApi.post({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/section`,
      data: {
        subjectId: values.subjectId,
        semesterId: semesterId ?? null,
        character: values.character,
        startDate: values.startDate,
        endDate: values.endDate,
      },
    });

    if (res) {
      toast.success(`Tạo mới thành công ${res.data.name}`);
      form.resetFields();
      setIsModalOpenAdd(false);
      fetchSection();
    } else {
      toast.error("Tạo mới thất bại");
    }
  };

  const handleChange = (value: number) => {
    console.log(`selected ${value}`);
    fetchSubject(value);
  };

  return (
    <>
      <Modal
        title="Tạo mới lớp học"
        open={isModalOpenAdd}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form style={{ maxWidth: 800 }} form={form} onFinish={onFinish}>
          <Form.Item label="Khoa">
            <Select onChange={handleChange} options={department} />
          </Form.Item>
          <Row gutter={16}>
            <Col span={16}>
              <Form.Item label="Môn học" name="subjectId">
                <Select
                  options={subject}
                  disabled={subject ? subject.length === 0 : true}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Mã" name="character">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              {" "}
              <Form.Item label="Học kì" name="name">
                <Select options={semester} />
              </Form.Item>
            </Col>
            <Col span={12}>
              {" "}
              <Form.Item label="Năm" name="year">
                <Select options={year} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Ngày bắt đầu" name="startDate">
                <DatePicker />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Ngày kết thúc" name="endDate">
                <DatePicker />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default ModalAddSection;
