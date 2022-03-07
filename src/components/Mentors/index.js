import React, { useState, useEffect } from 'react'
import styles from './styles.module.css'
import axios from 'axios'
import MentorCard from './UI/MentorCard/index'
import { url } from '../../utilities'
import Message from "../Message/index";
const Mentors = () => {
    const [error, seterror] = useState(null);
    const [record, setrecord] = useState([{}])
    // localStorage.setItem('networkData', JSON.stringify(dummyData))

    useEffect(() => {
        const fetchInvestorList = async () => {
            try {
                console.log('request')
                const data = await axios.get(`${url}/api/investor`);
                console.log(data)
                if (data.data.success) {
                    console.log(data.data.data)
                    setrecord(data.data.data)
                } else {
                    seterror(`${data.error}`);
                }
            }
            catch (e) {
                seterror("Network Error");
            }
        }
        fetchInvestorList();
    }, []);
    return (
        <div className={styles.container1}>
            {error && <Message variant={"danger"}>{error}</Message>}
            {record.map(item => <MentorCard id={item._id} name={item.name} sector={item.sector} image={item.image} />)}
        </div>
    )
}


export default Mentors
