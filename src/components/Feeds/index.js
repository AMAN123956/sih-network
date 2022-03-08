import React, { useState, useEffect } from 'react'
import styles from './styles.module.css'
import { url } from '../../utilities'
import axios from 'axios'
import Message from '../Message'
import FeedCard from './UI/FeedCard'

const Feeds = () => {
    const [error, seterror] = useState(null);
    const [record, setrecord] = useState([{}]);
    useEffect(() => {
        async function fetchFeeds() {
            try {
                const { data } = await axios.get(`${url}/api/feed/`)
                // console.log(data)
                if (data && data.success) {
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
            {record.map(feed => <FeedCard id={feed._id} createdAt={feed.createdAt} image={feed.image} value={feed.value} />)}
           <br />
            <button className={styles.loadMoreBtn}>Load More</button>
            <button className={styles.addPostBtn}>Add Your Post</button>
        </div>
    )
}

export default Feeds