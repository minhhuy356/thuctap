"use client";
import React from "react";
import type { FormProps } from "antd";
import { Button, Checkbox, Divider, Form, Input, Slider } from "antd";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Signin = () => {
  type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
  };

  const router = useRouter();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    console.log("Success:", values);

    // Gọi signIn với provider "credentials" và truyền username, password từ values
    const result = await signIn("credentials", {
      redirect: false, // Để không chuyển hướng tự động sau khi đăng nhập
      username: values.username, // Giả sử values có chứa username
      password: values.password, // Giả sử values có chứa password
    });

    console.log(result);
    if (result && result.ok) {
      console.log(result);
      toast.success("Đăng nhập thành công!");
      router.push("/");
    } else {
      toast.error("Tài khoản không hợp lệ!");
    }
  };
  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="min-h-screen w-full bg-regal-blue flex justify-center items-center relative px-2 ">
      <div className="py-2 ">
        <div className="shadow-slate-500 shadow-sm bg-white rounded-lg sm:flex w-fit transform ">
          <div className="py-12 px-8 max-w-[400px] bg-blue-500 text-white rounded-lg flex flex-col justify-between ">
            <div>
              <div className="font-popins text-3xl font-extrabold flex justify-center mb-2 ">
                MS
              </div>
              <div className="opacity-80">
                Quản lý sinh viên với các chức năng đơn giản
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex justify-center">Bạn chưa có tài khoản ?</div>
              <Link
                href="/register"
                className="decoration-solid underline flex justify-center"
              >
                Đăng kí
              </Link>
            </div>
          </div>
          <div className="py-12 px-8 max-w-[540px] w-full">
            <div className="font-popins text-2xl  flex justify-center mb-2 ">
              Đăng nhập
            </div>
            <Form
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinish}
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

              <div className="flex justify-between">
                <Form.Item<FieldType>
                  name="remember"
                  valuePropName="checked"
                  className="flex "
                >
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <Form.Item<FieldType> className="flex ">
                  <span className="text-blue-400 cursor-pointer underline decoration-solid">
                    Quên mật khẩu ?
                  </span>
                </Form.Item>
              </div>

              <Form.Item wrapperCol={{ offset: 0 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full"
                  onClick={() => onFinish}
                >
                  Login
                </Button>
              </Form.Item>
              <Divider orientation="center">
                <span className="text-gray-400">or</span>
              </Divider>
            </Form>
            <div className="sm:flex gap-4">
              <Form.Item wrapperCol={{ offset: 0 }} className="flex-1">
                <Button
                  className="w-full py-5"
                  icon={<FcGoogle className="size-6 " />}
                  onClick={() => signIn("google")}
                >
                  <span className="font-medium">Google</span>
                </Button>
              </Form.Item>
              {/* <Form.Item wrapperCol={{ offset: 0 }} className="flex-1">
                <Button
                  className="w-full py-5"
                  icon={<SiFacebook className="text-blue-600 size-6" />}
                >
                  <span className="font-medium">Facebook</span>
                </Button>
              </Form.Item> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Signin;
