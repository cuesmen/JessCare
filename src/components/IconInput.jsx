export default function IconInput({ title, type = "text", pattern, maxLength, name, placeholder, value, onChange, required, icon, height }) {
    return (
        <>
            {title && <label>{title}</label>}
            <div className="input_main">
                <div className="input_icon">
                    {icon ? icon : ""}
                </div>
                {type === "textarea" ? (
                    <textarea
                        value={value}
                        name={name}
                        onChange={onChange}
                        required={required}
                        placeholder={placeholder}
                        style={{
                            height: height || "150px", // Altezza predefinita più lunga
                            resize: "vertical", // Permette di ridimensionare verticalmente
                            wordWrap: "break-word", // Spezza il testo lungo
                            overflowWrap: "break-word", // Compatibilità con browser moderni
                        }}
                    />
                ) : (
                    <input
                        type={type}
                        value={value}
                        name={name}
                        pattern={pattern}
                        maxLength={maxLength}
                        onChange={onChange}
                        required={required}
                        placeholder={placeholder}
                        style={{ height }} // Applica l'altezza personalizzata
                    />
                )}
            </div>
        </>
    );
}
