import React from 'react'
import styles from './styles.module.css'
import { Card, Button } from 'react-bootstrap'


const MentorCard = ({ name, id, imgUrl, sector }) => {
    if (!imgUrl) imgUrl = 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909__340.png'
    const localData = localStorage.getItem("startupUserInfo");
    const userInfo = localData ? JSON.parse(localData) : null;

    const textMsgHandler = () => {
        console.log('here')
        console.log(userInfo)
        if (userInfo.id) {
            console.log('receiverId')
            console.log(id)
            console.log('senderId')
            console.log(userInfo.id)
            window.location = `http://localhost:5000/socket/${userInfo.userType}/${userInfo.id}/?investor=${id}`
        }
    }
    return (
        <Card className='mx-2 my-2 shadow' style={{ width: '16rem', padding: '0px' }}>
            <Card.Body>
                <div className={styles.section1}>
                    <img className={styles.logo} src={imgUrl} alt="startup_img" />
                    <Card.Title className='mx-3'>{name}<br /> <p className='text-secondary'>{sector}</p></Card.Title>
                </div>
                <Button className={styles.chatBtn} variant="dark" onClick={textMsgHandler}>Message</Button>
                <Button variant="primary">View Details</Button>
            </Card.Body>
        </Card>
    )
}


export default MentorCard