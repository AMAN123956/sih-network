import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { Button, Form, Modal } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import Message from "../Message/index";
import Loader1 from "../Loader/index";
import registerImg from "../../assets/img/register.png";
import axios from "axios";
import { url } from "../../utilities";
function Login() {
    const [number, setnumber] = useState("");
    const [userType, setUserType] = useState('entrepreneur')
    const [password, setpassword] = useState("");
    const [error, seterror] = useState(null);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [user, setuser] = useState(null);

    const history = useHistory();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const localData = localStorage.getItem("startupUserInfo");
    const userInfo = localData ? JSON.parse(localData) : null;

    const setUserTypeFunc = (e) => {
        setUserType(e.target.value)
    }

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
            msg.text = 'You are already Logged In';
            console.log(msg.text)
            speechSynthesis.speak(msg);
            history.push("/");
        } else {
            document.querySelector('button').click();
            let msg = new SpeechSynthesisUtterance();
            let voices = window.speechSynthesis.getVoices();
            msg.voice = voices[1];
            msg.volume = 1; // From 0 to 1
            msg.rate = 1; // From 0.1 to 10
            msg.pitch = 2; // From 0 to 2
            msg.lang = "hindi"
            speechSynthesis.cancel();
            msg.text = 'Welcome to the Login Page, Press 1 If You are Blind Press 2 If You are Deaf Press 3 to Stop Audio';
            console.log(msg.text)
            speechSynthesis.speak(msg);
        }
        handleShow()
        function listener(e) {
            if (e.keyCode === 49) {
                //   history.push('/register-blind')
                window.location = '/login-blind';
            }
            else if (e.keyCode === 50) {
                // history.push('/register-deaf')
                window.location = '/login-deaf';
            }
            else if (e.keyCode === 51) {
                document.removeEventListener('keydown', listener)
                handleClose()
            }
        }
        document.addEventListener('keydown', listener)

        return () => {
            document.removeEventListener('keydown', listener)
        }
        // eslint-disable-next-line
    }, [userInfo]);

    if (error) {
        setTimeout(() => {
            seterror(null);
        }, 3000);
    }

    const submitLogin = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
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
                history.push('/home')
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
    return (
        <div className="container my-5 d-flex justify-content-center align-items-center ">
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Are You?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Instructions</p>
                    <p>Press. 1 For <span>Blind</span></p>
                    <p>Press. 2 For <span>Deaf</span></p>
                    <p>Press. 3 For <span>None of These</span></p>
                    <div className="d-flex">
                        <button className={`shadow ${styles.option}`}>
                            <h2>Blind</h2>
                        </button>
                        <button className={`shadow ${styles.option}`}>
                            <h2>Deaf</h2>
                        </button>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className={styles.leftSection}>
                <h2 className={styles.logoHeading}>Startup</h2>
                <img
                    src={registerImg}
                    className={styles.registerImg}
                    alt="display_img"
                />
            </div>
            <div
                className="form-container my-5 p-4 shadow"
                id="formBox"
                style={{ minWidth: "350px" }}
            >
                {error && <Message variant={"danger"}>{error}</Message>}
                {success && (
                    <Message variant={"success"}>Loggedin Successfully</Message>
                )}
                <div className="mt-4">
                    <Form onSubmit={submitLogin}>
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
                        <Form.Group controlId="formBasicNumber">
                            <Form.Label>Email Your Mobile Number</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Number"
                                value={number}
                                required
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
                                value={password}
                                required
                                onChange={(e) => {
                                    setpassword(e.target.value);
                                }}
                            />
                        </Form.Group>
                        {loading ? (
                            <Loader1></Loader1>
                        ) : (
                            <Button type="submit" className={styles.btn}>
                                Login
                            </Button>
                        )}
                    </Form>
                    <div className="mt-3">
                        <p>
                            Don't have an account ? <Link to="/register">Signup</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;