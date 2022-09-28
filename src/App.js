import React from 'react';
import { BreakCustomizer } from './features/breakCustomizer/BreakCustomizer';
import { SessionCustomizer } from './features/sessionCustomizer/SessionCustomizer';
import { WorkingClock } from './features/clock/Clock'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './App.scss';


function App() {
    return (
        <Container>
            <h1>25+5 Clock</h1>
            <Row>
                <Col>
                    <p className='customizer-set-title'>Break Length</p>
                    <BreakCustomizer/>
                </Col>
                <Col>
                    <p className='customizer-set-title'>Session Length</p>
                    <SessionCustomizer/>
                </Col>
            </Row>
            <Row>
                <WorkingClock/>
            </Row>
        </Container>
        
    )
}

export default App;