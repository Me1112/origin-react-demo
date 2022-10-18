import React, { useState, useRef, useEffect } from 'react';
import { Table } from 'antd';
import { Resizable } from 'react-resizable';
import './index.module.less';

const ResizeableTitle = props => {
  const { onResize, width, ...restProps } = props;

  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable
      width={width}
      height={0}
      onResize={onResize}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <th {...restProps} />
    </Resizable>
  );
};

const OmTable = props => {
  const { resizable = true } = props;
  const [columns, setColumns] = useState(props.columns || []);

  const handleResize = index => (e, { size }) => {
    const nextColumns = [...props.columns];
    nextColumns[index] = {
      ...nextColumns[index],
      width: size.width,
    };
    setColumns(nextColumns);
  };

  const _columns = columns.map((col, index) => ({
    ...col,
    onHeaderCell: column => ({
      width: column.width,
      onResize: handleResize(index),
    }),
  }));

  return (
    <Table
      {...props}
      bordered
      columns={_columns}
      components={{
        header: {
          cell: ResizeableTitle,
        },
      }}
    />
  );
};

export default OmTable;
