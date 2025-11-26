export type Nothing = undefined | null
export type UnknownFunction = (...args: unknown[]) => unknown

export type StringIndexedObject<T=unknown> = Record<string, T>
export type ListSource = null | undefined | string | string[]
export type HashSource = StringIndexedObject | ListSource

export type HashKeyFunction = (
  key: string,
  value: unknown,
  source: HashSource,
  hash: object
) => string

export type HashValueFunction = (
  value: unknown,
  key: string,
  source: HashSource,
  hash: object
) => unknown

export type ObjMapFunction = (
  value: unknown,
  key: string
) => unknown

// type ExtractFunction = (key: string) => unknown
// type ExtractKeys = object | string[] | string | RegExp | ExtractFunction
export type KeyFunction = (key: string) => string
export type ValueFunction = (value: unknown) => unknown
// export type StringIndexedObject = { [key: string]: unknown }
