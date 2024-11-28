import React, { useEffect, useState } from "react";
import {
  Col,
  DatePicker,
  Form,
  Image,
  Input,
  Modal,
  Radio,
  Row,
  Select,
  Space,
} from "antd";
import { reqApi } from "../api/axios/httpRequest";
import toast from "react-hot-toast";
import {
  IAccount,
  IClass,
  IMajor,
  IDepartment,
  IRole,
} from "../interface/ITable";
import { IOptionsSelect } from "../interface/interface";
import moment from "moment";
import type { GetProp, RadioChangeEvent, UploadFile, UploadProps } from "antd";
import { message, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { UploadChangeParam } from "antd/es/upload";
import axios from "axios";

interface IProps {
  isModalOpenUpdate: boolean;
  setIsModalOpenUpdate: (isOpen: boolean) => void;
  fetchAccount: () => void;
  dataAccount: IAccount | null;
  setDataAccount: (dataAccount: IAccount | null) => void;
}

const optionsSex = [
  { value: true, label: "Nam" },
  { value: false, label: "Nữ" },
];

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const ModalUpdateAccount = (props: IProps) => {
  const {
    isModalOpenUpdate,
    setIsModalOpenUpdate,
    fetchAccount,
    dataAccount,
    setDataAccount,
  } = props;

  const [form] = Form.useForm();

  const [role, setRole] = useState<IOptionsSelect[]>([]);
  const [deparment, setDepartment] = useState<IOptionsSelect[]>([]);
  const [major, setMajor] = useState<IOptionsSelect[] | null>([]);
  const [classes, setClasses] = useState<IOptionsSelect[] | null>([]);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [urlImage, setUrlImage] = useState<string | null>(null);
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange = async ({
    file,
    fileList: newFileList,
  }: UploadChangeParam) => {
    setFileList(newFileList);

    if (file.status === "uploading") {
      return;
    }

    if (file.status === "done" || file.status === "error") {
      const formData = new FormData();
      console.log(file.originFileObj);
      // Kiểm tra file.originFileObj có phải là undefined không
      if (file.originFileObj) {
        formData.append("file", file.originFileObj);
      } else {
        message.error("File không hợp lệ!");
        return;
      }

      try {
        const token = localStorage.getItem("access_token"); // Hoặc bất kỳ phương thức nào để lấy token

        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/file-upload`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        setUrlImage(res.data.imageUrl);
        message.success("Upload thành công!");
      } catch (error) {
        message.error("Upload thất bại!");
      }
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  const fetchRole = async () => {
    const res = await reqApi.get({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/account/roles`,
    });

    if (res) {
      const optionsRole = res.data.map((item: IRole) => {
        return {
          value: item.id,
          label: item.name,
        };
      });

      setRole(optionsRole);
    }
  };
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
  const fetchMajor = async (deparmentId: number | null) => {
    if (deparmentId !== null) {
      const res = await reqApi.get({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/major?DepartmentId=${deparmentId}`,
      });
      if (res) {
        const optionsMajor = res.data.map((item: IMajor) => {
          return {
            value: item.id,
            label: item.name,
          };
        });

        if (optionsMajor.length === 0) {
          form.setFieldValue("majorId", null);
        }

        setMajor(optionsMajor);
      }
    } else {
      setMajor(null);
    }
  };
  const fetchClasses = async (deparmentId: number | null) => {
    if (deparmentId !== null) {
      const res = await reqApi.get({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/class?DepartmentId=${deparmentId}`,
      });
      if (res) {
        const optionsClass = res.data.map((item: IClass) => {
          return {
            value: item.id,
            label: item.name,
          };
        });
        if (optionsClass.length === 0) {
          form.setFieldValue("classId", null);
        }
        setClasses(optionsClass);
      }
    } else {
      setClasses(null);
    }
  };

  // Gọi hàm fetchYear khi component được render lần đầu tiên
  useEffect(() => {
    form.setFieldsValue({
      email: dataAccount?.email,
      userName: dataAccount?.userName,
      name: dataAccount?.name,
      birthDate: dataAccount?.birthDate ? moment(dataAccount.birthDate) : null,
      classId: dataAccount?.class?.id ?? null,
      departmentId: dataAccount?.department?.id ?? null,
      majorId: dataAccount?.major?.id ?? null,
      isInternal: dataAccount?.isInternal,
      male: dataAccount?.male,
      phoneNumber: dataAccount?.phoneNumber,
      role: dataAccount?.roleName,
      urlImage: dataAccount?.urlImage,
    });
    if (dataAccount?.department) {
      fetchMajor(dataAccount?.department.id);
      fetchClasses(dataAccount?.department.id);
    }

    fetchMajor(null);
    fetchClasses(null);

    // Cập nhật fileList từ urlImage nếu có
    if (dataAccount?.urlImage) {
      setFileList([
        {
          uid: "-1", // Định danh duy nhất cho item
          name: "image", // Tên hiển thị của ảnh
          status: "done", // Trạng thái tải lên
          url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/images/user/${dataAccount.urlImage}`, // Đường dẫn ảnh
        },
      ]);
    }

    fetchRole();
    fetchDeparment();
  }, [isModalOpenUpdate]);

  const handleOk = () => {
    form.submit(); // Submit form khi bấm nút OK

    // setIsModalOpenUpdate(false);
  };

  const handleCancel = () => {
    setIsModalOpenUpdate(false);
    form.resetFields();
    setDataAccount(null);
    setUrlImage(null);
    setFileList([]);
  };

  const onFinish = async (values: IAccount) => {
    console.log("Form values:", values);

    const res = await reqApi.put({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/account/${dataAccount?.id}`,
      data: {
        email: values.email,
        userName: values.userName,
        name: values.name,
        birthDate: values.birthDate,
        classId: values.classId,
        departmentId: values.departmentId,
        majorId: values.majorId,
        isInternal: values.isInternal,
        urlImage: urlImage,
        male: values.male,
        phoneNumber: values.phoneNumber,
      },
    });

    console.log(res);

    if (res) {
      toast.success(`Cập nhâp ${res.data.name} thành công`);
      form.resetFields();
      setIsModalOpenUpdate(false); // Đóng modal sau khi submit thành công
      fetchAccount();
      setDataAccount(null);
    } else {
      toast.error(`Cập nhâp thất bại`);
    }
  };

  const handleChangeDepartment = (value: number) => {
    console.log(`selected ${value}`);
    fetchMajor(value);
    fetchClasses(value);
  };

  const [value, setValue] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  return (
    <>
      <Modal
        title="Update Account"
        open={isModalOpenUpdate}
        onOk={handleOk}
        onCancel={handleCancel}
        className="!max-w-[1000px] !w-full"
      >
        <Form
          className="w-full"
          form={form}
          onFinish={onFinish}
          layout="vertical"
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Email" name="email">
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Tài khoản" name="userName">
                <Input disabled />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Tên" name="name">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              {" "}
              <Form.Item label="Số điện thoại" name="phoneNumber">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Ngày sinh" name="birthDate">
                <DatePicker className="!w-full" format="DD-MM-YYYY" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Giới tính" name="male">
                <Select options={optionsSex} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              {" "}
              <Form.Item label="Khoa" name="departmentId">
                <Select options={deparment} onChange={handleChangeDepartment} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Chuyên ngành"
                name="majorId"
                validateTrigger="onSubmit"
              >
                <Select
                  options={major ? major : []}
                  disabled={major ? major.length === 0 : true}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Lớp" name="classId">
                <Select
                  options={classes ? classes : []}
                  disabled={classes ? classes.length === 0 : true}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="Vai trò"
                name="role"
                rules={[{ required: true, message: "Please input!" }]}
              >
                <Select options={role} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Ảnh" name="urlImage" layout="horizontal">
                <Upload
                  listType="picture-circle"
                  fileList={fileList}
                  onPreview={handlePreview}
                  onChange={handleChange}
                >
                  {fileList.length >= 1 ? null : uploadButton}
                </Upload>
                {previewImage && (
                  <Image
                    wrapperStyle={{ display: "none" }}
                    preview={{
                      visible: previewOpen,
                      onVisibleChange: (visible) => setPreviewOpen(visible),
                      afterOpenChange: (visible) =>
                        !visible && setPreviewImage(""),
                    }}
                    src={previewImage}
                  />
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              {" "}
              <Form.Item
                label="Ngoài / Trao đổi"
                name="isInternal"
                rules={[{ required: true, message: "Please input!" }]}
              >
                <Radio.Group onChange={onChange} value={value}>
                  <Radio value={true}>Có</Radio>
                  <Radio value={false}>Không</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default ModalUpdateAccount;
