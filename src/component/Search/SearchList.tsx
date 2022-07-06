import React from "react";

type Props = {
  name: string;
  image_url: string;
};

export default function SearchList({ data }: any) {
  return (
    <div className="search-list-container">
      <div className="search-list-sub-container">
        <span>
          <b>{data.name}</b>
        </span>
        <span className="small-font">
          bitterness : {data.ibu} | ebc : {data.ebc} | fermentation temp :{" "}
          {data.method.fermentation.temp.value} <span>&#8451;</span>
        </span>
      </div>

      <span>
        <img height={50} width={15} src={data.image_url}></img>
      </span>
    </div>
  );
}
