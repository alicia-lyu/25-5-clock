import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from './breakCustomizerSlice'
import Button from 'react-bootstrap/Button';

import '../customizer.scss';

export function BreakCustomizer() {
  const breakValue = useSelector(state => state.breakCustomizer.value);
  const dispatch = useDispatch()

  return (
    <div className='button-set'>
      <Button
        id="break-decrement"
        aria-label="break-decrement"
        onClick={() => dispatch(decrement())}
      >
        -
      </Button>
      <span id="break-length" className="value-set">{breakValue}</span>
      <Button
        id="break-increment"
        aria-label="break-increment"
        onClick={() => dispatch(increment())}
      >
        +
      </Button>
    </div>
  )
}