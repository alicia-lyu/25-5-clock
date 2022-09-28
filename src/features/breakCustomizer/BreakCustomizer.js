import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from './breakCustomizerSlice'
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';


import '../customizer.scss';

export function BreakCustomizer() {
  const breakValue = useSelector(state => state.breakCustomizer.value);
  const elapse = useSelector(state => state.clock.elapse);
  const nonSubtractable = breakValue <= 0;
  const nonAddable = breakValue >= 60;
  const dispatch = useDispatch()

  return (
    <div className='button-set'>
      <Button
        id="break-decrement"
        aria-label="break-decrement"
        onClick={() => dispatch(decrement())}
        disabled={elapse || nonSubtractable}
      >
        <FontAwesomeIcon icon={faMinus} />
      </Button>
      <span id="break-length" className="value-set">{breakValue}</span>
      <Button
        id="break-increment"
        aria-label="break-increment"
        onClick={() => dispatch(increment())}
        disabled={elapse || nonAddable}
      >
        <FontAwesomeIcon icon={faPlus} />
      </Button>
    </div>
  )
}