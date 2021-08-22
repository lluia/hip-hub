import React from 'react'
import styles from './styles.module.scss'

interface Props {
  html: string
}

export function MetaBlock({ html }: Props) {
  return (
    <div
      className={styles.markdown}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
