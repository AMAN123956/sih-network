import React from 'react'
import styles from './styles.module.css'

const FeedCard = ({ id, value, image, createdAt }) => {
    return (
        <div className={`shadow ${styles.container1}`}>
            <div className={styles.section2}>
                <img src={image} alt='postImg' />
                {value}
            </div>
            <div className={styles.section1}>
                <div className={styles.left}>
                    <img src={image} alt='authorImg' />
                   &nbsp; Aman
                </div>
                <div className={styles.right}>
                    {String(createdAt).slice(0,10)}
                </div>
            </div>

        </div>
    )
}

export default FeedCard