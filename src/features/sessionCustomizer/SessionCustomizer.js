import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from './sessionCustomizerSlice'
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

import '../customizer.scss';

export function SessionCustomizer() {
  const sessionLength = useSelector(state => state.sessionCustomizer.value);
  const elapse = useSelector(state => state.clock.elapse)
  const nonSubtractable = sessionLength <= 1;
  const nonAddable = sessionLength > 120;
  const dispatch = useDispatch()

  return (
    <div className='button-set'>
    <Button
        id="session-decrement"
        aria-label="session-decrement"
        onClick={() => dispatch(decrement())}
        disabled={elapse || nonSubtractable}
    >
      <FontAwesomeIcon icon={faMinus} />
    </Button>
    <span id="session-length" className="value-set">{sessionLength}</span>
    <Button
        id="session-increment"
        aria-label="session-increment"
        onClick={() => dispatch(increment())}
        disabled={elapse || nonAddable}
    >
        <FontAwesomeIcon icon={faPlus} />
    </Button>
    </div>
  )
}