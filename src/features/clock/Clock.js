import React from 'react'
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
// import { useSelector, useDispatch } from 'react-redux'
import { toggleActivity, toggleElapse } from './clockSlice';
import { resetBreak } from '../breakCustomizer/breakCustomizerSlice';
import { resetSession } from '../sessionCustomizer/sessionCustomizerSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faForwardStep, faArrowsRotate } from '@fortawesome/free-solid-svg-icons'
import './clock.scss'

class PresentationalClock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.sessionLength * 60,
            intervalID: undefined
        }
        this.togglePlay = this.togglePlay.bind(this);
        this.reset = this.reset.bind(this)
    }

    startCountdown() {
        const intervalID = setInterval(() => {
            const value = this.state.value;
            if (value > 0) {
                this.setState({value: value - 1})
            } else {
                this.props.toggleActivity();
                this.setState({value: this.props.activity === 'session' ? this.props.sessionLength * 60: this.props.breakLength * 60})
            }
        }, 1000);
        this.setState({intervalID: intervalID})
    }

    endCountdown() {
        clearInterval(this.state.intervalID);
    }

    togglePlay() {
        this.props.toggleElapse();
        if (this.props.elapse) {
            this.startCountdown.call(this);
        } else {
            this.endCountdown.call(this);
        }
    }

    reset() {
        this.props.resetBreak();
        this.props.resetSession();
    }

    render() {
        const minute = Math.floor(this.state.value / 60);
        const second = this.state.value % 60;
        let secondString
        if (second < 10) {
            secondString = '0' + second;
        }

        return (
            <div>
                <div className='timer-wrapper'>
                    <div id='timer' className='timer'>
                        <div id='timer-label' className='label'>{this.props.activity}</div>
                        <div id='time-left' className='value'>{`${minute}:${secondString}`}</div>
                    </div>
                </div>
                <div className='buttons-wrapper'>
                    <Button onClick={() => this.togglePlay} id='start_stop'>
                        <FontAwesomeIcon icon={faForwardStep} />
                    </Button>
                    <Button onClick={() => this.reset} id='reset'>
                        <FontAwesomeIcon icon={faArrowsRotate} />
                    </Button>
                </div>
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        sessionLength: state.sessionCustomizer.value,
        breakLength: state.breakCustomizer.value,
        activity: state.clock.activity,
        elapse: state.clock.elapse
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        toggleActivity: () => dispatch(toggleActivity),
        toggleElapse: () => dispatch(toggleElapse),
        resetBreak: () => dispatch(resetBreak),
        resetSession: () => dispatch(resetSession)
    }
}

export const WorkingClock = connect(mapStateToProps, mapDispatchToProps)(PresentationalClock);