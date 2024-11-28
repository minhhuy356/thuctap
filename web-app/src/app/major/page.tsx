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
import { IDepartment, IMajor } from "../interface/ITable";
import toast from "react-hot-toast";
import ModalAddMajor from "./modal.add.major";
import ModalUpdateMajor from "./modal.update.major";
import { SearchOutlined } from "@ant-design/icons";
import type { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import useColumnSearch from "../components/search/useColumnSearch";

type TableRowSelection<T extends object = object> =
  TableProps<T>["rowSelection"];

type DataIndexMajor = keyof IMajor;

const Major = () => {
  const { data: session } = useSession();

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const [isModalOpenAdd, setIsModalOpenAdd] = useState<boolean>(false);
  const [isModalOpenUpdate, setIsModalOpenUpdate] = useState<boolean>(false);

  const [dataMajor, setDataMajor] = useState<IMajor | null>(null);
  const [data, setData] = useState<IMajor[]>([]);

  const [filterDeparment, setFilterDepartment] = useState<IDepartment[]>([]);

  const { getColumnSearchProps } = useColumnSearch<IMajor>();

  useEffect(() => {
    fetchMajor();
    fetchDeparment();
  }, [session]);

  const fetchMajor = async () => {
    try {
      const res = await reqApi.get({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/major`,
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

  const rowSelection: TableRowSelection<IMajor> = {
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

  const handleDeleteMajor = async (data: IMajor) => {
    const res = await reqApi.delete({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/major/${data.id}`,
    });

    if (res) {
      toast.success(` Xóa Major ${data.name} thành công`);
      fetchMajor();
    } else {
      toast.error(` Xóa Major thất bại`);
    }
  };

  const cancel: PopconfirmProps["onCancel"] = (e) => {
    console.log(e);
  };

  const handleOpenModalUpdate = (major: IMajor) => {
    setDataMajor(major);
    setIsModalOpenUpdate(true);
  };

  const columns: TableColumnsType<IMajor> = [
    {
      title: "ID",
      dataIndex: "id",
      render: (id: string, record: IMajor) => (
        <a
          className="underline text-primary-blue"
          onClick={() => handleOpenModalUpdate(record)}
        >
          {id}
        </a>
      ),
    },
    {
      title: "Major",
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
      onFilter: (value, record) => record.departmentId === value,
      render: (department: IDepartment) => department?.name,
    },
    {
      title: "Sử dụng",
      dataIndex: "isSet", // Trường dữ liệu chính
      filters: [
        { value: false, text: "X" },
        { value: true, text: "V" },
      ],
      onFilter: (value, record) => record.isSet === value,
      render: (isSet: boolean) => <>{isSet ? "V" : "X"}</>,
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (record: IMajor) => (
        <Popconfirm
          title="Xóa"
          description={`Bạn có muốn xóa Major ${record.name}?`}
          onConfirm={() => handleDeleteMajor(record)}
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
          <span className="text-3xl ">Major</span>
          <Add title="Thêm" setIsModalOpen={setIsModalOpenAdd} />
        </div>
        <Divider />
        <Flex gap="middle" vertical>
          <Table<IMajor>
            rowSelection={rowSelection}
            columns={columns}
            dataSource={data ? data : []}
            rowKey="id"
          />
        </Flex>
      </div>
      <ModalAddMajor
        isModalOpenAdd={isModalOpenAdd}
        setIsModalOpenAdd={setIsModalOpenAdd}
        fetchMajor={fetchMajor}
      />
      <ModalUpdateMajor
        isModalOpenUpdate={isModalOpenUpdate}
        setIsModalOpenUpdate={setIsModalOpenUpdate}
        fetchMajor={fetchMajor}
        dataMajor={dataMajor}
        setDataMajor={setDataMajor}
      />
    </Home>
  );
};

export default Major;
