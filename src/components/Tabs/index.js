import React,{useState} from 'react'
import { Tabs,Tab } from "react-bootstrap"

import Startup from '../Startups/index';

const NetworkTab = () => {
    const [key, setKey] = useState('home');

    return (
        <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3"
        >
            <Tab eventKey="startups" title="Startups">
                <Startup />
            </Tab>
            <Tab eventKey="mentors" title="Mentors">
                Mentors
            </Tab>
            <Tab eventKey="investors" title="Investors">
                Investors
            </Tab>
        </Tabs>
    )
}

export default NetworkTab