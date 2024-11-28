"use client";

import React, { useEffect, useState } from "react";
import "./../../style/collapsed.css"; // CSS cho icon
import { UserOutlined } from "@ant-design/icons";
import {
  AutoComplete,
  Avatar,
  Dropdown,
  Flex,
  Image,
  Input,
  Space,
} from "antd";
import { FiSun, FiMoon } from "react-icons/fi";
import type { MenuProps } from "antd";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { access } from "fs";
const Header = () => {
  const { data: session } = useSession();

  const Title: React.FC<Readonly<{ title?: string }>> = (props) => (
    <Flex align="center" justify="space-between">
      {props.title}
      <a
        href="https://www.google.com/search?q=antd"
        target="_blank"
        rel="noopener noreferrer"
      >
        more
      </a>
    </Flex>
  );

  const renderItem = (title: string, count: number) => ({
    value: title,
    label: (
      <Flex align="center" justify="space-between">
        {title}
        <span>
          <UserOutlined /> {count}
        </span>
      </Flex>
    ),
  });
  const options = [
    {
      label: <Title title="Libraries" />,
      options: [
        renderItem("AntDesign", 10000),
        renderItem("AntDesign UI", 10600),
      ],
    },
    {
      label: <Title title="Solutions" />,
      options: [
        renderItem("AntDesign UI FAQ", 60100),
        renderItem("AntDesign FAQ", 30010),
      ],
    },
    {
      label: <Title title="Articles" />,
      options: [renderItem("AntDesign design language", 100000)],
    },
  ];
  const ModeItems: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <div className="flex gap-2 items-center">
          <FiSun className="size-4" /> Light
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div className="flex gap-2 items-center">
          <FiMoon className="size-4" /> Dark
        </div>
      ),
    },
  ];

  const UserItems: MenuProps["items"] = [
    {
      key: "1",
      label: <div className="flex gap-2 items-center">Setting</div>,
    },
    {
      key: "2",
      label: (
        <div
          className="flex gap-2 items-center"
          onClick={() => {
            signOut();
            localStorage.removeItem("access_token");
          }}
        >
          Logout
        </div>
      ),
    },
  ];
  return (
    <div className="flex justify-between gap-2 items-center">
      <AutoComplete
        popupClassName="certain-category-search-dropdown"
        popupMatchSelectWidth={500}
        className="max-w-[450px] w-full"
        options={options}
      >
        <Input.Search size="large" placeholder="input here" />
      </AutoComplete>

      <div className="flex gap-5 items-center">
        {session ? (
          <>
            <Dropdown
              menu={{ items: ModeItems }}
              trigger={["click"]}
              className="h-[24px] hidden sm:flex"
              placement={"bottomRight"}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <FiSun className="size-6 opacity-80 cursor-pointer" />
                </Space>
              </a>
            </Dropdown>
            <Dropdown
              menu={{ items: UserItems }}
              trigger={["click"]}
              placement={"bottomRight"}
              className="cursor-pointer flex items-center"
            >
              <a onClick={(e) => e.preventDefault()}>
                <Image
                  preview={false}
                  className="!w-[45px] !h-[45px] rounded-full shadow-sm shadow-gray-700"
                  srcSet={`${session.user?.image}`}
                />
              </a>
            </Dropdown>
          </>
        ) : (
          <Link href="/signin" className="cursor-pointer">
            Sign in
          </Link>
        )}
      </div>
    </div>
  );
};
export default Header;
