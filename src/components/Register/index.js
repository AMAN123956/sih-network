import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { Button, Form, Modal } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import Message from "../Message/index";
import Loader1 from "../Loader/index";
import registerImg from "../../assets/img/register.png";
import audioUrl from '../../assets/img/Kalimba.mp3'
import axios from "axios";
import { url } from "../../utilities";
function Register() {
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [address, setAddress] = useState("");
    const [user, setuser] = useState(null);
    const [number, setnumber] = useState(null)
    const [sector, setSector] = useState("");
    const [industry, setIndustry] = useState("");
    const [startupId, setStartupId] = useState("");
    const [userType, setUserType] = useState("home");
    const [startupDesc, setStartupDesc] = useState("");
    const [startupStage, setStartupStage] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, seterror] = useState(null);

    const history = useHistory();
    console.log("hy" + userType)
    const localData = localStorage.getItem("driveUserInfo");
    const userInfo = localData ? JSON.parse(localData) : null;

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    console.log(audioUrl)



    useEffect(() => {
        // if (userInfo || user) {
        //     history.push("/home");
        // }
        handleShow()
        function listener(e) {
            if (e.keyCode === 49) {
                //   history.push('/register-blind')
                window.location = '/register-blind';
            }
            else if (e.keyCode === 50) {
                // history.push('/register-deaf')
                window.location = '/register-deaf';
            }
            else if (e.keyCode === 51) {
                handleClose()
            }
        }
        document.addEventListener('keydown', listener)

        return () => {
            document.removeEventListener('keydown', listener)
        }

        // changePlay(!play)
        // if(play) audio.play()
        // else audio.pause();
        // eslint-disable-next-line
    }, []);

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
            const { data } = await axios.post(`${url}/api/users`, {
                name: name,
                email,
                password,
            });

            setLoading(false);
            if (data && data.success) {
                localStorage.setItem(
                    "driveUserInfo",
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

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ "overflowY": "auto" }}>
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
                                <Loader1></Loader1>
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
    );
}

export default Register;