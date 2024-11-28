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
import { IDepartment, ICourse } from "../interface/ITable";
import toast from "react-hot-toast";

import { SearchOutlined } from "@ant-design/icons";
import type { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import useColumnSearch from "../components/search/useColumnSearch";
import ModalUpdateCourse from "./modal.update.course";
import ModalAddCourse from "./modal.add.course";

type TableRowSelection<T extends object = object> =
  TableProps<T>["rowSelection"];

type DataIndexCourse = keyof ICourse;

const Course = () => {
  const { data: session } = useSession();

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const [isModalOpenAdd, setIsModalOpenAdd] = useState<boolean>(false);
  const [isModalOpenUpdate, setIsModalOpenUpdate] = useState<boolean>(false);

  const [dataCourse, setDataCourse] = useState<ICourse | null>(null);
  const [data, setData] = useState<ICourse[]>([]);

  const [filterCourse, setFilterCourse] = useState<ICourse[]>([]);

  const { getColumnSearchProps } = useColumnSearch<ICourse>();

  useEffect(() => {
    fetchCourse();
  }, [session]);

  const fetchCourse = async () => {
    try {
      const res = await reqApi.get({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/course`,
      });
      if (res) {
        setData(res.data);
        console.log(res);
      }
    } catch (error) {
      console.error("Có lỗi xảy ra:", error);
    }
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<ICourse> = {
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

  const handleDeleteCourse = async (data: ICourse) => {
    const res = await reqApi.delete({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/course/${data.id}`,
    });

    if (res) {
      toast.success(` Xóa Course ${data.name} thành công`);
      fetchCourse();
    } else {
      toast.error(` Xóa Course thất bại`);
    }
  };

  const cancel: PopconfirmProps["onCancel"] = (e) => {
    console.log(e);
  };

  const handleOpenModalUpdate = (Course: ICourse) => {
    setDataCourse(Course);
    setIsModalOpenUpdate(true);
  };

  const columns: TableColumnsType<ICourse> = [
    {
      title: "ID",
      dataIndex: "id",
      render: (id: string, record: ICourse) => (
        <a
          className="underline text-primary-blue"
          onClick={() => handleOpenModalUpdate(record)}
        >
          {id}
        </a>
      ),
    },
    {
      title: "Course",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps(["name"]),
    },
    {
      title: "Năm học",
      dataIndex: "startYear", // Trường dữ liệu chính
      filters: filterCourse.map((item: ICourse) => ({
        value: item.id,
        text: item.startYear,
      })),
      onFilter: (value, record) => record.startYear === value,
      render: (startYear: number) => startYear,
    },
    {
      title: "Năm kết thúc",
      dataIndex: "endYear", // Trường dữ liệu chính
      filters: filterCourse.map((item: ICourse) => ({
        value: item.id,
        text: item.endYear,
      })),
      onFilter: (value, record) => record.endYear === value,
      render: (endYear: number) => endYear,
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (record: ICourse) => (
        <Popconfirm
          title="Xóa"
          description={`Bạn có muốn xóa Course ${record.name}?`}
          onConfirm={() => handleDeleteCourse(record)}
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
          <span className="text-3xl ">Course</span>
          <Add title="Thêm" setIsModalOpen={setIsModalOpenAdd} />
        </div>
        <Divider />
        <Flex gap="middle" vertical>
          <Table<ICourse>
            rowSelection={rowSelection}
            columns={columns}
            dataSource={data ? data : []}
            rowKey="id"
          />
        </Flex>
      </div>
      <ModalAddCourse
        isModalOpenAdd={isModalOpenAdd}
        setIsModalOpenAdd={setIsModalOpenAdd}
        fetchCourse={fetchCourse}
      />
      <ModalUpdateCourse
        isModalOpenUpdate={isModalOpenUpdate}
        setIsModalOpenUpdate={setIsModalOpenUpdate}
        fetchCourse={fetchCourse}
        dataCourse={dataCourse}
        setDataCourse={setDataCourse}
      />
    </Home>
  );
};

export default Course;
