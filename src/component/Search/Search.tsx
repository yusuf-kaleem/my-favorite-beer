import {
  AutoComplete,
  Input,
  Button,
  Popover,
  InputNumber,
  Select,
} from "antd";
import type { SelectProps } from "antd/es/select";
import React, { useEffect, useState } from "react";
import { SettingOutlined, FilterOutlined } from "@ant-design/icons";

// @ts-ignore
import Modal, { closeStyle } from "simple-react-modal";
// @ts-ignore
import { Form, Field } from "easy-react-form";
import axios from "axios";
const { Option } = Select;

function Search() {
  const [options, setOptions] = useState<SelectProps<object>["options"]>([]);
  const [beer, setBeer] = useState<any>({});
  const [showModal, setShowModal] = useState(false);
  const [saveList, setSaveList] = useState<any[]>([]);
  const [visible, setVisible] = useState(false);
  const [ebc_lt, set_ebc_lt] = useState(0);
  const [ebc_gt, set_ebc_gt] = useState(0);
  const [ibu_gt, set_ibu_gt] = useState(0);
  const [ibu_lt, set_ibu_lt] = useState(0);
  const [food_pair, set_food_pair] = useState("");
  const hide = () => {
    setVisible(false);
  };

  const handleVisibleChange = (newVisible: boolean) => {
    setVisible(newVisible);
  };
  const handleSearch = (value: string) => {
    axios
      .get(
        `https://api.punkapi.com/v2/beers?beer_name=${value}${
          ebc_lt ? "&ebc_lt=" + ebc_lt + "" : ""
        }${ebc_gt ? "&ebc_gt=" + ebc_gt + "" : ""}${
          ibu_lt ? "&ibu_lt=" + ibu_lt + "" : ""
        }${ibu_gt ? "&ibu_gt=" + ibu_gt + "" : ""}${
          food_pair ? "&food=" + food_pair + "" : ""
        }`
      )
      .then((data) => {
        let ss = data.data;

        let aa = ss.map((_: any) => {
          const category = `${_.name}`;
          return {
            value: category,
            label: (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>{_.name} </span>
                <span>
                  <img height={30} width={20} src={_.image_url}></img>
                </span>
              </div>
            ),
          };
        });

        setOptions(value ? aa : []);
      });
  };

  const onSelect = (value: string) => {
    axios
      .get(`https://api.punkapi.com/v2/beers?beer_name=${value}`)
      .then((data) => {
        setBeer(data.data[0]);
        setShowModal(true);
      });
  };

  function submit(data: any) {
    let obj = { name: beer.name, img: beer.image_url, ...data };
    let list = saveList;
    list.push(obj);
    setSaveList(list);
    setShowModal(false);
    sessionStorage.setItem("table_data", JSON.stringify(list));
    window.dispatchEvent(new Event("storage"));
  }

  return (
    <div style={{ display: "flex", alignItems: "center", marginLeft: "auto" }}>
      <Modal
        show={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        transitionSpeed={100}
        containerStyle={{
          borderRadius: 10,
          padding: 20,
          width: 500,
          height: "480px",
        }}
      >
        <div style={{ display: "flex", color: "#333" }}>
          <div style={{ display: "flex", flex: 1, justifyContent: "center" }}>
            <img height={400} src={beer.image_url}></img>
          </div>
          <div style={{ display: "flex", flex: 1 }}>
            <Form
              onSubmit={(v: any) => {
                submit(v);
              }}
              style={{
                width: "200px",
                height: "30px",
                fontSize: "12px",
              }}
            >
              <h2 style={{ fontSize: "20px", fontWeight: "bold" }}>
                {beer.name}
              </h2>
              <label>drink this beer before?</label>
              <Field
                name="drink_before"
                component="input"
                type="tel"
                placeholder=""
              />
              <br></br>
              <br></br>

              <label>where you drunk? </label>
              <Field name="where" component="input" type="tel" placeholder="" />
              <br></br>
              <br></br>

              <label>when you drunk?</label>
              <Field name="when" component="input" type="tel" placeholder="" />
              <br></br>
              <br></br>

              <label>your taste note (1 to 5)? </label>
              <Field
                name="taste_note"
                component="input"
                type="tel"
                placeholder=""
              />
              <br></br>
              <br></br>

              <label>Some comments.</label>
              <Field
                name="comment"
                component="input"
                type="tel"
                placeholder=""
              />
              <br></br>
              <br></br>

              <button
                style={{
                  background: "#4893f0",
                  color: "#fff",
                  border: "none",
                  fontSize: 14,
                  padding: "3px 10px",
                  borderRadius: 3,
                }}
              >
                {" "}
                Save{" "}
              </button>
            </Form>
          </div>
        </div>
      </Modal>
      <Popover
        content={
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                flex: 1,
                margin: 10,
              }}
            >
              <div style={{ display: "flex", flex: 1 }}>
                <p>fermentation type : </p>
              </div>
              <div style={{ display: "flex", flex: 1, paddingLeft: 20 }}>
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

            <div style={{ display: "flex", flex: 1, margin: 10 }}>
              <div style={{ display: "flex", flex: 1 }}>
                <p>bitterness : </p>
              </div>
              <div style={{ display: "flex", flex: 1, paddingLeft: 20 }}>
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

            <div style={{ display: "flex", flex: 1, margin: 10 }}>
              <div style={{ display: "flex", flex: 1 }}>
                <p>food pairing : </p>
              </div>
              <div style={{ display: "flex", flex: 1, paddingLeft: 20 }}>
                <Input
                  onChange={(v) => {
                    set_food_pair(v.target.value.replace(/\s+/g, "_"));
                  }}
                  style={{ width: "186px" }}
                ></Input>
              </div>
            </div>

            <a onClick={hide}>Close</a>
          </div>
        }
        title="Filter"
        placement="bottom"
        trigger="click"
        visible={visible}
        onVisibleChange={handleVisibleChange}
      >
        <FilterOutlined style={{ margin: 10 }}></FilterOutlined>
      </Popover>

      <AutoComplete
        dropdownMatchSelectWidth={252}
        style={{ width: 400 }}
        options={options}
        onSelect={onSelect}
        onSearch={handleSearch}
      >
        <Input.Search
          size="large"
          placeholder="beer name"
          enterButton
          value={"sss"}
        />
      </AutoComplete>
    </div>
  );
}

export default Search;
