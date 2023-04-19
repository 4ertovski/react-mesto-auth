import React from "react";
import PopupWithForm from "./PopupWithForm";
function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {

    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    React.useEffect(() => {
        setName('');
        setLink('');
    }, [isOpen]);

    const handleCardName = (e) => {
      setName(e.target.value)
    };

    const handleCardLink = (e) => {
        setLink(e.target.value)
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddPlace({
            name,
            link
        });
    }

    return (
        <PopupWithForm
            name="element"
            title="Новое место"
            button="Сохранить"
            isOpen = { isOpen }
            onClose = { onClose }
            onSubmit = { handleSubmit }
            isLoading={ isLoading }
           >
            <label className="popup__form-field">
                <input className="popup__input popup__input_element_name"
                       name="name"
                       id="element-name-input"
                       type="text"
                       placeholder="Название"
                       minLength="2"
                       maxLength="30"
                       value={name}
                       onChange={ handleCardName }
                       required
                />
                <span className="popup__input-error" id="element-name-input-error"/>
            </label>
            <label className="popup__form-field">
                <input className="popup__input popup__input_element_url"
                       name="link"
                       id="url-input"
                       type="url"
                       placeholder="Ссылка на картинку"
                       value={link}
                       onChange={ handleCardLink }
                       required
                />
                <span className="popup__input-error" id="url-input-error"/>
            </label>
        </PopupWithForm>
    )

}
export default AddPlacePopup;

/* стр 5 Можно сделать универсальный кастомный хук для контроля любого количества инпутов в любых формах:

    JS
    export function useForm(inputValues) {
        const [values, setValues] = useState(inputValues);

        const handleChange = (event) => {
            const {value, name} = event.target;
            setValues({...values, [name]: value});
        };
        return {values, handleChange, setValues};
    }

    Этот код помещают в отдельный файл useForm.js в папке hooks и импортируют функцию туда,
    где нужно контролировать инпуты*/

/* стр 6 Если будет интересно, посмотрите, как можно сделать свой хук валидации.
Этот код помещают в отдельный файл useFormAndValidation.js в папке hooks и импортируют функцию туда, где нужно валидировать:
JS

import {useState, useCallback} from 'react';

export function useFormAndValidation() {
const [ values, setValues ] = useState({});
const [ errors, setErrors ] = useState({});
const [ isValid, setIsValid ] = useState(true);

const handleChange = (e) => {
const {name, value} = e.target
setValues({...values, [name]: value });
setErrors({...errors, [name]: e.target.validationMessage});
setIsValid(e.target.closest('form').checkValidity());
};

const resetForm = useCallback((newValues = {}, newErrors = {}, newIsValid = false) => {
setValues(newValues);
setErrors(newErrors);
setIsValid(newIsValid);
}, [setValues, setErrors, setIsValid]);

return { values, handleChange, errors, isValid, resetForm, setValues, setIsValid };
}


одной строчкой запускается вся валидация:
JS

const {values, handleChange, errors, isValid, setValues, resetForm} = useFormAndValidation()
*/