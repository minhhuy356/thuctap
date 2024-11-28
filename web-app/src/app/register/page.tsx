"use client";
import React from "react";
import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input } from "antd";
import Link from "next/link";
import { reqApi } from "../api/axios/httpRequest";
import axios from "axios";
import toast from "react-hot-toast";

const Register = () => {
  type FieldType = {
    username?: string;
    password?: string;
    confirmPassword?: string;
    email: string;
  };

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    console.log("Success:", values);

    try {
      const res = await axios.post(
        "http://localhost:5062/api/account/register",
        {
          userName: values.username,
          email: values.email,
          password: values.password,
        }
      );
      console.log(res.data);
      if (res) {
        toast.success(
          "Đắng ký thành công! Hãy kiểm tra hồm thư gmail của bạn và Xác nhận!"
        );

        const resEmail = await axios.post(
          `http://localhost:5062/api/email/send?AppUserId=${res.data.id}&Token=${res.data.token.accessToken}`,
          {
            toAddress: values.email,
            subject: "Test",
            body: "<h1>Test</h1>",
            attachmentPath: "string",
          }
        );
        console.log(resEmail);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        // Lấy chi tiết lỗi từ server
        if (Array.isArray(error.response.data)) {
          // Chuyển mảng lỗi thành chuỗi
          const errorMessages = error.response.data
            .map((item) => item.description) // Lấy phần 'description' của mỗi lỗi
            .join(" "); // Gộp thành chuỗi

          toast.error(errorMessages);
        }
      } else {
        // Xử lý các lỗi khác không liên quan đến server
        console.log("Lỗi khác:", error);
        toast.error("Đã xảy ra lỗi. Vui lòng kiểm tra kết nối mạng.");
      }
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="min-h-screen w-full bg-regal-blue flex justify-center items-center relative py-2">
      <div className="py-3 px-2">
        <div className="shadow-slate-500 shadow-sm bg-white rounded-lg flex w-fit transform ">
          <div className="py-12 px-8 max-w-[400px] bg-blue-500 text-white rounded-lg flex flex-col justify-between ">
            <div>
              <div className="font-popins text-3xl font-extrabold flex justify-center mb-2 ">
                MS
              </div>
              <div className="opacity-80">
                Quản lý sinh viên với các chức năng đơn giản
              </div>
            </div>
            <div>
              <div>Bạn đã có tài khoản?</div>
              <Link
                href="/signin"
                className="decoration-solid underline flex justify-center"
              >
                Đăng nhập
              </Link>
            </div>
          </div>
          <div className="py-12 px-8 max-w-[540px] w-full">
            <div className="font-popins text-2xl  flex justify-center mb-2 ">
              Đăng kí
            </div>
            <Form
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              layout="vertical"
              className="w-full"
            >
              <Form.Item<FieldType>
                label="Tên đăng nhập"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Không được để trống tên đăng nhập!",
                  },
                ]}
                className="w-full"
              >
                <Input />
              </Form.Item>
              <Form.Item<FieldType>
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Không được để trống tên email!",
                  },
                  {
                    type: "email",
                    message: "Email không hợp lệ!", // Thông báo lỗi nếu email sai định dạng
                  },
                ]}
                className="w-full"
              >
                <Input />
              </Form.Item>

              <Form.Item<FieldType>
                label="Mật khẩu"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Không được để trống mật khẩu!",
                  },
                ]}
                className="w-full"
              >
                <Input.Password />
              </Form.Item>

              <Form.Item<FieldType>
                label="Xác nhận mật khẩu"
                name="confirmPassword" // Đặt tên khác để không bị trùng
                dependencies={["password"]} // Kiểm tra sự thay đổi của 'password'
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Không được để trống xác nhận mật khẩu!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error("Mật khẩu không khớp!"));
                    },
                  }),
                ]}
                className="w-full"
              >
                <Input.Password />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 0 }}>
                <Button type="primary" htmlType="submit" className="w-full">
                  Login
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Register;
