import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import axios from 'axios'
import ChannelCard from './UI/ChannelCard/index'
import { url } from '../../utilities'
import { useHistory } from 'react-router-dom'
const MyChannel = () => {
    const [error, seterror] = useState(null);
    const [record, setrecord] = useState([{}])

    // localStorage.setItem('networkData',JSON.stringify(dummyData))

    const localData = localStorage.getItem("startupUserInfo");
    const userInfo = localData ? JSON.parse(localData) : null;
    const history = useHistory()
    useEffect(() => {
        const fetchChannelList = async () => {
            console.log('request')
            let data;
            if (userInfo && userInfo.id && userInfo.userType === 'entrepreneur') {
                data = await axios.get(`${url}/api/channel/?users=${userInfo.id}`);
            }
            else if(userInfo && userInfo.id && userInfo.userType === 'investor'){
                data = await axios.get(`${url}/api/channel/?investors=${userInfo.id}`);
            }
            else {
                history.push('/login')
            }
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
            {record.map(item => <ChannelCard id={item._id} name={item.name} image={item.image} />)}
        </div>
    )
}
export default MyChannel