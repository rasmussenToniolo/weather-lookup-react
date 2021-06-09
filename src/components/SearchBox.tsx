import { useState } from "react";

export const SearchBox: React.FC<{onSearch: (search: string) => void}> = (props) => {
  const [text, setText] = useState('');

  const updateText = (e: any) => {
    setText(e.target.value);
  }

  const handleKeyPress = (key: any) => {

    if(key.keyCode === 13) props.onSearch(text);

  }

  return(
    <input type="text" value={text} onChange={updateText} onKeyDown={handleKeyPress} className="search-box" placeholder="Search by city, or click anywhere on the map!"></input>
  )
}