import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import axios from 'axios'
import ChannelCard from './UI/ChannelCard/index'
import { url } from '../../utilities'

const Channel = () => {
    const [error, seterror] = useState(null);
    const [record, setrecord] = useState([{}])

    // localStorage.setItem('networkData',JSON.stringify(dummyData))
        
   
    useEffect(() => {
        const fetchChannelList = async () => {
            console.log('request')
            const data = await axios.get(`${url}/api/channel`);
            console.log('channels data')
            console.log(data)
            if (data.data.success) {
                console.log('startup')
                console.log(data.data.data)
                setrecord(data.data.data)
            } else {
                seterror(`${data.error}`);
            }
        }
        fetchChannelList();
    }, []);
    return (
        <div id="container" className={styles.container1}>
            {record.map(item => <ChannelCard id={item._id} name={item.name} sector={item.sector} />)}
        </div>
    )
}
export default Channel