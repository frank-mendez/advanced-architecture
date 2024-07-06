/**
 * Defines a type that recursively transforms all properties of an object T into a serializable format.
 * If a property of T is an object with a `toJSON()` method, it uses the return type of `toJSON()`.
 * Otherwise, it applies the same transformation recursively to the property.
 *
 * @template T - The type of the object to be transformed into a serializable format.
 */
export type SerializeblePayload<T> = T extends object
  ? {
      [K in keyof T]: T[K] extends { toJSON(): infer U }
        ? U
        : SerializeblePayload<T[K]>;
    }
  : T;

/**
 * Serialize event that can be store in the event store
 * @template T - The type of the data of the event.
 */
export interface SerializebleEvent<T = any> {
  streamId: string;
  type: string;
  position: number;
  data: SerializeblePayload<T>;
}
