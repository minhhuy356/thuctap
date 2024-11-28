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
import {
  IDepartment,
  ISection,
  ISchedule,
  ISubject,
} from "../interface/ITable";
import toast from "react-hot-toast";
import { DownOutlined, SearchOutlined } from "@ant-design/icons";
import type { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import useColumnSearch from "../components/search/useColumnSearch";
import moment from "moment";
import ModalUpdateSection from "./modal.update.section";
import ModalAddSection from "./modal.add.section";
import ModalUpdateSchedule from "./modal.update.schedule";
import ModalAddSchedule from "./modal.add.schedule";

interface ExpandRowData {
  id: number;
  dayOfWeek: number;
  timeStart: string;
  timeEnd: string;
}

type TableRowSelection<T extends object = object> =
  TableProps<T>["rowSelection"];

const Section = () => {
  const { data: session } = useSession();

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const [isModalOpenAdd, setIsModalOpenAdd] = useState<boolean>(false);
  const [isModalOpenUpdate, setIsModalOpenUpdate] = useState<boolean>(false);

  const [isScheduleModalOpenAdd, setIsScheduleModalOpenAdd] =
    useState<boolean>(false);
  const [isScheduleModalOpenUpdate, setIsScheduleModalOpenUpdate] =
    useState<boolean>(false);

  const [dataSection, setDataSection] = useState<ISection | null>(null);
  const [dataSchedule, setDataSchedule] = useState<ISchedule | null>(null);

  const [data, setData] = useState<ISection[]>([]);

  const [sectionId, setSectionId] = useState<number>(0);

  const { getColumnSearchProps } = useColumnSearch<ISection>();

  useEffect(() => {
    fetchSection();

    data.map((item: ISection) => ({
      id: item.id,
    }));
  }, [session]);

  const fetchSection = async () => {
    try {
      const res = await reqApi.get({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/section`,
      });
      if (res) {
        setData(res.data);

        console.log(res);
      }
    } catch (error) {
      console.error("Có lỗi xảy ra:", error);
    }
  };

  const expandDataSource = data.flatMap((item: ISection) =>
    item.schedules.map((schedule) => ({
      ...schedule,
    }))
  );

  const handleOpenScheduleModalUpdate = (data: ISchedule) => {
    setDataSchedule(data);
    setIsScheduleModalOpenUpdate(true);
  };

  const expandColumns: TableColumnsType<ISchedule> = [
    {
      title: "Id",
      dataIndex: ["id"],
      key: "id",
      render: (id: number, record: ISchedule) => (
        <a onClick={() => handleOpenScheduleModalUpdate(record)}>{id}</a>
      ),
    },
    {
      title: "Thứ",
      dataIndex: ["dayOfWeek"],
      key: "dayOfWeek",
      render: (dayOfWeek: number) => (
        <div>{dayOfWeek === 8 ? "Chủ nhật" : dayOfWeek}</div>
      ),
    },
    {
      title: "Giờ bắt đầu",
      dataIndex: ["timeStart"],
      key: "timeStart",
    },
    {
      title: "Giờ kết thúc",
      dataIndex: ["timeEnd"],
      key: "timeEnd",
    },
    {
      title: "Action",
      key: "operation",
      render: (record) => (
        <Popconfirm
          title="Xóa"
          description={`Bạn có muốn xóa lịch học ${record.id}?`}
          onConfirm={() => handleDeleteSchedule(record)}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <Button danger>Delete</Button>
        </Popconfirm>
      ),
    },
  ];

  const expandedRowRender = (sectionId: number) => {
    const filteredData = expandDataSource.filter(
      (item) => item.sectionId === sectionId
    );
    return (
      <Table<ISchedule>
        columns={expandColumns}
        dataSource={filteredData}
        pagination={false}
      />
    );
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<ISection> = {
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

  const handleDeleteSection = async (data: ISection) => {
    const res = await reqApi.delete({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/section/${data.id}`,
    });

    if (res) {
      toast.success(` Xóa lớp học thành công`);
      fetchSection();
    } else {
      toast.error(` Xóa lớp học thất bại`);
    }
  };

  const handleDeleteSchedule = async (data: ISchedule) => {
    const res = await reqApi.delete({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/schedule/${data.id}`,
    });

    if (res) {
      toast.success(` Xóa lịch học thành công`);
      fetchSection();
    } else {
      toast.error(` Xóa lịch học thất bại`);
    }
  };

  const cancel: PopconfirmProps["onCancel"] = (e) => {
    console.log(e);
  };

  const handleOpenModalUpdate = (Section: ISection) => {
    setDataSection(Section);
    setIsModalOpenUpdate(true);
  };

  const columns: TableColumnsType<ISection> = [
    {
      title: "ID",
      dataIndex: ["id"],
      key: "id",
      render: (id: number, record: ISection) => (
        <a onClick={() => handleOpenModalUpdate(record)}>{id}</a>
      ),
    },
    {
      title: "Môn học",
      dataIndex: ["subjects", "name"],
      key: "name",
      ...getColumnSearchProps(["subjects", "name"]),
    },
    { title: "Lớp học", dataIndex: ["character"], key: "character" },
    {
      title: "Ngày bắt đầu",
      dataIndex: "startDate",
      key: "startDate",
      render: (startDate: Date) => (
        <span>{moment(startDate).format("DD/MM/YYYY")}</span>
      ),
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "endDate",
      key: "endDate",
      render: (endDate: Date) => (
        <span>{moment(endDate).format("DD/MM/YYYY")}</span>
      ),
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (record: ISection) => (
        <div className="flex gap-4">
          <div onClick={() => setSectionId(record.id)}>
            <Add title="Thêm" setIsModalOpen={setIsScheduleModalOpenAdd} />
          </div>

          <Popconfirm
            title="Xóa"
            description={`Bạn có muốn xóa Section ${record.id}?`}
            onConfirm={() => handleDeleteSection(record)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <Home>
      <div className="bg-white rounded-lg py-4 px-4">
        <div className="flex justify-between">
          <span className="text-3xl ">Môn học</span>
          <Add title="Thêm môn học" setIsModalOpen={setIsModalOpenAdd} />
        </div>
        <Divider />
        <Flex gap="middle" vertical>
          <Table<ISection>
            columns={columns}
            expandable={{
              expandedRowRender: (record) => expandedRowRender(record.id),
            }}
            dataSource={data}
            rowKey="id"
            rowSelection={rowSelection}
          />
        </Flex>
      </div>
      <ModalAddSection
        isModalOpenAdd={isModalOpenAdd}
        setIsModalOpenAdd={setIsModalOpenAdd}
        fetchSection={fetchSection}
      />
      <ModalUpdateSection
        isModalOpenUpdate={isModalOpenUpdate}
        setIsModalOpenUpdate={setIsModalOpenUpdate}
        fetchSection={fetchSection}
        dataSection={dataSection}
        setDataSection={setDataSection}
      />
      <ModalUpdateSchedule
        isScheduleModalOpenUpdate={isScheduleModalOpenUpdate}
        setIsScheduleModalOpenUpdate={setIsScheduleModalOpenUpdate}
        dataSchedule={dataSchedule}
        setDataSchedule={setDataSchedule}
        fetchSection={fetchSection}
      />
      <ModalAddSchedule
        isScheduleModalOpenAdd={isScheduleModalOpenAdd}
        setIsScheduleModalOpenAdd={setIsScheduleModalOpenAdd}
        fetchSection={fetchSection}
        sectionId={sectionId}
      />
    </Home>
  );
};

export default Section;
