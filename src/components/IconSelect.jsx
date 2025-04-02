export default function IconSelect({ title, name, value, onChange, required, icon, options = [] }) {
    return (
        <>
            {title && <label>{title}</label>}
            <div className="input_main select_input">
                <div className="input_icon">
                    {icon && icon}
                </div>
                <select name={name} value={value} onChange={onChange} required={required}>
                    <option value="">Seleziona</option>
                    {options.map((opt, index) => (
                        <option key={index} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
            </div>
        </>
    );
}
