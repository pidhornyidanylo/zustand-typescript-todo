import React, { useState, useRef, useEffect } from 'react'
import styles from './index.module.scss';

interface InputTaskProps {
    id: string,
    title: string,
    onDone: (id: string) => void,
    onEdited: (id: string, title: string) => void,
    onRemoved: (id: string) => void
}

const InputTask: React.FC<InputTaskProps> = ({ id, title, onDone, onEdited, onRemoved }) => {

    const [ checked, setChecked ] = useState<boolean>(false);
    const [ isEditMode, setisEditMode ] = useState<boolean>(false);
    const [ value, setValue ] = useState(title);
    const editTitleInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
       isEditMode && editTitleInputRef?.current?.focus
    }, [isEditMode])

  return (
    <div className={styles.inputTask}>
        <label className={styles.inputTaskLabel}>
                <input 
                    type="checkbox" 
                    disabled={isEditMode}
                    checked={checked} 
                    className={styles.inputTaskCheckbox} 
                    onChange={(e) => {
                        setChecked(e.target.checked);
                        e.target.checked && setTimeout(() => onDone(id), 400);
                    }} 
                />
                {isEditMode ? (
                <input 
                    ref={editTitleInputRef}
                    type="text"
                    value={value}
                    onChange={e => setValue(e.target.value)}  
                    className={styles.inputTaskEditTitle}
                /> 
                ) : ( 
                <h3 className={styles.inputTaskTitle}>{value}</h3>
                )}
            </label>
            {isEditMode ? (
                <button 
                aria-label='Save' 
                className={styles.inputTaskOk}
                onKeyDown={e => {
                    if(e.key === 'Enter') {
                        onEdited(title, id);
                        setisEditMode(!isEditMode)
                    }
                }}
                onClick={() => {
                    onEdited(title, id);
                    setisEditMode(!isEditMode)
                }} 
            />
            ) : (
                <button 
                aria-label='Edit' 
                className={styles.inputTaskEdit} 
                onClick={() => {
                    setisEditMode(!isEditMode);
                }} 
            />
            )}
            <button 
                aria-label='Remove'
                className={styles.inputTaskRemove}
                onClick={() => {
                    confirm('Are you sure?') && onRemoved(id);
                }} 
            />
    </div>
  )
}

export default InputTask
