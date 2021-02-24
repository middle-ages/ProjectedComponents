export type EmptyRecord = Record<any, never>;
export const EmptyRecord = {} as EmptyRecord;

export type Optional<T> = undefined | false | EmptyRecord | T;

export interface ToRequired<T> {
  (partial: T): Required<T>;
}
