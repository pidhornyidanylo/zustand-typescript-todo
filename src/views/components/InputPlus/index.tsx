import React, { useCallback, useState } from 'react';
import styles from './index.module.scss';

interface InputPlusProps {
    onAdd: (title: string) => void
}

const InputPlus: React.FC<InputPlusProps> = ({ onAdd }) => {
    const [ inpVal, setInpVal ] = useState('');
    const addTask = useCallback(() => {
        onAdd(inpVal);
        setInpVal('');
    }, [inpVal])
  return (
    <div className={styles.InputPlus}>
      <input 
        type='text' 
        className={styles.InputPlusValue}
        value={inpVal}
        onChange={e => setInpVal(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && addTask() }
        placeholder='Type here...'
      />
      <button
        onClick={addTask}
        aria-label='Add'
        className={styles.InputPlusButton}
      >
      </button>
    </div>
  )
}

export default InputPlus
