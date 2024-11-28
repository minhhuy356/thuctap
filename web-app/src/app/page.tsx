"use client";

import React, { useEffect, useState } from "react";
import "./style/collapsed.css"; // CSS cho icon
import Header from "./components/header/header";
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Menu } from "antd";
import "./style.css";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { MdAccountCircle } from "react-icons/md";
import {
  FaBookOpen,
  FaCalendarAlt,
  FaBook,
  FaGraduationCap,
  FaChalkboardTeacher,
  FaBuilding,
} from "react-icons/fa";
import { GiBookshelf } from "react-icons/gi";
import { FaChalkboard } from "react-icons/fa6";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    key: "user",
    icon: <MdAccountCircle />,
    label: <Link href={"/account"}>Tài khoản</Link>,
  },
  {
    key: "department",
    icon: <FaBuilding />,
    label: <Link href={"/department"}>Khoa</Link>,
  },
  {
    key: "major",
    icon: <GiBookshelf />,
    label: <Link href={"/major"}>Chuyên ngành</Link>,
  },
  {
    key: "class",
    icon: <FaChalkboardTeacher />,
    label: <Link href={"/class"}>Lớp khóa</Link>,
  },
  {
    key: "course",
    icon: <FaGraduationCap />, // Icon cho khóa học hoặc học kỳ
    label: <Link href="/course">Học kỳ</Link>,
  },
  {
    key: "subject",
    icon: <FaBook />, // Icon cho môn học
    label: <Link href="/subject">Môn học</Link>,
  },
  {
    key: "section",
    icon: <FaChalkboard />,
    label: <Link href="/section ">Lớp học</Link>,
  },
  {
    key: "grade",
    icon: <FaBookOpen />, // Icon cho điểm hoặc thành tích học tập
    label: <Link href="/grade">Điểm</Link>,
  },
];

const Home = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setIsActive(!isActive);
    setCollapsed(!collapsed);
  };

  const pathname = usePathname(); // Dùng usePathname để lấy pathname trong App Router
  const router = useRouter();
  // Lấy phần cuối cùng của đường dẫn
  const currentPath = pathname.split("/").pop()!;

  if (!currentPath) {
    router.push("/dashboard");
  }

  return (
    <div className="bg-regal-blue min-h-screen">
      <div className="py-3 px-2 max-w-[1140px] m-auto flex flex-col gap-4">
        <div className=" flex gap-2 shadow-md p-4">
          <div className={`flex items-center w-1/5`}>
            <div className="flex gap-4">
              <div className="flex justify-center items-center hover:bg-slate-300 p-2 w-fit rounded-full">
                <div
                  className={`menu-icon ${isActive ? "active" : ""}`}
                  onClick={toggleCollapsed}
                >
                  <div className="">
                    <span></span>
                  </div>
                </div>
              </div>
              <div
                className={`hidden items-center font-bold sm:flex font-popins font-extrabold text-blue-400 cursor-pointer`}
              >
                <Link href={"/dashboard"}>MS</Link>
              </div>
            </div>
          </div>
          <div className="w-4/5">
            <Header />
          </div>
        </div>
        <div className="flex gap-2">
          <div
            className={`transition-all duration-300 ${
              isActive ? "w-1/12" : "w-1/5"
            }`}
          >
            <div className="sidebar">
              <div className="max-w-[215px] w-full">
                <Menu
                  selectedKeys={[currentPath]}
                  defaultSelectedKeys={["1"]}
                  defaultOpenKeys={["sub1"]}
                  mode="inline"
                  theme="light"
                  inlineCollapsed={collapsed}
                  items={items}
                  className="custom-menu"
                />
              </div>
            </div>
          </div>
          <div
            className={`transition-all duration-300 ${
              isActive ? "w-11/12" : "w-4/5"
            }`}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
