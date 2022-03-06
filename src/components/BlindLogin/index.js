import React, { useEffect, useState } from "react"
import styles from "./styles.module.css";
import { Form } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import Message from "../Message/index";
import Loader from "../Loader/index";

import axios from "axios";
import { url } from "../../utilities";

const BlindLogin = () => {
    const [step, updateStep] = useState(0);
    const [number, setnumber] = useState("");
    const [userType, setUserType] = useState('entrepreneur')
    const [password, setpassword] = useState("");
    const [error, seterror] = useState(null);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [user, setuser] = useState(null);
    const history = useHistory();


    const localData = localStorage.getItem("startupUserInfo");
    const userInfo = localData ? JSON.parse(localData) : null;

    const updateNumber = (e) => {
        console.log(e.target.value)
        setnumber(e.target.value)
    }

    const nextStep = () => {
        if (step <= 2)
            updateStep(step + 1);


        let msg = new SpeechSynthesisUtterance();
        let voices = window.speechSynthesis.getVoices();
        msg.voice = voices[1];
        msg.volume = 1; // From 0 to 1
        msg.rate = 1; // From 0.1 to 10
        msg.pitch = 2; // From 0 to 2
        msg.lang = "hindi";
        let helpSection = document.querySelector(".helpSection");
        console.log(helpSection.innerHTML)
        speechSynthesis.cancel();
        msg.text = helpSection.innerHTML;
        console.log(msg.text)
        speechSynthesis.speak(msg);
    }
    const prevStep = () => {
        if (step !== 0)
            updateStep(step - 1);

        let msg = new SpeechSynthesisUtterance();
        let voices = window.speechSynthesis.getVoices();
        msg.voice = voices[1];
        msg.volume = 1; // From 0 to 1
        msg.rate = 1; // From 0.1 to 10
        msg.pitch = 2; // From 0 to 2
        msg.lang = "hindi";
        let helpSection = document.querySelector(".helpSection");
        console.log(helpSection.innerHTML)
        speechSynthesis.cancel();
        msg.text = helpSection.innerHTML;
        console.log(msg.text)
        speechSynthesis.speak(msg);
    }
    const submitLogin = async (e) => {
        try {
            setLoading(true);
            console.log(userType)
            const { data } = await axios.post(`${url}/api/${userType}/login`, {
                number,
                password,
            });

            setLoading(false);
            if (data && data.success) {
                localStorage.setItem(
                    "startupUserInfo",
                    JSON.stringify(data.data)
                );
                setSuccess(true);
                setuser(data.data);
            } else {
                if (data) {
                    seterror(data.message);
                } else {
                    seterror("Network error");
                }
            }
        } catch (e) {
            setLoading(false);
            seterror("Network Error");
        }
    };

    useEffect(() => {
        console.log(userInfo)
        if (userInfo || user) {
            let msg = new SpeechSynthesisUtterance();
            let voices = window.speechSynthesis.getVoices();
            msg.voice = voices[1];
            msg.volume = 1; // From 0 to 1
            msg.rate = 1; // From 0.1 to 10
            msg.pitch = 2; // From 0 to 2
            msg.lang = "hindi"
            speechSynthesis.cancel();
            msg.text = 'You are already registered, logout to register again';
            console.log(msg.text)
            speechSynthesis.speak(msg);
            history.push("/");
        }
        else {
            let msg = new SpeechSynthesisUtterance();
            let voices = window.speechSynthesis.getVoices();
            msg.voice = voices[1];
            msg.volume = 1; // From 0 to 1
            msg.rate = 1; // From 0.1 to 10
            msg.pitch = 2; // From 0 to 2
            speechSynthesis.cancel();
            msg.lang = "english";
            msg.text = 'Press E for Entrepreneur, S For Startup ,I for Investor';
            console.log(msg.text)
            speechSynthesis.speak(msg);
        }
    }, [])

    useEffect(() => {
        function listener(event) {
            console.log(event.code)
            if (event.code === 'KeyS') setUserType('startup')
            else if (event.code === 'KeyE') setUserType('entrepreneur')
            else if (event.code === 'KeyI') setUserType('investor')
            else if (event.code === 'KeyF') submitLogin();
            if (event.code === 'ControlRight') nextStep()
            else if (event.code === 'ControlLeft') prevStep()
        }
        document.addEventListener('keydown', listener)

        return () => {
            document.removeEventListener('keydown', listener)
        }

    }, [step, number])

    return (
        <div className={styles.container1}>
            <div className={styles.formSection}>
                <form>
                    {error && <Message variant={'danger'}>{error}</Message>}
                    {loading ? <Loader></Loader> : null}
                    {step === 0 ?
                        <div className="d-flex" id="one">
                            <div className={styles.leftSection}>
                                <Form.Group controlId="formBasicUserType">
                                    <Form.Label className={styles.formLabel}>Select User Type &nbsp;</Form.Label>
                                    <br />
                                    <div className={styles.optionBox}>
                                        <div className={`shadow ${styles.options}`}>
                                            Entrepreneur
                                        </div>
                                        <div className={`shadow ${styles.options}`}>
                                            Investor
                                        </div>
                                        <div className={`shadow ${styles.options}`}>
                                            Company
                                        </div>
                                    </div>
                                </Form.Group>
                            </div>
                            <div className={styles.rightSection}>
                                <div className='helpSection'>
                                    <p>Press. E for Entrepreneur</p>
                                    <p>Press. S for StartUp</p>
                                    <p>Press. I for Investor</p>
                                </div>

                            </div>
                        </div>
                        : null}
                    {step === 1 ?
                        <div className="d-flex">
                            <div className={styles.leftSection}>
                                <Form.Group controlId="formBasicNumber">
                                    <Form.Label className={styles.formLabel}>Number</Form.Label>
                                    <Form.Control className={styles.inputField}
                                        type="text"
                                        autoFocus
                                        id='numberInput'
                                        placeholder="Enter Your Number"
                                        required
                                        value={number}
                                        onChange={updateNumber}
                                    />

                                </Form.Group>
                            </div>
                            <div className={styles.rightSection}>
                                <div className='helpSection'>
                                    <p>Please Enter Your Number</p>
                                </div>
                            </div>
                        </div>
                        : null}
                    {step === 2 ?
                        <div className="d-flex">
                            <div className={styles.leftSection}>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        required
                                        onChange={(e) => {
                                            setpassword(e.target.value);
                                        }}
                                    />
                                </Form.Group>
                            </div>
                            <div className={styles.rightSection}>
                                <div className='helpSection'>
                                    <p>Please Enter Your Password</p>
                                </div>
                            </div>
                        </div>
                        : null}
                    {step === 3 ? <div className="d-flex">
                        <div className={styles.leftSection}>
                            <h3 className={styles.formLabel}>Submit Form Details</h3>
                            <button className="btn btn-primary"> Submit</button>
                        </div>
                        <div className={styles.rightSection}>
                            <div className="helpSection">
                                <p>Press F to Submit the Form</p>
                            </div>

                        </div>
                    </div> : null}

                </form>
            </div>
        </div>
    )
}


export default BlindLogin