import React,{useState} from 'react'
import { Tabs,Tab } from "react-bootstrap"

const NetworkTab = () => {
    const [key, setKey] = useState('home');

    return (
        <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3"
        >
            <Tab eventKey="startups" title="startups">
                Startups
            </Tab>
            <Tab eventKey="mentors" title="Profile">
                Mentors
            </Tab>
            <Tab eventKey="investors" title="Contact">
                Investors
            </Tab>
        </Tabs>
    )
}

export default NetworkTab