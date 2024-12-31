import { SyntheticEvent } from 'react';

type EventType<E extends SyntheticEvent> = (ev: E) => void;

export function composeEvents<E extends SyntheticEvent>(
  ...events: EventType<E>[]
) {
  return (ev: E) => events.forEach(event => event(ev));
}
