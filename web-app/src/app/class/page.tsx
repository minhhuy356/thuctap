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
import { IDepartment, IClass, ICourse } from "../interface/ITable";
import toast from "react-hot-toast";

import { SearchOutlined } from "@ant-design/icons";
import type { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import useColumnSearch from "../components/search/useColumnSearch";
import ModalUpdateClass from "./modal.update.class";
import ModalAddClass from "./modal.add.class";

type TableRowSelection<T extends object = object> =
  TableProps<T>["rowSelection"];

const Class = () => {
  const { data: session } = useSession();

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const [isModalOpenAdd, setIsModalOpenAdd] = useState<boolean>(false);
  const [isModalOpenUpdate, setIsModalOpenUpdate] = useState<boolean>(false);

  const [dataClass, setDataClass] = useState<IClass | null>(null);
  const [data, setData] = useState<IClass[]>([]);

  const [filterDeparment, setFilterDepartment] = useState<IDepartment[]>([]);
  const [filterCourse, setFilterCourse] = useState<ICourse[]>([]);

  const { getColumnSearchProps } = useColumnSearch<IClass>();

  useEffect(() => {
    fetchClass();
    fetchDeparment();
    fetchCourse();
  }, [session]);

  const fetchClass = async () => {
    try {
      const res = await reqApi.get({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/Class`,
      });
      if (res) {
        setData(res.data);
        console.log(res);
      }
    } catch (error) {
      console.error("Có lỗi xảy ra:", error);
    }
  };

  const fetchDeparment = async () => {
    try {
      const res = await reqApi.get({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/department`,
      });

      if (res) {
        setFilterDepartment(res.data);
      }
    } catch (error) {
      console.error("Có lỗi xảy ra:", error);
    }
  };

  const fetchCourse = async () => {
    try {
      const res = await reqApi.get({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/course`,
      });

      if (res) {
        setFilterCourse(res.data);
      }
    } catch (error) {
      console.error("Có lỗi xảy ra:", error);
    }
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<IClass> = {
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

  const handleDeleteClass = async (data: IClass) => {
    const res = await reqApi.delete({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/class/${data.id}`,
    });

    if (res) {
      toast.success(` Xóa Class ${data.name} thành công`);
      fetchClass();
    } else {
      toast.error(` Xóa Class thất bại`);
    }
  };

  const cancel: PopconfirmProps["onCancel"] = (e) => {
    console.log(e);
  };

  const handleOpenModalUpdate = (Class: IClass) => {
    setDataClass(Class);
    setIsModalOpenUpdate(true);
    console.log(Class);
  };

  const columns: TableColumnsType<IClass> = [
    {
      title: "ID",
      dataIndex: "id",
      render: (id: number, record: IClass) => (
        <a
          className="underline text-primary-blue"
          onClick={() => handleOpenModalUpdate(record)}
        >
          {id}
        </a>
      ),
    },
    {
      title: "Class",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps(["name"]),
    },
    {
      title: "Department",
      dataIndex: "department", // Trường dữ liệu chính
      filters: filterDeparment.map((item: IDepartment) => ({
        value: item.id,
        text: item.name,
      })),
      onFilter: (value, record) => record.department.name === value,
      render: (department: IDepartment) => department?.name,
    },
    {
      title: "Course",
      dataIndex: "course", // Trường dữ liệu chính
      filters: filterCourse.map((item: ICourse) => ({
        value: item.id,
        text: item.name,
      })),
      onFilter: (value, record) => record.course.name === value,
      render: (course: ICourse) => course?.name,
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (record: IClass) => (
        <Popconfirm
          title="Xóa"
          description={`Bạn có muốn xóa Class ${record.name}?`}
          onConfirm={() => handleDeleteClass(record)}
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
          <span className="text-3xl ">Class</span>
          <Add title="Thêm" setIsModalOpen={setIsModalOpenAdd} />
        </div>
        <Divider />
        <Flex gap="middle" vertical>
          <Table<IClass>
            rowSelection={rowSelection}
            columns={columns}
            dataSource={data ? data : []}
            rowKey="id"
          />
        </Flex>
      </div>
      <ModalAddClass
        isModalOpenAdd={isModalOpenAdd}
        setIsModalOpenAdd={setIsModalOpenAdd}
        fetchClass={fetchClass}
      />
      <ModalUpdateClass
        isModalOpenUpdate={isModalOpenUpdate}
        setIsModalOpenUpdate={setIsModalOpenUpdate}
        fetchClass={fetchClass}
        dataClass={dataClass}
        setDataClass={setDataClass}
      />
    </Home>
  );
};

export default Class;
