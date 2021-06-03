import { useState } from "react";

export function SearchBox() {
  const [text, setText] = useState('');

  const updateText = (e: any) => {
    setText(e.target.value);
  }

  return(
    <input type="text" value={text} onChange={updateText} className="search-box" placeholder="Search by city or country..."></input>
  )
}