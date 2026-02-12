/**
 * Type definitions for constants
 * Auto-generated types from constant values
 */

import { MESSAGES } from './messages'
import { LABELS } from './labels'
import { TITLES } from './titles'

/**
 * Extract all possible message keys
 */
export type MessageCategory = keyof typeof MESSAGES
export type MessageKey<T extends MessageCategory> = keyof (typeof MESSAGES)[T]

/**
 * Extract all possible label keys
 */
export type LabelCategory = keyof typeof LABELS
export type LabelKey<T extends LabelCategory> = keyof (typeof LABELS)[T]

/**
 * Extract all possible title keys
 */
export type TitleCategory = keyof typeof TITLES
export type TitleKey<T extends TitleCategory> = keyof (typeof TITLES)[T]

/**
 * Helper type for getting constant value type
 */
export type ConstantValue<T> = T extends Record<string, infer V> ? V : never

/**
 * All error messages
 */
export type ErrorMessage = (typeof MESSAGES.ERROR)[keyof typeof MESSAGES.ERROR]

/**
 * All validation messages
 */
export type ValidationMessage =
  (typeof MESSAGES.VALIDATION)[keyof typeof MESSAGES.VALIDATION]

/**
 * All loading messages
 */
export type LoadingMessage =
  (typeof MESSAGES.LOADING)[keyof typeof MESSAGES.LOADING]

/**
 * All auth messages
 */
export type AuthMessage = (typeof MESSAGES.AUTH)[keyof typeof MESSAGES.AUTH]

/**
 * All navigation labels
 */
export type NavLabel = (typeof LABELS.NAV)[keyof typeof LABELS.NAV]

/**
 * All button labels
 */
export type ButtonLabel = (typeof LABELS.BUTTON)[keyof typeof LABELS.BUTTON]

/**
 * All form labels
 */
export type FormLabel = (typeof LABELS.FORM)[keyof typeof LABELS.FORM]

/**
 * All role labels
 */
export type RoleLabel = (typeof LABELS.ROLE)[keyof typeof LABELS.ROLE]

/**
 * All status labels
 */
export type StatusLabel = (typeof LABELS.STATUS)[keyof typeof LABELS.STATUS]

/**
 * All page titles
 */
export type PageTitle = (typeof TITLES.PAGE)[keyof typeof TITLES.PAGE]

/**
 * All app titles
 */
export type AppTitle = (typeof TITLES.APP)[keyof typeof TITLES.APP]

/**
 * Type-safe constant path
 * Example: 'MESSAGES.ERROR.NETWORK_ERROR'
 */
export type ConstantPath =
  | `MESSAGES.${MessageCategory}.${string}`
  | `LABELS.${LabelCategory}.${string}`
  | `TITLES.${TitleCategory}.${string}`

/**
 * Helper function type for getMessage
 */
export type GetMessage = <T extends MessageCategory>(
  category: T,
  key: string
) => string

/**
 * Helper function type for getLabel
 */
export type GetLabel = <T extends LabelCategory>(
  category: T,
  key: string
) => string

/**
 * Helper function type for getTitle
 */
export type GetTitle = <T extends TitleCategory>(
  category: T,
  key: string
) => string
