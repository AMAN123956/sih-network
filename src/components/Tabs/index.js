import React,{useState} from 'react'
import { Tabs,Tab } from "react-bootstrap"

import Startup from '../Startups/index';
import Mentors from '../Mentors/index';

const NetworkTab = () => {
    const [key, setKey] = useState('startups');

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
            <Tab eventKey="investors" title="Investors">
                <Mentors />
            </Tab>
            <Tab eventKey="entrepreneurs" title="Entrepreneurs">
                Entrepreneurs
            </Tab>
            
        </Tabs>
    )
}

export default NetworkTab