export default function IconInput({ type = "text", placeholder, value, onChange, required, icon }) {
    return (
        <div className="input_main">
            <div className="input_icon">
                {icon ? icon : ""}
            </div>
            <input
                type={type}
                value={value}
                onChange={onChange}
                required={required}
                placeholder={placeholder}
            />
        </div>
    );
}
