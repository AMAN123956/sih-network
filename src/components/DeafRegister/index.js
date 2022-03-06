import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { Button, Form } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import Message from "../Message/index";
import Loader from "../Loader/index";
import registerImg from "../../assets/img/register.png";
import axios from "axios";
import { url } from "../../utilities";

const DeafRegister = () => {
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [address, setAddress] = useState("");
    const [user, setuser] = useState(null);
    const [number, setnumber] = useState(null)
    const [sector, setSector] = useState("");
    const [industry, setIndustry] = useState("");
    const [startupId, setStartupId] = useState("");
    const [userType, setUserType] = useState("entrepreneur");
    const [startupDesc, setStartupDesc] = useState("");
    const [startupStage, setStartupStage] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, seterror] = useState(null);

    const history = useHistory();
    const localData = localStorage.getItem("startupUserInfo");
    const userInfo = localData ? JSON.parse(localData) : null;
    useEffect(() => {
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
    }, [])
    if (error) {
        setTimeout(() => {
            seterror(null);
        }, 3000);
    }

    const setUserTypeFunc = (e) => {
        setUserType(e.target.value)
    }

    const setStageTypeFunc = (e) => {
        setStartupStage(e.target.value)
    }

    const submitRegister = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const { data } = await axios.post(`${url}/api/${userType}`, {
                name: name,
                number: number,
                industry: industry,
                sector: sector,
                email,
                password,
                companyNumber: startupId,
                about: startupDesc,
                stage: startupStage
            });
            setLoading(false);
            if (data && data.success) {
                localStorage.setItem(
                    "startupUserInfo",
                    JSON.stringify(data.data)
                );
                setSuccess(true);
                setuser(data.data);
                let msg = new SpeechSynthesisUtterance();
                let voices = window.speechSynthesis.getVoices();
                msg.voice = voices[1];
                msg.volume = 1; // From 0 to 1
                msg.rate = 1; // From 0.1 to 10
                msg.pitch = 2; // From 0 to 2
                speechSynthesis.cancel();
                msg.lang = "english";
                msg.text = 'You have been successfully registered';
                console.log(msg.text)
                speechSynthesis.speak(msg);
                history.push('/')
            } else {
                if (data) {
                    seterror(data.message);
                    let msg = new SpeechSynthesisUtterance();
                    let voices = window.speechSynthesis.getVoices();
                    msg.voice = voices[1];
                    msg.volume = 1; // From 0 to 1
                    msg.rate = 1; // From 0.1 to 10
                    msg.pitch = 2; // From 0 to 2
                    speechSynthesis.cancel();
                    msg.lang = "english";
                    msg.text = `Registration Failed ${data.message}`;
                    console.log(msg.text)
                    speechSynthesis.speak(msg);
                } else {
                    seterror("Network error");
                    let msg = new SpeechSynthesisUtterance();
                    let voices = window.speechSynthesis.getVoices();
                    msg.voice = voices[1];
                    msg.volume = 1; // From 0 to 1
                    msg.rate = 1; // From 0.1 to 10
                    msg.pitch = 2; // From 0 to 2
                    speechSynthesis.cancel();
                    msg.lang = "english";
                    msg.text = `Registration Failed due to network error`;
                    console.log(msg.text)
                    speechSynthesis.speak(msg);
                }
            }
        } catch (e) {
            setLoading(false);
            seterror("Network Error");
        }

    };
    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ "overflowY": "auto" }}>
            <div className={styles.leftSection}>
                <h2 className={styles.logoHeading}>StartUp</h2>
                <img
                    src={registerImg}
                    className={styles.registerImg}
                    alt="display_img"
                />
            </div>
            <div
                className="form-container my-1 py-4 px-4"
                id="formBox"
                style={{ minWidth: "350px" }}
            >
                <button className="d-none" id="btn-demo">Click</button>
                {" "}
                {success && (
                    <Message variant={"success"}>Successfully created</Message>
                )}
                {error && <Message variant={"danger"}>{error}</Message>}
                {loading ? <Loader></Loader> : null}
                <div className="mt-0" style={{ height: "100%" }}>
                    <Form onSubmit={submitRegister}>
                        <Form.Group controlId="formBasicUserType">
                            <Form.Label>Select User Type &nbsp;</Form.Label>
                            <br />
                            <select className={styles.selectOption} onChange={setUserTypeFunc
                            } required>
                                <option value="entrepreneur">Entrepreneur</option>
                                <option value="investor">Investor</option>
                                <option value="startup">Startup</option>
                            </select>
                        </Form.Group>
                        {userType !== '' ? <div>
                            <Form.Group controlId="formBasicName">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Username"
                                    required
                                    value={name}
                                    onChange={(e) => {
                                        setname(e.target.value);
                                    }}
                                />
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    required
                                    value={email}
                                    onChange={(e) => {
                                        setemail(e.target.value);
                                    }}
                                />
                            </Form.Group>
                            <Form.Group controlId="formBasicNumber">
                                <Form.Label>Number</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Mobile Number"
                                    required
                                    value={number}
                                    onChange={(e) => {
                                        setnumber(e.target.value);
                                    }}
                                />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    required
                                    value={password}
                                    onChange={(e) => {
                                        setpassword(e.target.value);
                                    }}
                                />
                            </Form.Group>
                            <Form.Group controlId="formBasicIndustry">
                                <Form.Label>Industry &nbsp;</Form.Label>
                                <br />
                                <select className={styles.selectOption} onChange={(e) => {
                                    setIndustry(e.target.value);
                                }}>
                                    <option value="advertising">Advertising</option>
                                    <option value="aeronautics">Aeronautics</option>
                                    <option value="agriculture">Agriculture</option>
                                </select>
                            </Form.Group>
                            <Form.Group controlId="formBasicSector">
                                <Form.Label>Sector &nbsp;</Form.Label>
                                <select className={styles.selectOption} onChange={(e) => {
                                    setSector(e.target.value);
                                }}>
                                    <option>Agriculture</option>
                                </select>
                            </Form.Group>
                            {userType === 'startup' ? <Form.Group controlId="formBasicId">
                                <Form.Label>Startup Id</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Startup Id"
                                    required
                                    value={startupId}
                                    onChange={(e) => {
                                        setStartupId(e.target.value);
                                    }}
                                />

                                <Form.Label className="my-1">Startup Description</Form.Label>
                                <Form.Control as="textarea" rows={3} placeholder="Enter Startup Description"
                                    required
                                    value={startupDesc}
                                    onChange={(e) => {
                                        setStartupDesc(e.target.value);
                                    }} />
                                <Form.Label className="my-1">Stage &nbsp;</Form.Label>
                                <br />
                                <select className={styles.selectOption} onChange={setStageTypeFunc
                                }>
                                    <option value="ideation">Ideation</option>
                                    <option value="validation">Validation</option>
                                    <option value="tracation">Early Tracation</option>
                                    <option value="scaling">Scaling</option>

                                </select>
                                <Form.Label>Enter Your Address</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Noida, UP..."
                                    required
                                    value={address}
                                    onChange={(e) => {
                                        setAddress(e.target.value);
                                    }}
                                />
                            </Form.Group> : null}
                            {loading ? (
                                <Loader />
                            ) : (
                                <Button
                                    type="submit"
                                    className={styles.btn}
                                    disabled={loading}
                                >
                                    Signup
                                </Button>
                            )}
                        </div> : null}

                    </Form>
                    <div className="mt-3">
                        <p>
                            Already have an account ?{" "}
                            <Link to="/login">Login</Link>
                        </p>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default DeafRegister