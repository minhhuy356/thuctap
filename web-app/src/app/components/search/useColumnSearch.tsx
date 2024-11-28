"use client";
import React, { useRef, useState } from "react";
import { Input, Button, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import type { InputRef } from "antd";
import type { ColumnType } from "antd/es/table";
import type { FilterDropdownProps } from "antd/es/table/interface";

type DataIndex = Array<string>;

interface UseColumnSearchProps<T> {
  getColumnSearchProps: (dataIndex: DataIndex) => ColumnType<T>;
}

const useColumnSearch = <T extends object>(): UseColumnSearchProps<T> => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState<DataIndex | "">("");
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps["confirm"],
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (
    clearFilters: () => void,
    confirm: FilterDropdownProps["confirm"]
  ) => {
    clearFilters();
    setSearchText(""); // Xóa text tìm kiếm
    setSearchedColumn(""); // Xóa cột đã tìm kiếm
    confirm(); // Áp dụng lại bộ lọc (xóa lọc hiện tại)
  };

  const getValueByDataIndex = (record: any, dataIndex: DataIndex): any => {
    return dataIndex.reduce(
      (value, key) => (value && value[key] !== undefined ? value[key] : null),
      record
    );
  };

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<T> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex.join(".")}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space className="flex justify-end">
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            className="flex-1"
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters, confirm)}
            size="small"
            className="flex-1"
          >
            Reset
          </Button>
        </Space>
      </div>
    ),

    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) => {
      const nestedValue = getValueByDataIndex(record, dataIndex);
      return String(nestedValue ?? "")
        .toLowerCase()
        .includes((value as string).toLowerCase());
    },

    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text, record) => {
      const nestedValue = getValueByDataIndex(record, dataIndex);
      const valueToHighlight = nestedValue ? nestedValue.toString() : "";

      return JSON.stringify(searchedColumn) === JSON.stringify(dataIndex) ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={valueToHighlight}
        />
      ) : (
        valueToHighlight
      );
    },
  });

  return { getColumnSearchProps };
};

export default useColumnSearch;
