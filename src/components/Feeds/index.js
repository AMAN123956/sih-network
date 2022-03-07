import React, { useState, useEffect } from 'react'
import styles from '.styles.module.css'
import { url } from '../../utilities'
import axios from 'axios'
import Message from '../Message'
const Feeds = () => {
    const [error, seterror] = useState(null);
    const [record, setrecord] = useState([{}]);
    useEffect(() => {
        async function fetchFeeds() {
            try {
                const { data } = await axios.find(`${url}/api/feed/`)
                if (data && data.success) {
                    console.log('feed')
                    console.log(data.data)
                    setrecord(data.data)
                }
            }
            catch (e) {
                seterror(`${e.error}`);
            }
        }
        fetchFeeds();
    }, [])
    return (
        <div className={styles.container1}>
            {error && <Message variant={"danger"}>{error}</Message>}
        </div>
    )
}

export default Feeds