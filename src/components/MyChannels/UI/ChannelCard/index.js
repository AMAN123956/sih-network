import React, { useState } from 'react'
import styles from './styles.module.css'
import { Card, Button } from 'react-bootstrap'
import { useHistory } from "react-router-dom";
import { url } from '../../../../utilities';
import Message from '../../../Message';

const ChannelCard = ({ name, address, sector, image, id }) => {
    if (!image) image = 'https://api.startupindia.gov.in/sih/api/file/user/image/Startup?fileName=e98cf97c-a79e-4542-bf8f-77dcc5340b87.png'
    const history = useHistory();
    const localData = localStorage.getItem("startupUserInfo");
    const userInfo = localData ? JSON.parse(localData) : null;

    const viewChannelHandler = () => {

        if (userInfo && userInfo.id) {
            window.location = `${url}/socket/${userInfo.userType}/${userInfo.id}/?channel=${id}`
        }
        else {
            history.push('/login')
        }
    }
    return (
        <Card className='mx-2 my-2 shadow' style={{ width: '16rem', padding: '0px' }}>
            <Card.Body>
                <div className={styles.section1}>
                    <img className={styles.logo} src={image} alt="startup_img" />
                    <Card.Title className='mx-3'>{name} <br /> <p className='text-secondary'>{sector}</p></Card.Title>
                </div>
                <Button className={styles.joinChannelBtn} onClick={viewChannelHandler}>View Channel</Button>
            </Card.Body>
        </Card>
    )
}

export default ChannelCard