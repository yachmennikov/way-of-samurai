import React from 'react';
import styles from './formcontrols.module.css';

export const Textarea = ({input, meta, ...props}) => {

  const hasError = meta.error && meta.touched;

  return (
    <div className={styles.formControl + ' ' + (hasError && styles.error) }>
      <textarea { ...input } {...props } />
      {
        hasError && <div>{meta.error}</div>
      }
    </div>
  )
}

export const Input = ({input, meta, ...props}) => {

  const hasError = meta.error && meta.touched;

  return (
    <div className={styles.formControl + ' ' + (hasError && styles.error) }>
      <input { ...input } {...props } />
      {
        hasError && <div>{meta.error}</div>
      }
    </div>
  )
}