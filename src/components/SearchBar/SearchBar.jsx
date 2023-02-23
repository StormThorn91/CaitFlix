import s from "./style.module.css";
import { Search as SearchIcon } from "react-bootstrap-icons";
import { useState } from "react";

export function SearchBar({onSubmit}) {
    const [value, setValue] = useState("");
    const submit = (e) => {
        if(e.key === "Enter" && e.target.value.trim() !== "") {
            onSubmit(e.target.value);
            setValue("");
        }
    }

    const handleChange = (e) => {
        setValue(e.target.value);
    }

    return (
        <div>
            <SearchIcon size={27} className={s.icon} />
            <input 
                onKeyUp={submit} 
                onChange={handleChange}
                className={s.input} 
                type="text" 
                value={value}
                placeholder={"Search a TV Show you may like"} />
        </div>
    );
}