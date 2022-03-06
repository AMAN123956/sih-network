import React from 'react'
import styles from './styles.module.css'
import { Card, Button } from 'react-bootstrap'


const MentorCard = ({name,id}) => {
    return (
        <Card className='mx-2 shadow' style={{ width: '16rem', padding: '0px' }}>
            <Card.Body>
                <div className={styles.section1}>
                    <img className={styles.logo} src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909__340.png" alt="startup_img" />
                    <Card.Title className='mx-3'>{name}</Card.Title>
                </div>

                <Button variant="primary">Get Details</Button>
            </Card.Body>
        </Card>
    )
}


export default MentorCard