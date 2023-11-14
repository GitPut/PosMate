import React, { useEffect, useState } from "react";
import { Table } from "antd";
import "./antd.css";
import { itemRender, onShowSizeChange } from "../components/pagination";
import { Excel } from "antd-table-saveas-excel";
import { Button } from "react-native";

const Datatable = ({ props, columns, dataSource, updateBaseSelectedRows, setbaseSelectedRows }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  useEffect(() => {
    if (updateBaseSelectedRows) {
      setbaseSelectedRows(selectedRowKeys)
    }
  }, [updateBaseSelectedRows])

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  return (
    <Table
      key={props}
      className="table datanew dataTable no-footer"
      rowSelection={rowSelection}
      columns={columns}
      dataSource={dataSource}
      pagination={{
        total: dataSource.length,
        showTotal: (total, range) =>
          ` ${range[0]} to ${range[1]} of ${total} items`,
        showSizeChanger: true,
        onShowSizeChange: onShowSizeChange,
      }}
      rowKey={(record) => record.id}
    />
  );
};

export default Datatable;
