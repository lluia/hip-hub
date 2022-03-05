export const variantMap = {
  CONTRIBUTOR: 'contributor',
  COLLABORATOR: 'collaborator',
  FIRST_TIMER: 'first timer',
  FIRST_TIME_CONTRIBUTOR: 'first time contributor',
  MEMBER: 'member',
  OWNER: 'owner',
} as const

export type CommentAssociationVariant = keyof typeof variantMap & 'NONE'
