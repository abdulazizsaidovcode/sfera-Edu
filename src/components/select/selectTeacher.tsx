import React from 'react';
import { Select, Space } from 'antd';

interface SelectTeacherProps {
  defaultValue?: string;
  style?: React.CSSProperties;
  dropdownStyle?: React.CSSProperties;
  options?: { value: string; label: string; disabled?: boolean }[];
  onChange?: (value: string) => void;
}

const SelectTeacher: React.FC<SelectTeacherProps> = ({
  defaultValue = 'Guruhni tanlang',
  style,
  dropdownStyle,
  options = [
    { value: 'jack', label: 'Jack' },
    { value: 'lucy', label: 'Lucy' },
    { value: 'Yiminghe', label: 'yiminghe' },
    { value: 'disabled', label: 'Disabled', disabled: true },
  ],
  onChange = (value: string) => {
    console.log(`Selected: ${value}`);
  },
}) => (
  <Space wrap>
    <Select
      defaultValue={defaultValue}
      style={style}
      onChange={onChange}
      dropdownStyle={dropdownStyle}
      options={options}
    />
  </Space>
);

export default SelectTeacher;
