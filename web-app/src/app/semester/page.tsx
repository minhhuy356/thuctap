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
import { IDepartment, ISemester } from "../interface/ITable";
import toast from "react-hot-toast";

import { SearchOutlined } from "@ant-design/icons";
import type { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import useColumnSearch from "../components/search/useColumnSearch";
import ModalUpdateSemester from "./modal.update.semester";
import ModalAddSemester from "./modal.add.subject";

type TableRowSelection<T extends object = object> =
  TableProps<T>["rowSelection"];

const Semester = () => {
  const { data: session } = useSession();

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const [isModalOpenAdd, setIsModalOpenAdd] = useState<boolean>(false);
  const [isModalOpenUpdate, setIsModalOpenUpdate] = useState<boolean>(false);

  const [dataSemester, setDataSemester] = useState<ISemester | null>(null);
  const [data, setData] = useState<ISemester[]>([]);

  const [filterDepartment, setFilterDepartment] = useState<IDepartment[]>([]);

  const { getColumnSearchProps } = useColumnSearch<ISemester>();

  useEffect(() => {
    fetchSemester();
    fetchDeparment();
  }, [session]);

  const fetchSemester = async () => {
    try {
      const res = await reqApi.get({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/Semester`,
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

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<ISemester> = {
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

  const handleDeleteSemester = async (data: ISemester) => {
    const res = await reqApi.delete({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/Semester/${data.id}`,
    });

    if (res) {
      toast.success(` Xóa Semester ${data.name} thành công`);
      fetchSemester();
    } else {
      toast.error(` Xóa Semester thất bại`);
    }
  };

  const cancel: PopconfirmProps["onCancel"] = (e) => {
    console.log(e);
  };

  const handleOpenModalUpdate = (Semester: ISemester) => {
    setDataSemester(Semester);
    setIsModalOpenUpdate(true);
  };

  const columns: TableColumnsType<ISemester> = [
    {
      title: "ID",
      dataIndex: "id",
      render: (id: string, record: ISemester) => (
        <a
          className="underline text-primary-blue"
          onClick={() => handleOpenModalUpdate(record)}
        >
          {id}
        </a>
      ),
    },
    {
      title: "Môn học",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps(["name"]),
    },
    {
      title: "Code",
      dataIndex: "code", // Trường dữ liệu chính
      render: (code: string) => code,
    },
    {
      title: "Tín chỉ",
      dataIndex: "creditHours", // Trường dữ liệu chính
      render: (creditHours: number) => creditHours,
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (record: ISemester) => (
        <Popconfirm
          title="Xóa"
          description={`Bạn có muốn xóa Semester ${record.name}?`}
          onConfirm={() => handleDeleteSemester(record)}
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
          <Table<ISemester>
            rowSelection={rowSelection}
            columns={columns}
            dataSource={data ? data : []}
            rowKey="id"
          />
        </Flex>
      </div>
      <ModalAddSemester
        isModalOpenAdd={isModalOpenAdd}
        setIsModalOpenAdd={setIsModalOpenAdd}
        fetchSemester={fetchSemester}
      />
      <ModalUpdateSemester
        isModalOpenUpdate={isModalOpenUpdate}
        setIsModalOpenUpdate={setIsModalOpenUpdate}
        fetchSemester={fetchSemester}
        dataSemester={dataSemester}
        setDataSemester={setDataSemester}
      />
    </Home>
  );
};

export default Semester;
