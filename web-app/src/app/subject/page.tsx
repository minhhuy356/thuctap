"use client";
import { useEffect, useRef, useState } from "react";
import Home from "../page";
import { reqApi } from "../api/axios/httpRequest";
import { IoAdd } from "react-icons/io5";
import { useSession } from "next-auth/react";

import {
  Badge,
  Button,
  Divider,
  Dropdown,
  Flex,
  Input,
  Popconfirm,
  Space,
  Table,
} from "antd";
import type {
  PopconfirmProps,
  TableColumnsType,
  TableProps,
  TableColumnType,
  InputRef,
} from "antd";
import Add from "../components/button/add";
import { IDepartment, ISubject } from "../interface/ITable";
import toast from "react-hot-toast";

import { DownOutlined, SearchOutlined } from "@ant-design/icons";
import type { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import useColumnSearch from "../components/search/useColumnSearch";
import ModalUpdateSubject from "./modal.update.subject";
import ModalAddSubject from "./modal.add.subject";

interface ExpandedDataType {
  key: React.Key;
  date: string;
  name: string;
  upgradeNum: string;
}

type TableRowSelection<T extends object = object> =
  TableProps<T>["rowSelection"];

const Subject = () => {
  const { data: session } = useSession();

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const [isModalOpenAdd, setIsModalOpenAdd] = useState<boolean>(false);
  const [isModalOpenUpdate, setIsModalOpenUpdate] = useState<boolean>(false);

  const [dataSubject, setDataSubject] = useState<ISubject | null>(null);
  const [data, setData] = useState<ISubject[]>([]);

  const [filterDepartment, setFilterDepartment] = useState<IDepartment[]>([]);

  const { getColumnSearchProps } = useColumnSearch<ISubject>();

  useEffect(() => {
    fetchSubject();
    fetchDeparment();
  }, [session]);

  const fetchSubject = async () => {
    try {
      const res = await reqApi.get({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/subject`,
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

  const rowSelection: TableRowSelection<ISubject> = {
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

  const handleDeletesubject = async (data: ISubject) => {
    const res = await reqApi.delete({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/subject/${data.id}`,
    });

    if (res) {
      toast.success(` Xóa subject ${data.name} thành công`);
      fetchSubject();
    } else {
      toast.error(` Xóa subject thất bại`);
    }
  };

  const cancel: PopconfirmProps["onCancel"] = (e) => {
    console.log(e);
  };

  const handleOpenModalUpdate = (subject: ISubject) => {
    setDataSubject(subject);
    setIsModalOpenUpdate(true);
  };

  const columns: TableColumnsType<ISubject> = [
    {
      title: "ID",
      dataIndex: "id",
      render: (id: string, record: ISubject) => (
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
      title: "Khoa",
      dataIndex: "department", // Trường dữ liệu chính
      filters: filterDepartment.map((item: IDepartment) => ({
        value: item.id,
        text: item.name,
      })),
      onFilter: (value, record) => record.department.id === value,
      render: (department: IDepartment) => department?.name ?? null,
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (record: ISubject) => (
        <Popconfirm
          title="Xóa"
          description={`Bạn có muốn xóa subject ${record.name}?`}
          onConfirm={() => handleDeletesubject(record)}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <Button danger>Delete</Button>
        </Popconfirm>
      ),
    },
  ];
  const expandColumns: TableColumnsType<ExpandedDataType> = [
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Name", dataIndex: "name", key: "name" },
    {
      title: "Status",
      key: "state",
      render: () => <Badge status="success" text="Finished" />,
    },
    { title: "Upgrade Status", dataIndex: "upgradeNum", key: "upgradeNum" },
    {
      title: "Action",
      key: "operation",
      render: () => (
        <Space size="middle">
          <a>Pause</a>
          <a>Stop</a>
          {/* <Dropdown menu={{ items }}>
            <a>
              More <DownOutlined />
            </a>
          </Dropdown> */}
        </Space>
      ),
    },
  ];

  const expandDataSource = Array.from({ length: 3 }).map<ExpandedDataType>(
    (_, i) => ({
      key: i.toString(),
      date: "2014-12-24 23:12:00",
      name: "This is production name",
      upgradeNum: "Upgraded: 56",
    })
  );

  const expandedRowRender = () => (
    <Table<ExpandedDataType>
      columns={expandColumns}
      dataSource={expandDataSource}
      pagination={false}
    />
  );

  return (
    <Home>
      <div className="bg-white rounded-lg py-4 px-4">
        <div className="flex justify-between">
          <span className="text-3xl ">Môn học</span>
          <Add title="Thêm" setIsModalOpen={setIsModalOpenAdd} />
        </div>
        <Divider />
        <Flex gap="middle" vertical>
          <Table<ISubject>
            rowSelection={rowSelection}
            columns={columns}
            dataSource={data ? data : []}
            rowKey="id"
            expandable={{ expandedRowRender, defaultExpandedRowKeys: ["0"] }}
          />
        </Flex>
      </div>
      <ModalAddSubject
        isModalOpenAdd={isModalOpenAdd}
        setIsModalOpenAdd={setIsModalOpenAdd}
        fetchSubject={fetchSubject}
      />
      <ModalUpdateSubject
        isModalOpenUpdate={isModalOpenUpdate}
        setIsModalOpenUpdate={setIsModalOpenUpdate}
        fetchSubject={fetchSubject}
        dataSubject={dataSubject}
        setDataSubject={setDataSubject}
      />
    </Home>
  );
};

export default Subject;
