import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import axios from "axios";
import StartupCard from "./UI/StartupCard/index";
import { url } from "../../utilities";

const Startup = () => {
    const [error, seterror] = useState(null);
    const [record, setrecord] = useState([{}]);

    // localStorage.setItem('networkData',JSON.stringify(dummyData))


    useEffect(() => {
        const fetchStartupList = async () => {
            try {
                const data = await axios.get(`${url}/api/startup`);
                if (data.data.success) {
                    setrecord(data.data.data)
                } else {
                    seterror(`${data.error}`);
                }
            }
            catch (e) {
                seterror(`${e.error}`);
            }
        }
        fetchStartupList();
    }, []);
    return (
        <div id="container" className={styles.container1}>
            {record.map(item => <StartupCard id={item._id} name={item.name} sector={item.sector} />)}
        </div>
    )
}
export default Startup
