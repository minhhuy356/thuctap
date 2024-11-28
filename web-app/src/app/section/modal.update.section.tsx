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
import { IDepartment, ISection, ISubject } from "../interface/ITable";
import { IOptionsSelect } from "../interface/interface";
import moment from "moment";
import dayjs from "dayjs";

interface IProps {
  isModalOpenUpdate: boolean;
  setIsModalOpenUpdate: (isOpen: boolean) => void;
  fetchSection: () => void;
  dataSection: ISection | null;
  setDataSection: (dataSection: ISection | null) => void;
}

interface FormValues {
  departmentId: number;
  subjectId: number;
  name: string;
  year: number;
  character: string;
  startDate: string;
  endDate: string;
  // timeStart: { hours: number; minutes: number; seconds: number };
  // timeEnd: { hours: number; minutes: number; seconds: number };
}
const ModalUpdateSection = (props: IProps) => {
  const {
    isModalOpenUpdate,
    setIsModalOpenUpdate,
    fetchSection,
    dataSection,
    setDataSection,
  } = props;

  const [form] = Form.useForm();

  const [department, setDepartment] = useState<IOptionsSelect[]>([]);
  const [subject, setSubject] = useState<IOptionsSelect[]>([]);
  const [semester, setSemester] = useState<any[]>([]);
  const [year, setYear] = useState<any[]>([]);

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
        value: "1",
        label: "1",
      },
      {
        value: "2",
        label: "2",
      },
      {
        value: "Hè",
        label: "Hè",
      },
    ];
    const now = new Date().getFullYear();

    const optionsYear = Array.from({ length: 8 }, (_, index) => {
      const academicYear = now - 4;

      const year = academicYear + index; // Tính năm từ hiện tại lùi dần
      return {
        value: `${year}`,
        label: `${year}`, // Hiển thị năm
      };
    });

    setSemester(optionsSemester);
    setYear(optionsYear);
  };

  // Gọi hàm fetchYear khi component được render lần đầu tiên
  useEffect(() => {
    form.setFieldsValue({
      departmentId: dataSection?.subjects?.departmentId,
      subjectId: dataSection?.subjectId,
      character: dataSection?.character,
      name: dataSection?.semesters.name,
      year: dataSection?.semesters.academicYear,
      startDate: dataSection?.startDate ? dayjs(dataSection.startDate) : null,
      endDate: dataSection?.endDate ? dayjs(dataSection.endDate) : null,
    });

    fetchDeparment();
    fetchSemester();
    fetchSubject(dataSection?.subjects.departmentId ?? 0);
  }, [isModalOpenUpdate]);

  const handleOk = () => {
    form.submit(); // Submit form khi bấm nút OK

    setIsModalOpenUpdate(false);
  };

  const handleCancel = () => {
    setIsModalOpenUpdate(false);
    form.resetFields();
    setDataSection(null);
  };

  const onFinish = async (values: FormValues) => {
    console.log("Form values:", values);
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

    const res = await reqApi.put({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/section/${dataSection?.id}`,
      data: {
        subjectId: values?.subjectId,
        character: values?.character,
        startDate: values?.startDate,
        endDate: values?.endDate,
        semesterId: semesterId,
      },
    });

    console.log(res);

    if (res) {
      toast.success(`Cập nhâp ${res.data.name} thành công`);
      form.resetFields();
      setIsModalOpenUpdate(false); // Đóng modal sau khi submit thành công
      fetchSection();
      setDataSection(null);
    } else {
      toast.error(`Cập nhâp thất bại`);
    }
  };

  const handleChange = (value: number) => {
    console.log(`selected ${value}`);
    fetchSubject(value);

    form.setFieldValue("subjectId", null);
  };
  return (
    <>
      <Modal
        title="Cập nhập lớp học"
        open={isModalOpenUpdate}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form style={{ maxWidth: 600 }} form={form} onFinish={onFinish}>
          <Form.Item label="Khoa" name="departmentId">
            <Select onChange={handleChange} options={department} />
          </Form.Item>
          <Row gutter={16}>
            <Col span={16}>
              <Form.Item label="Môn học" name="subjectId">
                <Select options={subject} />
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

export default ModalUpdateSection;
