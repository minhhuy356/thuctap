import React, { useEffect, useState } from "react";
import {
  Col,
  Form,
  Input,
  InputNumber,
  InputNumberProps,
  Modal,
  Radio,
  RadioChangeEvent,
  Row,
  Select,
} from "antd";
import { reqApi } from "../api/axios/httpRequest";
import toast from "react-hot-toast";
import { IOptionsSelect } from "../interface/interface";
import { IAccount, ISection } from "../interface/ITable";

interface IProps {
  isModalOpenAdd: boolean;
  setIsModalOpenAdd: (isOpen: boolean) => void;
  fetchGrade: () => void;
}

interface FormValues {
  appUserId: string;
  sectionId: number;
  score: Float64Array;
  isDone: boolean;
  subjectId: number;
  character: string;
}

const ModalAddGrade = (props: IProps) => {
  const { isModalOpenAdd, setIsModalOpenAdd, fetchGrade } = props;

  const [value, setValue] = useState<boolean>(false);

  const [account, setAccount] = useState<IOptionsSelect[] | null>(null);
  const [department, setDepartment] = useState<IOptionsSelect[] | null>(null);
  const [departmentSubjectsMap, setDepartmentSubjectsMap] = useState<
    Record<number, IOptionsSelect[]>
  >({});

  const [selectedSubjects, setSelectedSubjects] = useState<
    { value: number; label: string }[]
  >([]);
  const [character, setCharacter] = useState<IOptionsSelect[] | null>(null);
  const [optionNameSemester, setOptionNameSemester] = useState<any[]>([]);
  const [optionYear, setOptionYear] = useState<any[]>([]);
  const [nameSemester, setNameSemester] = useState<string | null>(null);
  const [year, setYear] = useState<string | null>(null);
  const [semesterId, setSemesterId] = useState<string | null>(null);
  const [isGrade, setIsGrade] = useState<boolean>(true);
  const [form] = Form.useForm();

  const fetchAccount = async () => {
    const res = await reqApi.get({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/account`,
    });
    if (res) {
      const filterUser = res.data.filter(
        (item: IAccount) => item.roleName === "User"
      );

      const optionsAccount = filterUser.map((item: IAccount) => {
        return {
          value: item.id,
          label: item.userName,
        };
      });

      setAccount(optionsAccount);
    }
  };

  const fetchCharacter = async (subjectId: number) => {
    const res = await reqApi.get({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/section?SubjectId=${subjectId}`,
    });
    if (res) {
      const optionsCharacter = res.data.map((item: ISection) => {
        return {
          value: item.character,
          label: item.character,
        };
      });

      setCharacter(optionsCharacter);
    }
  };

  const fetchYearAndNameSemseter = async () => {
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

    setOptionNameSemester(optionsSemester);
    setOptionYear(optionsYear);
  };

  useEffect(() => {
    fetchAccount();
    fetchYearAndNameSemseter();
  }, [isModalOpenAdd]);

  const handleOk = () => {
    form.submit(); // Submit form khi bấm nút OK

    setIsModalOpenAdd(false);
  };

  const handleCancel = () => {
    setIsModalOpenAdd(false);
    form.resetFields();
  };

  const onFinish = async (values: FormValues) => {
    console.log("Form values:", values);

    const dataSection = await reqApi.get({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/section?SemesterId=${semesterId}&SubjectId=${values.subjectId}&Character=${values.character}`,
    });

    if (dataSection) {
      const sectionId = dataSection.data[0].id;

      const res = await reqApi.post({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/grade`,
        data: {
          appUserId: values.appUserId,
          sectionId: sectionId,
          score: values.isDone === false ? null : values.score,
          isDone: values.isDone,
        },
      });

      console.log(res);

      if (res) {
        toast.success(`Tạo mới thành công ${res.data.name}`);
        form.resetFields();
        setIsModalOpenAdd(false); // Đóng modal sau khi submit thành công
        fetchGrade();
      } else {
        toast.error(`Tạo mới thất bại`);
      }
    }
  };

  const onChangeInputNumber: InputNumberProps["onChange"] = (value) => {
    console.log("changed", value);
  };

  const onChangeRadio = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  const handleChangeDepartment = (departmentId: number) => {
    form.setFieldValue("subject", null);
    setSelectedSubjects([]); // Hiển thị danh sách subjects
    const subjects = departmentSubjectsMap[departmentId] || [];
    setSelectedSubjects(subjects); // Hiển thị danh sách subjects
  };

  const handleChangeSubject = (value: number) => {
    console.log(`Selected: ${value}`);
    fetchCharacter(value);
  };

  const handleChangeYear = (value: string) => {
    console.log(`Selected: ${value}`);
    setYear(value);
  };

  const handleChangeName = (value: string) => {
    console.log(`Selected: ${value}`);
    setNameSemester(value);
  };

  const handleChangeGrade = (value: string) => {
    console.log(`Selected: ${value}`);
    setIsGrade(false);
  };

  const fetchSemester = async () => {
    if (year && nameSemester) {
      setDepartment([]);

      const res = await reqApi.get({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/semester?Name=${nameSemester}&AcademicYear=${year}`,
      });

      if (res) {
        const semesterId = res.data[0]?.id;

        if (semesterId !== undefined) {
          setSemesterId(semesterId);

          const dataSection = await reqApi.get({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/section?SemesterId=${semesterId}`,
          });

          // Lưu departments và subjects
          const uniqueDepartments: { value: number; label: string }[] = [];
          const departmentSubjectsMap: Record<
            number,
            { value: number; label: string }[]
          > = {};
          const departmentIds = new Set<number>();
          const departmentSubjectsSet: Record<number, Set<number>> = {};

          dataSection?.data.forEach((item: ISection) => {
            const department = item.subjects.department;

            if (department) {
              // Thêm vào danh sách departments nếu chưa tồn tại
              if (!departmentIds.has(department.id)) {
                uniqueDepartments.push({
                  value: department.id,
                  label: department.name,
                });
                departmentIds.add(department.id);
                departmentSubjectsSet[department.id] = new Set(); // Tạo Set cho mỗi department
              }

              // Thêm subject vào map của department nếu chưa tồn tại
              if (!departmentSubjectsSet[department.id].has(item.subjects.id)) {
                if (!departmentSubjectsMap[department.id]) {
                  departmentSubjectsMap[department.id] = [];
                }
                departmentSubjectsMap[department.id].push({
                  value: item.subjects.id,
                  label: item.subjects.name,
                });
                departmentSubjectsSet[department.id].add(item.subjects.id); // Đánh dấu subject đã thêm
              }
            }
          });

          setDepartment(uniqueDepartments);
          setDepartmentSubjectsMap(departmentSubjectsMap); // Lưu map department-subjects
        }
      }
    }
  };

  useEffect(() => {
    fetchSemester();
  }, [year, nameSemester]);
  return (
    <>
      <Modal
        title="Nhập điểm"
        open={isModalOpenAdd}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form style={{ maxWidth: 600 }} form={form} onFinish={onFinish}>
          <Form.Item
            label="Tài khoản"
            name="appUserId"
            rules={[{ required: true, message: "Please input!" }]}
          >
            <Select options={account ?? []} />
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Học kì"
                name="name"
                rules={[{ required: true, message: "Please input!" }]}
              >
                <Select
                  options={optionNameSemester}
                  onChange={handleChangeName}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Năm"
                name="year"
                rules={[{ required: true, message: "Please input!" }]}
              >
                <Select options={optionYear} onChange={handleChangeYear} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="Department"
                name="departmentId"
                rules={[{ required: true, message: "Please input!" }]}
              >
                <Select
                  options={department ?? []}
                  onChange={handleChangeDepartment}
                  disabled={department ? department.length === 0 : true}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Môn học"
                name="subjectId"
                rules={[{ required: true, message: "Please input!" }]}
              >
                <Select
                  options={selectedSubjects ?? []}
                  onChange={handleChangeSubject}
                  disabled={
                    selectedSubjects ? selectedSubjects.length === 0 : true
                  }
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Lớp"
                name="character"
                rules={[{ required: true, message: "Please input!" }]}
              >
                <Select
                  options={character ?? []}
                  disabled={character ? false : true}
                  onChange={handleChangeGrade}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Điểm"
                name="score"
                rules={[{ required: true, message: "Please input!" }]}
              >
                <InputNumber
                  min={0}
                  max={10}
                  onChange={onChangeInputNumber}
                  disabled={isGrade}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
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
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default ModalAddGrade;
