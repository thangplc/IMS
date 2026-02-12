/**
 * Central export for all constants
 * Single import point: import { MESSAGES, LABELS, TITLES } from '@/constants'
 */

import { LABELS } from './labels'
import { MESSAGES } from './messages'
import { TITLES } from './titles'

export { getMessage } from './messages'
export { getLabel } from './labels'
export { getTitle } from './titles'

/**
 * Export types for TypeScript usage
 */
export type {
  MessageCategory,
  MessageKey,
  LabelCategory,
  LabelKey,
  TitleCategory,
  TitleKey,
  ErrorMessage,
  ValidationMessage,
  LoadingMessage,
  AuthMessage,
  NavLabel,
  ButtonLabel,
  FormLabel,
  RoleLabel,
  StatusLabel,
  PageTitle,
  AppTitle,
  ConstantPath,
  GetMessage,
  GetLabel,
  GetTitle,
} from './types'

/**
 * Re-export all constants as a single object (optional usage)
 */
export const TEXTS = {
  messages: MESSAGES,
  labels: LABELS,
  titles: TITLES,
} as const
