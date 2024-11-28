"use client";
import { useEffect, useState } from "react";
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
import { IDepartment, IAccount, IMajor, IClass } from "../interface/ITable";
import toast from "react-hot-toast";
import { SearchOutlined } from "@ant-design/icons";
import type { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import useColumnSearch from "../components/search/useColumnSearch";
import ModalAddAccount from "./modal.add.account";
import ModalUpdateAccount from "./modal.update.account";
import { IFilter } from "../interface/interface";

type TableRowSelection<T extends object = object> =
  TableProps<T>["rowSelection"];

type DataIndexAccount = keyof IAccount;

const Account = () => {
  const { data: session } = useSession();

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const [isModalOpenAdd, setIsModalOpenAdd] = useState<boolean>(false);
  const [isModalOpenUpdate, setIsModalOpenUpdate] = useState<boolean>(false);

  const [dataAccount, setDataAccount] = useState<IAccount | null>(null);
  const [data, setData] = useState<IAccount[]>([]);

  const [filterDeparment, setFilterDepartment] = useState<IDepartment[]>([]);
  const [filterMajor, setFilterMajor] = useState<IMajor[]>([]);
  const [filterClass, setFilterClass] = useState<IClass[]>([]);

  const { getColumnSearchProps } = useColumnSearch<IAccount>();

  useEffect(() => {
    fetchAccount();
    fetchDeparment();
    fetchMajor();
    fetchClasses();
  }, [session]);

  const fetchAccount = async () => {
    try {
      const res = await reqApi.get({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/account`,
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
    const res = await reqApi.get({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/department`,
    });
    if (res) {
      setFilterDepartment(res.data);
    }
  };
  const fetchMajor = async () => {
    const res = await reqApi.get({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/major`,
    });
    if (res) {
      setFilterMajor(res.data);
    }
  };
  const fetchClasses = async () => {
    const res = await reqApi.get({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/class`,
    });
    if (res) {
      setFilterClass(res.data);
    }
  };
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<IAccount> = {
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

  const handleDeleteAccount = async (data: IAccount) => {
    const res = await reqApi.delete({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/account/${data.id}`,
    });

    if (res) {
      toast.success(` Xóa Account ${data.name} thành công`);
      fetchAccount();
    } else {
      toast.error(` Xóa Account thất bại`);
    }
  };

  const cancel: PopconfirmProps["onCancel"] = (e) => {
    console.log(e);
  };

  const handleOpenModalUpdate = (Account: IAccount) => {
    setDataAccount(Account);
    setIsModalOpenUpdate(true);
  };

  const columns: TableColumnsType<IAccount> = [
    {
      title: "ID",
      dataIndex: "id",
      render: (appAccountId: string, record: IAccount) => (
        <a
          className="underline text-primary-blue"
          onClick={() => handleOpenModalUpdate(record)}
        >
          {appAccountId}
        </a>
      ),
      width: 200,
      fixed: "left",
    },
    {
      title: "Tài khoản",
      dataIndex: "userName",
      key: "userName",
      ...getColumnSearchProps(["userName"]),
      width: 50,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ...getColumnSearchProps(["email"]),
    },
    {
      title: "Ngày sinh",
      dataIndex: "birthDate",
      render: (birthDate: string) => {
        const date = new Date(birthDate);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
      },
    },
    {
      title: "Giới tính",
      dataIndex: "male",
      render: (male: boolean) => <>{male ? "Nam" : "Nữ"}</>,
      filters: [
        { value: false, text: "Nữ" },
        { value: true, text: "Nam" },
      ],
      onFilter: (value, record) => record.male === value,
    },
    {
      title: "Ảnh",
      dataIndex: "urlImage",
    },
    {
      title: "Khoa",
      dataIndex: "department", // Trường dữ liệu chính
      filters: filterDeparment.map((item: IDepartment) => ({
        value: item.id,
        text: item.name,
      })),
      onFilter: (value, record) => record.departmentId === value,
      render: (department: IDepartment) => department?.name,
    },
    {
      title: "Chuyên ngành",
      dataIndex: "major", // Trường dữ liệu chính
      filters: filterMajor.map((item: IMajor) => ({
        value: item.id,
        text: item.name,
      })),
      onFilter: (value, record) => record.majorId === value,
      render: (major: IMajor) => major?.name,
    },
    {
      title: "Lớp",
      dataIndex: "class", // Trường dữ liệu chính
      filters: filterClass.map((item: IClass) => ({
        value: item.id,
        text: item.name,
      })),
      onFilter: (value, record) => record.classId === value,
      render: (c: IClass) => c?.name,
    },
    {
      title: "Role",
      dataIndex: "roleName",
      render: (roleName: string) => <>{roleName}</>,
      filters: [
        { value: "User", text: "User" },
        { value: "Admin", text: "Admin" },
        { value: "Teacher", text: "Teacher" },
      ],
      onFilter: (value, record) => record.roleName === value,
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      width: 100,
      fixed: "right",
      render: (record: IAccount) => (
        <Popconfirm
          title="Xóa"
          description={`Bạn có muốn xóa Account ${record.name}?`}
          onConfirm={() => handleDeleteAccount(record)}
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
          <span className="text-3xl ">Account</span>
          <Add setIsModalOpen={setIsModalOpenAdd} />
        </div>
        <Divider />
        <Flex gap="middle" vertical>
          <Table<IAccount>
            rowSelection={rowSelection}
            columns={columns}
            dataSource={data ? data : []}
            rowKey="id"
            scroll={{ x: "max-content" }}
          />
        </Flex>
      </div>
      <ModalAddAccount
        isModalOpenAdd={isModalOpenAdd}
        setIsModalOpenAdd={setIsModalOpenAdd}
        fetchAccount={fetchAccount}
      />
      <ModalUpdateAccount
        isModalOpenUpdate={isModalOpenUpdate}
        setIsModalOpenUpdate={setIsModalOpenUpdate}
        fetchAccount={fetchAccount}
        dataAccount={dataAccount}
        setDataAccount={setDataAccount}
      />
    </Home>
  );
};

export default Account;
