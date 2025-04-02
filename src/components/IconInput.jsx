export default function IconInput({ title, type = "text", pattern, maxLength, name, placeholder, value, onChange, required, icon }) {
    return (
        <>
            {title && <label>{title}</label>}
            <div className="input_main">
                <div className="input_icon">
                    {icon ? icon : ""}
                </div>
                <input
                    type={type}
                    value={value}
                    name={name}
                    pattern={pattern}
                    maxLength={maxLength}
                    onChange={onChange}
                    required={required}
                    placeholder={placeholder}
                />
            </div>
        </>
    );
}
