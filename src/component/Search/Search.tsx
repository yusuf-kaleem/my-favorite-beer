import { AutoComplete, Input, Select } from "antd";
import type { SelectProps } from "antd/es/select";
import React, { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import Filter from "../Filter/Filter";
import SearchList from "./SearchList";

import axios from "axios";
const { Option } = Select;

function Search() {
  const [options, setOptions] = useState<SelectProps<object>["options"]>([]);
  const [beer, setBeer] = useState<any>({});
  const [showModal, setShowModal] = useState(false);
  const [ebc_lt, set_ebc_lt] = useState(0);
  const [search_text, set_search_text] = useState("");
  const [ebc_gt, set_ebc_gt] = useState(0);
  const [ibu_gt, set_ibu_gt] = useState(0);
  const [ibu_lt, set_ibu_lt] = useState(0);
  const [food_pair, set_food_pair] = useState("");

  const handleSearch = (value: string) => {
    set_search_text(value);
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
            label: <SearchList data={_}></SearchList>,
          };
        });

        setOptions(value ? aa : []);
      });
  };

  useEffect(() => {
    handleSearch(search_text);
  }, [ebc_gt, ebc_lt, ibu_gt, ibu_lt, food_pair]);
  const onSelect = (value: string) => {
    axios
      .get(`https://api.punkapi.com/v2/beers?beer_name=${value}`)
      .then((data) => {
        setBeer(data.data[0]);
        setShowModal(true);
      });
  };

  return (
    <div className="search-container">
      <Modal
        showModal={showModal}
        beer={beer}
        setShowModal={setShowModal}
      ></Modal>

      <Filter
        set_ebc_lt={set_ebc_lt}
        set_ebc_gt={set_ebc_gt}
        set_ibu_gt={set_ibu_gt}
        set_ibu_lt={set_ibu_lt}
        set_food_pair={set_food_pair}
      ></Filter>

      <AutoComplete
        dropdownMatchSelectWidth={252}
        style={{ width: 400 }}
        options={options}
        onSelect={onSelect}
        onSearch={handleSearch}
      >
        <Input.Search size="large" placeholder="beer name" enterButton />
      </AutoComplete>
    </div>
  );
}

export default Search;
