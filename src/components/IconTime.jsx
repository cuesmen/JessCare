import { useRef } from "react";

export default function IconTime({ title, name, value, onChange, icon, required }) {
    const inputRef = useRef(null);

    const handleClickIcon = () => {
        if (inputRef.current?.showPicker) {
            inputRef.current.showPicker();
        } else {
            inputRef.current.focus();
        }
    };

    return (
        <>
            {title && <label>{title}</label>}
            <div className="input_main date_input" style={{ cursor: "pointer" }}>
                <div className="input_icon" onClick={handleClickIcon}>
                    {icon && icon}
                </div>
                <input
                    ref={inputRef}
                    type="time"
                    name={name}
                    value={value}
                    onChange={onChange}
                    required={required}
                    style={{ cursor: "text" }}
                />
            </div>
        </>
    );
}
