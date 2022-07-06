import { Input, Popover, InputNumber, Select } from "antd";
import React, { useState } from "react";
import { FilterOutlined } from "@ant-design/icons";

const { Option } = Select;

function Filter({
  set_ebc_lt,
  set_ebc_gt,
  set_ibu_gt,
  set_ibu_lt,
  set_food_pair,
}: any) {
  const [visible, setVisible] = useState(false);

  const hide = () => {
    setVisible(false);
  };

  const handleVisibleChange = (newVisible: boolean) => {
    setVisible(newVisible);
  };

  return (
    <div>
      <Popover
        content={
          <div>
            <div className="align-start flex-one margin">
              <div className="flex-one">
                <p>fermentation type : </p>
              </div>
              <div className="padding">
                <Select
                  placeholder="select type"
                  style={{ width: 186 }}
                  onChange={(v) => {
                    if (v === "top") {
                      set_ebc_lt(25);
                      set_ebc_gt(10);
                    } else {
                      set_ebc_lt(15);
                      set_ebc_gt(7);
                    }
                  }}
                >
                  <Option value="top">Top-fermenting</Option>
                  <Option value="bottom">Bottom-fermenting</Option>
                </Select>
              </div>
            </div>

            <div className="flex-one margin">
              <div className="flex-one">
                <p>bitterness : </p>
              </div>
              <div className="flex-one padding">
                <InputNumber
                  placeholder="IBU Min"
                  min={1}
                  max={120}
                  defaultValue={1}
                  onChange={(v) => {
                    set_ibu_gt(v);
                  }}
                />{" "}
                -{" "}
                <InputNumber
                  placeholder="IBU Max"
                  min={1}
                  max={120}
                  defaultValue={120}
                  onChange={(v) => {
                    set_ibu_lt(v);
                  }}
                />
              </div>
            </div>

            <div className="flex-one margin">
              <div className="flex-one">
                <p>food pairing : </p>
              </div>
              <div className="flex-one padding">
                <Input
                  onChange={(v) => {
                    set_food_pair(v.target.value.replace(/\s+/g, "_"));
                  }}
                  style={{ width: "186px" }}
                ></Input>
              </div>
            </div>

            <a onClick={hide}>Save</a>
          </div>
        }
        title="Filter"
        placement="bottom"
        trigger="click"
        visible={visible}
        onVisibleChange={handleVisibleChange}
      >
        <FilterOutlined className="margin"></FilterOutlined>
      </Popover>
    </div>
  );
}

export default Filter;
