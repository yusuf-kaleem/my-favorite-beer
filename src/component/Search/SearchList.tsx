import React from 'react'

type Props = {
    name:string,
    image_url:string
}

export default function SearchList({data}: any) {
  return (
    <div
    style={{
      display: "flex",
      justifyContent: "space-between",
    }}
  >
    <div style={{display:'flex', flexDirection:'column'}}>
    <span><b>{data.name}</b></span>
    <span style={{fontSize:12,opacity:0.8}}>bitterness : {data.ibu} | ebc : {data.ebc} | fermentation temp : {data.method.fermentation.temp.value} <span>&#8451;</span></span> 
    </div>
    

    <span>
      <img height={50} width={15} src={data.image_url}></img>
    </span>
  </div>
  )
}