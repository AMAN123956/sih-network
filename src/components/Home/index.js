import React from 'react'
import styles from './styles.module.css'
import Filter from '../Filter/index'

function Home() {
    return (
        <div className={styles.container1}>
            <div className={styles.section1}>
                <h2>Network</h2>
            </div>
            <div className={styles.section2}>
                <div className={styles.leftSection}>
                    <Filter />
                </div>
                <div className={styles.rightSection}></div>
            </div>
        </div>
    )
}

export default Home