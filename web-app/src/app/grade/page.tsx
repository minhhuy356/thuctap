"use client";
import { useEffect, useRef, useState } from "react";
import Home from "../page";
import { reqApi } from "../api/axios/httpRequest";
import { IoAdd } from "react-icons/io5";
import { useSession } from "next-auth/react";

import { Button, Divider, Flex, Input, Popconfirm, Space, Table } from "antd";
import type {
  PopconfirmProps,
  TableColumnsType,
  TableProps,
  TableColumnType,
  InputRef,
} from "antd";
import Add from "../components/button/add";
import {
  IAccount,
  IDepartment,
  IGrade,
  ISection,
  ISubject,
} from "../interface/ITable";
import toast from "react-hot-toast";

import { SearchOutlined } from "@ant-design/icons";
import type { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import useColumnSearch from "../components/search/useColumnSearch";
import ModalUpdateGrade from "./modal.update.grade";
import ModalAddGrade from "./modal.add.grade";
import { IFilter } from "../interface/interface";

type TableRowSelection<T extends object = object> =
  TableProps<T>["rowSelection"];

const Grade = () => {
  const { data: session } = useSession();

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const [isModalOpenAdd, setIsModalOpenAdd] = useState<boolean>(false);
  const [isModalOpenUpdate, setIsModalOpenUpdate] = useState<boolean>(false);

  const [dataGrade, setDataGrade] = useState<IGrade | null>(null);
  const [data, setData] = useState<IGrade[]>([]);

  const [filterSubject, setFilterSubject] = useState<IFilter[]>([]);

  const { getColumnSearchProps } = useColumnSearch<IGrade>();

  useEffect(() => {
    fetchGrade();
  }, [session]);

  const fetchGrade = async () => {
    try {
      const res = await reqApi.get({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/grade`,
      });
      if (res) {
        setData(res.data);
      }
    } catch (error) {
      console.error("Có lỗi xảy ra:", error);
    }
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<IGrade> = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: "odd",
        text: "Select Odd Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: "even",
        text: "Select Even Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };

  const handleDeleteGrade = async (data: IGrade) => {
    const res = await reqApi.delete({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/grade/${data.appUserId}&${data.sectionId}`,
    });

    if (res) {
      toast.success(
        ` Xóa người dùng ${data?.appUser.name} ở lớp ${data?.section.subjects.name} thành công`
      );
      fetchGrade();
    } else {
      toast.error(` Xóa Grade thất bại`);
    }
  };

  const cancel: PopconfirmProps["onCancel"] = (e) => {
    console.log(e);
  };

  const handleOpenModalUpdate = (Grade: IGrade) => {
    setDataGrade(Grade);
    setIsModalOpenUpdate(true);
  };

  const columns: TableColumnsType<IGrade> = [
    {
      title: "Số thứ tự",
      dataIndex: "stt",
      key: "stt",
      render: (_: any, record: IGrade, index: number) => (
        <a onClick={() => handleOpenModalUpdate(record)}>{index + 1}</a>
      ),
    },
    {
      title: "Người dùng",
      dataIndex: "appUser",
      key: "appUser",
      render: (appUser: IAccount) => <span>{appUser?.userName ?? null}</span>,

      ...getColumnSearchProps(["appUser", "userName"]),
    },
    {
      title: "Môn học",
      dataIndex: ["section", "subjects", "name"],
      key: "name",
      render: (name: string) => <span>{name ?? null}</span>,
      filters: filterSubject,
      onFilter: (value, record) => record.section.subjects.name === value,
    },
    {
      title: "Điểm",
      dataIndex: "score",
      key: "score",
      render: (score: Float64Array) => score ?? null,
    },
    {
      title: "Hoàn thành",
      dataIndex: "isDone",
      key: "isDone",
      render: (isDone: boolean) => (isDone ? "Hoàn thành" : "Đang học"),
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (record: IGrade) => (
        <Popconfirm
          title="Xóa"
          description={`Bạn có muốn xóa người dùng ${record?.appUser?.name} ở lớp ${record?.section.subjects?.name}?`}
          onConfirm={() => handleDeleteGrade(record)}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <Button danger>Delete</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <Home>
      <div className="bg-white rounded-lg py-4 px-4">
        <div className="flex justify-between">
          <span className="text-3xl ">Môn học</span>
          <Add title="Thêm" setIsModalOpen={setIsModalOpenAdd} />
        </div>
        <Divider />
        <Flex gap="middle" vertical>
          <Table<IGrade>
            rowSelection={rowSelection}
            columns={columns}
            dataSource={data ? data : []}
            rowKey="id"
          />
        </Flex>
      </div>
      <ModalAddGrade
        isModalOpenAdd={isModalOpenAdd}
        setIsModalOpenAdd={setIsModalOpenAdd}
        fetchGrade={fetchGrade}
      />
      <ModalUpdateGrade
        isModalOpenUpdate={isModalOpenUpdate}
        setIsModalOpenUpdate={setIsModalOpenUpdate}
        fetchGrade={fetchGrade}
        dataGrade={dataGrade}
        setDataGrade={setDataGrade}
      />
    </Home>
  );
};

export default Grade;
