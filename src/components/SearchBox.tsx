import { useState } from "react";

export const SearchBox: React.FC<{onSearch: (search: string) => void, text: string, setText: (text: string) => void}> = (props) => {

  const handleKeyPress = (key: any) => {

    if(key.keyCode === 13) props.onSearch(props.text);

  }

  return(
    <input type="text" value={props.text} onChange={(e:any) => props.setText(e.target.value)} onKeyDown={handleKeyPress} className="search-box" placeholder="Search by city, or click anywhere on the map!"></input>
  )
}