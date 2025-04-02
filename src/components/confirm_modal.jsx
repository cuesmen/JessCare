import React, { useState } from 'react';
import Alert from './alert';

function ConfirmModal({ Title, Description, onConfirm, onCancel, TextConfirm, TextToConfirm, Image }) {
    const [openTextConfirm, setOpenTextConfirm] = useState(null);
    const [showWarning, setShowWarning] = useState(null);
    const [inputValue, setInputValue] = useState("");

    const handleConfirm = () => {
        if (inputValue === TextToConfirm) {
            onConfirm();
        } else {
            setShowWarning(true);
        }
    };

    return (
        <>
            <div className='confirm_modal_overlay zindex1000'>
                <div className='confirm_modal'>
                    <h2>{Title}</h2>
                    <p>{Description}</p>
                    {Image && (
                        <div className="Alert_MainDiv_Image">
                            <img src={Image} alt="Alert visual" />
                        </div>
                    )}
                    <div>
                        {!TextConfirm && <button onClick={onConfirm}>Conferma</button>}
                        {TextConfirm && <button onClick={() => setOpenTextConfirm(true)}>Conferma</button>}
                        <button onClick={onCancel}>Annulla</button>
                    </div>
                </div>
            </div>
            {TextConfirm && openTextConfirm &&
                <div className='confirm_modal_overlay zindex1000'>
                    <div className='confirm_modal'>
                        <h2>{Title}</h2>
                        <p>Inserisci "{TextToConfirm}" qui sotto e clicca su conferma per eliminare la configurazione</p>
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder={`Inserisci ${TextToConfirm}`}
                        />
                        <div>
                            <button Confirm={true} onClick={handleConfirm}>Conferma</button>
                            <button onClick={onCancel}>Annulla</button>
                        </div>
                    </div>
                </div>
            }
            {showWarning && <Alert Type="warning" Title="Warning" Description={`La parola inserita non è corretta, devi digitare ${TextToConfirm}`} onClose={() => setShowWarning(false)} />}
        </>
    );
}

export default ConfirmModal;

