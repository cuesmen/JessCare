import { useRef } from "react";

export default function IconDate({ title, name, value, onChange, icon, required }) {
    const inputRef = useRef(null);

    const handleClick = () => {
        if (inputRef.current && inputRef.current.showPicker) {
            inputRef.current.showPicker(); // Chrome, Edge, etc.
        } else {
            inputRef.current.focus(); // fallback per altri browser
        }
    };

    return (
        <>
            {title && <label>{title}</label>}
            <div onClick={handleClick} className="input_main date_input" style={{ cursor: "pointer" }}>
                <div className="input_icon">
                    {icon && icon}
                </div>
                <input
                    ref={inputRef}
                    type="date"
                    name={name}
                    value={value}
                    onChange={onChange}
                    required={required}
                />
            </div>
        </>
    );
}
