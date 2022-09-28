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
        this.audioBeep = React.createRef;
    }

    startCountdown() {
        const intervalID = setInterval(() => {
            const value = this.state.value;
            if (value > 0) {
                this.setState({value: value - 1})
            } else {
                const switchCountdown = async () => {
                    await this.props.toggleActivity();
                    this.audioBeep.play()
                    this.setState({value: this.props.activity === 'session' ? this.props.sessionLength * 60: this.props.breakLength * 60})
                }
                switchCountdown();
            }
        }, 1000);
        this.setState({intervalID: intervalID})
    }

    endCountdown() {
        clearInterval(this.state.intervalID);
    }

    async togglePlay() {
        await this.props.toggleElapse();
        if (this.props.elapse) {
            this.startCountdown.call(this);
        } else {
            this.endCountdown.call(this);
        }
    }

    async reset() {
        await this.props.resetBreak();
        await this.props.resetSession();
        this.audioBeep.pause();
        this.audioBeep.currentTime = 0;
        this.setState({
            value: this.props.sessionLength * 60
        })
        if (this.props.elapse) {
            await this.props.toggleElapse();
            this.endCountdown.call(this);
        }
    }

    render() {
        const minute = Math.floor(this.state.value / 60);
        const second = this.state.value % 60;
        let secondString
        if (second < 10) {
            secondString = '0' + second;
        } else {
            secondString = second.toString();
        }

        return (
            <div>
                <div className='timer-wrapper'>
                    <div id='timer' className='timer'>
                        <div id='timer-label' className='label'>{capitalizeFirstLetter(this.props.activity)}</div>
                        <div id='time-left' className='value'>{
                        `${minute}:${secondString}`
                        }</div>
                    </div>
                </div>
                <div className='buttons-wrapper'>
                    <Button onClick={this.togglePlay} id='start_stop'>
                        <FontAwesomeIcon icon={faForwardStep} />
                    </Button>
                    <Button onClick={this.reset} id='reset'>
                        <FontAwesomeIcon icon={faArrowsRotate} />
                    </Button>
                </div>
                <audio
                    id="beep"
                    preload="auto"
                    ref={(audio) => {
                        this.audioBeep = audio;
                    }}
                    src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
                />
            </div>

        )
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.activity === 'session') {
            if (prevProps.sessionLength !== this.props.sessionLength) {
                this.setState({value: this.props.sessionLength * 60})
            }} else {
                if (prevProps.breakLength !== this.props.breakLength) {
                    this.setState({value: this.props.breakLength * 60})
                }
            }
        }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
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
        toggleActivity: () => {dispatch(toggleActivity())},
        toggleElapse: () => {dispatch(toggleElapse())},
        resetBreak: () => {dispatch(resetBreak())},
        resetSession: () => {dispatch(resetSession())}
    }
}

export const WorkingClock = connect(mapStateToProps, mapDispatchToProps)(PresentationalClock);