import React, { useState, useEffect } from 'react'
import styles from './styles.module.css'
import axios from 'axios'
import { url } from '../../utilities'
import EntrepreneurCard from './UI/EntrepreneurCard'

const Entrepreneur = () => {
    const [error, seterror] = useState(null);
    const [record, setrecord] = useState([{}])

    useEffect(() => {
        const fetchEntrepreneurList = async () => {
            console.log('request')
            const data = await axios.get(`${url}/api/entrepreneur`);
            console.log(data)
            if (data.data.success) {
                console.log(data.data.data)
                setrecord(data.data.data)
            } else {
                seterror(`${data.error}`);
            }
        }
        fetchEntrepreneurList();
    }, []);
    return (
        <div id="container" className={styles.container1}>
            {record.map(item => <EntrepreneurCard id={item.id} name={item.name} />)}
        </div>
    )
}

export default Entrepreneur