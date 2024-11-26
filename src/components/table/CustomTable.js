import React, { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, message, Popconfirm, Space, Table } from "antd";
import Highlighter from "react-highlight-words";

const CustomTable = ({
  data,
  columns,
  loading,
  scroll,
  pagination,
  rowKey,
  onEdit,
  onDelete,
}) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [editingKey, setEditingKey] = useState("");
  const [editableData, setEditableData] = useState({});
  const searchInput = useRef(null);

  const isEditing = (record) => record.id === editingKey;

  const validateEditableData = () => {
    // Check if any of the editable fields are empty
    return Object.keys(editableData).every((key) => {
      return editableData[key] !== undefined && editableData[key] !== "";
    });
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const handleEdit = (record) => {
    setEditingKey(record.id);
    setEditableData({ ...record });
  };

  const handleSave = async () => {
    if (!validateEditableData()) {
      message.error("Please complete the form");
      return;
    }

    if (onEdit) {
      await onEdit(editableData);
    }
    setEditingKey("");
    setEditableData({});
  };

  const handleChange = (e, dataIndex) => {
    setEditableData({ ...editableData, [dataIndex]: e.target.value });
  };

  const enhancedColumns = columns.map((col) => ({
    ...col,
    ...(col.searchable ? getColumnSearchProps(col.dataIndex) : {}),
    render: (text, record) => {
      if (col.editable && isEditing(record)) {
        return (
          <Input
            style={{ minWidth: "60px" }}
            value={
              editableData[col.dataIndex] !== undefined
                ? editableData[col.dataIndex]
                : text
            }
            onChange={(e) => handleChange(e, col.dataIndex)}
            onPressEnter={handleSave}
          />
        );
      }
      return col.render ? col.render(text, record) : text;
    },
  }));

  return (
    <Table
      size="small"
      loading={loading}
      dataSource={data}
      columns={[
        ...enhancedColumns,
        {
          title: "Action",
          key: "action",
          render: (text, record) => (
            <Space>
              {isEditing(record) ? (
                <>
                  <Button size="small" onClick={handleSave} type="primary">
                    Save
                  </Button>
                  <Button
                    size="small"
                    onClick={() => {
                      setEditingKey("");
                      setEditableData({});
                    }}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <Button
                  type="link"
                  size="small"
                  onClick={() => handleEdit(record)}
                >
                  Edit
                </Button>
              )}
              <Popconfirm
                title="Are you sure to delete?"
                onConfirm={() => onDelete(record.id)}
                okText="Yes"
                cancelText="No"
              >
                <Button type="link" className="text-danger">
                  Delete
                </Button>
              </Popconfirm>
            </Space>
          ),
        },
      ]}
      scroll={scroll}
      pagination={pagination}
      rowKey={rowKey}
    />
  );
};

export default CustomTable;
