import React, { useState,useEffect } from 'react'
import styles from './styles.module.css'
import axios from 'axios'
import MentorCard from './UI/MentorCard/index'
import { url } from '../../utilities'
const Mentors = () => {
    const [error, seterror] = useState(null);
    const [record, setrecord] = useState([{}])
    // localStorage.setItem('networkData', JSON.stringify(dummyData))

    useEffect(() => {
        const fetchInvestorList = async () => {
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
        fetchInvestorList();
    }, []);
    return (
        <div className={styles.container1}>
            {record.map(item => <MentorCard id={item.id} name={item.name} />)}
        </div>
    )
}


export default Mentors
