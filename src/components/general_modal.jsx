import { useEffect } from "react";
import { IoIosClose } from "react-icons/io";

export default function GeneralModal({ opened, title, onClose, children }) {
    useEffect(() => {
        if (opened) {
            document.body.classList.add("no-scroll");
            document.documentElement.classList.add("no-scroll");
        } else {
            document.body.classList.remove("no-scroll");
            document.documentElement.classList.remove("no-scroll");
        }
    
        return () => {
            document.body.classList.remove("no-scroll");
            document.documentElement.classList.remove("no-scroll");
        };
    }, [opened]);
    

    return (
        <div className="loader-overlay">
            <div className='loading_modal_overlay'>
                <div className="general_modal_upper">
                    <div className="general_modal">
                        <div className="general_modal_upperbar">
                            <div className="general_modal_upperbar_title">
                                {title}
                            </div>
                            <div className="general_modal_upperbar_icon" onClick={onClose}>
                                <IoIosClose />
                            </div>
                        </div>

                        {/* CONTENT */}
                        <div className="general_modal_content">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
