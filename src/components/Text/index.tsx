import React, { ComponentPropsWithoutRef, PropsWithChildren } from 'react'
import styles from './styles.module.css'
import classNames from 'classnames'

interface Props extends ComponentPropsWithoutRef<'div'>, PropsWithChildren {
  size?: 'small' | 'medium' | 'large'
  isMuted?: boolean
  isParagraph?: boolean
}

export function Text({ size = 'medium', isMuted = false, isParagraph = false, children, className = '' }: Props) {
  const classes = classNames({
    [className]: true,
    [styles.small]: size === 'small',
    [styles.large]: size === 'large',
    [styles.text]: true,
    [styles.muted]: isMuted,
    [styles.paragraph]: isParagraph,
  })

  const Text = isParagraph ? 'p' : 'span';

  return (
    <Text className={classes}>
      {children}
    </Text>
  )
}
