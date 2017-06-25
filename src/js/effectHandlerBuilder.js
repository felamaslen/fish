import { List as list } from 'immutable';

// builds an array of effect handlers (which are anonymous functions on the dispatcher)
export default handlers => {
  return (dispatcher, effect) => {
    list(handlers)
    .filter(handler => effect.type === handler[0])
    .forEach(handler => {
      handler[1](effect.payload, dispatcher);
    });
  };
};

