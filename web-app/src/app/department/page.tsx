"use client";
import { useEffect, useState } from "react";
import Home from "../page";
import { reqApi } from "../api/axios/httpRequest";
import { IoAdd } from "react-icons/io5";
import { useSession } from "next-auth/react";

import { Button, Divider, Flex, Popconfirm, Table } from "antd";
import type { PopconfirmProps, TableColumnsType, TableProps } from "antd";
import Add from "../components/button/add";
import ModalAddDepartment from "./modal.add.department";
import { IDepartment } from "../interface/ITable";
import toast from "react-hot-toast";
import ModalUpdateDepartment from "./modal.update.department";

type TableRowSelection<T extends object = object> =
  TableProps<T>["rowSelection"];

const Department = () => {
  const { data: session } = useSession();

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const [isModalOpenAdd, setIsModalOpenAdd] = useState<boolean>(false);
  const [isModalOpenUpdate, setIsModalOpenUpdate] = useState<boolean>(false);

  const [id, setId] = useState<number | null>(null);
  const [data, setData] = useState<IDepartment[]>([]);
  const [majors, setMajors] = useState<string[] | null>(null);

  useEffect(() => {
    fetchDepartment();
  }, [session]);

  const fetchDepartment = async () => {
    try {
      const res = await reqApi.get({
        url: "http://localhost:5062/api/department",
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

  const rowSelection: TableRowSelection<IDepartment> = {
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

  const handleDeleteDepartment = async (_id: number) => {
    const res = await reqApi.delete({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/department/${_id}`,
    });

    if (res) {
      toast.success(` Xóa department ${res.data.name} thành công`);
      fetchDepartment();
    } else {
      toast.error(` Xóa department thất bại`);
    }
  };

  const cancel: PopconfirmProps["onCancel"] = (e) => {
    console.log(e);
  };

  const handleOpenModalUpdate = (id: number) => {
    setId(id);
    setIsModalOpenUpdate(true);
  };

  const columns: TableColumnsType<IDepartment> = [
    {
      title: "ID",
      dataIndex: "id",
      render: (id: number) => (
        <a
          className="underline text-primary-blue"
          onClick={() => handleOpenModalUpdate(id)}
        >
          {id}
        </a>
      ),
    },
    { title: "Department", dataIndex: "name" },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (record: IDepartment) => (
        <Popconfirm
          title="Xóa"
          description={`Bạn có muốn xóa department ${record.name}?`}
          onConfirm={() => handleDeleteDepartment(record.id)}
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
          <span className="text-3xl ">Department</span>
          <Add title="Thêm" setIsModalOpen={setIsModalOpenAdd} />
        </div>
        <Divider />
        <Flex gap="middle" vertical>
          <Table<IDepartment>
            rowSelection={rowSelection}
            columns={columns}
            dataSource={data ? data : []}
            expandable={{
              expandedRowRender: (record) => (
                <p style={{ margin: 0 }}>
                  {Array.isArray(record.majors) && record.majors.length > 0 ? (
                    record.majors.map((item, index) => (
                      <div className="w-full" key={index}>
                        +{item.name}
                      </div> // Thêm key cho mỗi phần tử
                    ))
                  ) : (
                    <span>No majors available</span> // Hiển thị thông báo nếu không có majors
                  )}
                </p>
              ),
              rowExpandable: (record) => record.name !== "Not Expandable",
            }}
            rowKey="id"
          />
        </Flex>
      </div>
      <ModalAddDepartment
        isModalOpenAdd={isModalOpenAdd}
        setIsModalOpenAdd={setIsModalOpenAdd}
        fetchDepartment={fetchDepartment}
      />
      <ModalUpdateDepartment
        isModalOpenUpdate={isModalOpenUpdate}
        setIsModalOpenUpdate={setIsModalOpenUpdate}
        fetchDepartment={fetchDepartment}
        _id={id}
        setId={setId}
      />
    </Home>
  );
};

export default Department;
