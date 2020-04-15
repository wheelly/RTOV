export interface MetaData {
  className: string
  schema: Object
}

export const isComplexType = (data: any) => typeof data === 'object';