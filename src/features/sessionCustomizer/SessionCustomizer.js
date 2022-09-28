import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from './sessionCustomizerSlice'
import Button from 'react-bootstrap/Button';

import '../customizer.scss';

export function SessionCustomizer() {
  const sessionLength = useSelector(state => state.sessionCustomizer.value);
  const dispatch = useDispatch()

  return (
    <div className='button-set'>
    <Button
        id="session-decrement"
        aria-label="session-decrement"
        onClick={() => dispatch(decrement())}
    >
        -
    </Button>
    <span id="session-length" className="value-set">{sessionLength}</span>
    <Button
        id="session-increment"
        aria-label="session-increment"
        onClick={() => dispatch(increment())}
    >
        +
    </Button>
    </div>
  )
}