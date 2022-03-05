import React, { FC, HTMLAttributes } from 'react'
import cxs from 'classnames'
import { CommentAssociationVariant, variantMap } from '../types/comments'

interface AssociationLabelProps extends HTMLAttributes<HTMLDivElement> {
  variant: CommentAssociationVariant
}

export const AssociationLabel: FC<AssociationLabelProps> = ({
  className,
  variant,
  ...rest
}) => {
  return variant === 'NONE' ? null : (
    <div
      className={cxs(
        'capitalize',
        'border-solid',
        'border-b-grey-light',
        'border-b-2',
        'text-grey-dark',
        'inline-flex',
        'text-md',
        'pb-1',
        className
      )}
      {...rest}
    >
      {variantMap[variant]}
    </div>
  )
}
