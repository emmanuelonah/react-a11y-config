import { SyntheticEvent } from 'react';

import { composeEvents } from './index.util';

describe('composeEvents', () => {
  it('should call all provided event handlers', () => {
    const event1 = jest.fn();
    const event2 = jest.fn();
    const event3 = jest.fn();

    const composedEvent = composeEvents(event1, event2, event3);

    const mockEvent = ({
      preventDefault: jest.fn(),
    } as unknown) as SyntheticEvent;
    composedEvent(mockEvent);

    expect(event1).toHaveBeenCalledWith(mockEvent);
    expect(event2).toHaveBeenCalledWith(mockEvent);
    expect(event3).toHaveBeenCalledWith(mockEvent);
    expect(event1).toHaveBeenCalledTimes(1);
    expect(event2).toHaveBeenCalledTimes(1);
    expect(event3).toHaveBeenCalledTimes(1);
  });

  it('should work with a single event handler', () => {
    const event = jest.fn();
    const composedEvent = composeEvents(event);

    const mockEvent = ({
      preventDefault: jest.fn(),
    } as unknown) as SyntheticEvent;
    composedEvent(mockEvent);

    expect(event).toHaveBeenCalledWith(mockEvent);
    expect(event).toHaveBeenCalledTimes(1);
  });

  it('should work with no event handlers', () => {
    const composedEvent = composeEvents();

    const mockEvent = ({
      preventDefault: jest.fn(),
    } as unknown) as SyntheticEvent;
    expect(() => composedEvent(mockEvent)).not.toThrow();
  });
});
