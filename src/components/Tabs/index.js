import React, { useState } from 'react'
import { Tabs, Tab } from "react-bootstrap"

import Startup from '../Startups/index';
import Mentors from '../Mentors/index';
import Entrepreneur from '../Entrepreneurs/index';
import Channel from '../Channels';
import MyChannel from '../MyChannels';
import Feeds from '../Feeds';

const NetworkTab = () => {
    const [key, setKey] = useState('startups');

    const localData = localStorage.getItem("startupUserInfo");
    const userInfo = localData ? JSON.parse(localData) : null;
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
                <Entrepreneur />
            </Tab>
            {userInfo && userInfo.id && userInfo.userType !== 'startup' &&
                (<Tab eventKey="channels" title="Channels">
                    <Channel />
                </Tab>)}
            <Tab eventKey="feeds" title="Feeds">
                <Feeds />
            </Tab>
            {userInfo && userInfo.userType !== 'startup' && (<Tab eventKey="mychannels" title="MyChannels">
                <MyChannel />
            </Tab>)}

        </Tabs>
    )
}

export default NetworkTab