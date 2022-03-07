import React, { useState } from 'react'
import styles from './styles.module.css'
import { Card, Button } from 'react-bootstrap'
import { useHistory } from "react-router-dom";
import Loader1 from "../../../Loader/index";
import axios from 'axios';
import { url } from '../../../../utilities';
import Message from '../../../Message';

const ChannelCard = ({ name, address, sector, image, id }) => {
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, seterror] = useState(null);
    if (!image) image = 'https://api.startupindia.gov.in/sih/api/file/user/image/Startup?fileName=e98cf97c-a79e-4542-bf8f-77dcc5340b87.png'
    const history = useHistory();
    const localData = localStorage.getItem("startupUserInfo");
    const userInfo = localData ? JSON.parse(localData) : null;

    const joinChannelHandler = async () => {
        try {
            if (userInfo && userInfo.id) {
                setLoading(true);
                const { data } = await axios.get(`${url}/api/channel/joinChannel/${id}/${userInfo.id}`)
                setLoading(false);
                if (data && data.success) {
                    setSuccess(true);
                } else {
                    if (data) {
                        seterror(data.message);
                    } else {
                        seterror("Network error");
                    }
                }
            }
            else {
                history.push('/login')
            }
        }
        catch (e) {
            setLoading(false);
            seterror("Network Error");
        }
    }
    return (
        <Card className='mx-2 my-2 shadow' style={{ width: '16rem', padding: '0px' }}>
            <Card.Body>
                <div className={styles.section1}>
                    <img className={styles.logo} src={image} alt="startup_img" />
                    <Card.Title className='mx-3'>{name} <br /> <p className='text-secondary'>{sector}</p></Card.Title>
                </div>
                {error && <Message variant={"danger"}>{error}</Message>}
                {loading ? (
                    <Loader1></Loader1>
                ) :
                    <Button variant="primary" onClick={joinChannelHandler}>Join Channel</Button>
                }
            </Card.Body>
        </Card>
    )
}

export default ChannelCard