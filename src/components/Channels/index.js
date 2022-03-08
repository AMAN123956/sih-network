import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import axios from 'axios'
import ChannelCard from './UI/ChannelCard/index'
import { url } from '../../utilities'

const Channel = () => {
    const [error, seterror] = useState(null);
    const [record, setrecord] = useState([{}])

    // localStorage.setItem('networkData',JSON.stringify(dummyData))

    const localData = localStorage.getItem("startupUserInfo");
    const userInfo = localData ? JSON.parse(localData) : null;

    useEffect(() => {
        const fetchChannelList = async () => {
            try {
                let data;
                if (userInfo && userInfo.id) {
                    data = await axios.get(`${url}/api/channel/?userId=${userInfo.id}`);
                }
                else {
                    data = await axios.get(`${url}/api/channel`);
                }
                if (data.data.success) {
                    setrecord(data.data.data)
                } else {
                    seterror(`${data.error}`);
                }
            }
            catch (e) {
                seterror(e.error)
            }
        }
        fetchChannelList();
    }, []);
    return (
        <div id="container" className={styles.container1}>
            {record.map(item => <ChannelCard id={item._id} name={item.name} image={item.image} />)}
        </div>
    )
}
export default Channel