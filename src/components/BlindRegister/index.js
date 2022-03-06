import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { useHistory } from "react-router-dom";
import { Button, Form, Modal } from "react-bootstrap";
import axios from "axios";
import { url } from "../../utilities";

const BlindRegister = () => {
    const [step, updateStep] = useState(0);
    const [name, setname] = useState(null);
    const [email, setemail] = useState(null);
    const [number, setnumber] = useState(null)
    const [industry, setindustry] = useState(null)
    const [sector, setsector] = useState(null)
    const [password, setpassword] = useState(null);
    const [startupId, setstartupId] = useState(null)
    const [userType, setUserType] = useState('startup');
    const [startupDesc, setstartupDesc] = useState(null)
    const [startupAddress, setstartupAddress] = useState(null)

    const [user, setuser] = useState(null);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, seterror] = useState(null);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const history = useHistory();

    const localData = localStorage.getItem("driveUserInfo");
    const userInfo = localData ? JSON.parse(localData) : null;

    useEffect(() => {
        var msg = new SpeechSynthesisUtterance();
        var voices = window.speechSynthesis.getVoices();
        msg.voice = voices[1];
        msg.volume = 1; // From 0 to 1
        msg.rate = 1; // From 0.1 to 10
        msg.pitch = 2; // From 0 to 2
        msg.lang = "hindi";

        speechSynthesis.cancel();
        msg.text = 'Press E for Entrepreneur';
        console.log(msg.text)
        speechSynthesis.speak(msg);
    }, [])

    const nextStep = () => {
        if (userType === 'startup' && step <= 9)
            updateStep(step + 1);

        else if (userType === 'entrepreneur' && step <= 6) updateStep(step + 1)
        else if (userType === 'investor' && step <= 6) updateStep(step + 1)

        var msg = new SpeechSynthesisUtterance();
        var voices = window.speechSynthesis.getVoices();
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

        var msg = new SpeechSynthesisUtterance();
        var voices = window.speechSynthesis.getVoices();
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
    const updateName = (e) => {
        console.log(e.target.value)
        setname(e.target.value)
    }
    const updateEmail = (e) => {
        setemail(e.target.value)
    }


    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            console.log(name)
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

    }

    useEffect(() => {
        function listener(event) {
            console.log(event.code)
            if (event.code === 'KeyS') setUserType('startup')
            else if (event.code === 'KeyE') setUserType('entrepreneur')
            else if (event.code === 'KeyI') setUserType('Investor')
            if (event.code === 'ControlRight') nextStep()
            else if (event.code === 'ControlLeft') prevStep()
        }
        document.addEventListener('keydown', listener)

        return () => {
            document.removeEventListener('keydown', listener)
        }

    }, [step, name])

    return (
        <div className={styles.container1}>
            <div className={styles.formSection}>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Fill Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {name === null ?
                            <input type='text' placeholder="Enter Name" autoFocus value={name} onChange={updateName} />
                            : null}
                        {email === null ? <input type='text' placeholder="Enter Email" autoFocus value={email} onChange={updateEmail} />
                            : null}

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
                <form onSubmit={submitHandler}>
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
                                <button className="next btn btn-primary" onClick={nextStep}>Next</button>
                            </div>
                        </div>
                        : null}
                    {step === 1 ?
                        <div className="d-flex">
                            <div className={styles.leftSection}>
                                <Form.Group controlId="formBasicUserName">
                                    <Form.Label className={styles.formLabel}>Username</Form.Label>
                                    <Form.Control className={styles.inputField}
                                        type="text"
                                        autoFocus
                                        id='nameInput'
                                        placeholder="Enter Username"
                                        required
                                        value={name}

                                        onChange={updateName}
                                    />

                                </Form.Group>
                            </div>
                            <div className={styles.rightSection}>
                                <div className='helpSection'>
                                    <p>Please Enter Your Username</p>

                                </div>
                                <button className="prev btn btn-primary" onClick={prevStep}>Prev</button>
                                &nbsp;&nbsp;
                                <button className="next btn btn-primary" onClick={nextStep}>Next</button>
                            </div>
                        </div>
                        : null}
                    {step === 2 ?
                        <div className="d-flex">
                            <div className={styles.leftSection}>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label className={styles.formLabel}>Email address</Form.Label>
                                    <Form.Control
                                        className={styles.inputField}
                                        type="email"
                                        autoFocus
                                        placeholder="Enter email"
                                        required
                                        value={email}
                                        onChange={updateEmail}
                                    />
                                </Form.Group>
                            </div>
                            <div className={styles.rightSection}>
                                <div className="helpSection">
                                    <p>Please Enter Your Email Address
                                    </p>
                                </div>
                                <button className="prev btn btn-primary" onClick={prevStep}>Prev</button>
                                &nbsp;&nbsp;
                                <button className="next btn btn-primary" onClick={nextStep}>Next</button>
                            </div>
                        </div>
                        : null}
                    {step === 3 ? <div className="d-flex">
                        <div className={styles.leftSection}>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label className={styles.formLabel}>Password</Form.Label>
                                <Form.Control
                                    className={styles.inputField}
                                    type="password"
                                    autoFocus
                                    placeholder="Password"
                                    required
                                    value={password}
                                    onChange={(e) => {
                                        setpassword(e.target.value);
                                    }}
                                />
                            </Form.Group>
                        </div>
                        <div className={styles.rightSection}>
                            <div className="helpSection">
                                <p>Please Enter Your Password</p>
                            </div>
                            <button className="prev btn btn-primary" onClick={prevStep}>Prev</button>
                            &nbsp;&nbsp;
                            <button className="next btn btn-primary" onClick={nextStep}>Next</button>
                        </div>
                    </div> : null}
                    {step === 4 ? <div className="d-flex">
                        <div className={styles.leftSection}>
                            <Form.Group controlId="formBasicNumber">
                                <Form.Label className={styles.formLabel}>Number</Form.Label>
                                <Form.Control
                                    className={styles.inputField}
                                    type="text"
                                    autoFocus
                                    placeholder="Enter Mobile Number"
                                    required
                                    value={number}
                                    onChange={(e) => {
                                        setnumber(e.target.value);
                                    }}
                                />
                            </Form.Group>
                        </div>
                        <div className={styles.rightSection}>
                            <div className="helpSection">
                                <p>Please Enter Your Mobile Number</p>
                            </div>
                            <button className="prev btn btn-primary" onClick={prevStep}>Prev</button>
                            &nbsp;&nbsp;
                            <button className="next btn btn-primary" onClick={nextStep}>Next</button>
                        </div>
                    </div> : null}
                    {step === 5 ? <div className="d-flex">
                        <div className={styles.leftSection}>
                            <Form.Group controlId="formBasicText">
                                <Form.Label className={styles.formLabel}>Enter Industry</Form.Label>
                                <Form.Control
                                    className={styles.inputField}
                                    type="text"
                                    placeholder="Enter Industry"
                                    required
                                    autoFocus
                                    value={industry}
                                    onChange={(e) => {
                                        setindustry(e.target.value);
                                    }}
                                />
                            </Form.Group>
                        </div>
                        <div className={styles.rightSection}>
                            <div className="helpSection">
                                <p>Please Enter Your Industry</p>
                            </div>
                            <button className="prev btn btn-primary" onClick={prevStep}>Prev</button>
                            &nbsp;&nbsp;
                            <button className="next btn btn-primary" onClick={nextStep}>Next</button>
                        </div>
                    </div> : null}
                    {step === 6 ? <div className="d-flex">
                        <div className={styles.leftSection}>
                            <Form.Group controlId="formBasicText">
                                <Form.Label className={styles.formLabel}>Enter Sector</Form.Label>
                                <Form.Control
                                    className={styles.inputField}
                                    type="text"
                                    placeholder="Enter Sector"
                                    required
                                    autoFocus
                                    value={sector}
                                    onChange={(e) => {
                                        setsector(e.target.value);
                                    }}
                                />
                            </Form.Group>
                        </div>
                        <div className={styles.rightSection}>
                            <div className="helpSection">
                                <p>Enter Sector Details</p>
                            </div>
                            <button className="prev btn btn-primary" onClick={prevStep}>Prev</button>
                            &nbsp;&nbsp;
                            <button className="next btn btn-primary" onClick={nextStep}>Next</button>
                        </div>
                    </div> : null}
                    {userType}
                    {(userType !== 'startup' && step === 7) ? <div className="d-flex">
                        <div className={styles.leftSection}>
                            <h3 className={styles.formLabel}>Submit Form Details</h3>
                            <button className="btn btn-primary" onClick={submitHandler}> Submit</button>
                        </div>
                        <div className={styles.rightSection}>
                            <div className="helpSection">
                                <p>Press F to Submit the Form</p>
                            </div>

                        </div>
                    </div>
                        : null}
                    {(userType === 'startup' && step === 7) ? <div className="d-flex">
                        <div className={styles.leftSection}>
                            <Form.Group controlId="formBasicText">
                                <Form.Label className={styles.formLabel}>Enter StartUp Id </Form.Label>
                                <Form.Control
                                    className={styles.inputField}
                                    type="text"
                                    placeholder="Startup Id"
                                    required
                                    autoFocus
                                    value={startupId}
                                    onChange={(e) => {
                                        setstartupId(e.target.value);
                                    }}
                                />
                            </Form.Group>
                        </div>
                        <div className={styles.rightSection}>
                            <div className="helpSection">
                                <p>Enter Startup Id</p>
                            </div>
                            <button className="prev btn btn-primary" onClick={prevStep}>Prev</button>
                            &nbsp;&nbsp;
                            <button className="next btn btn-primary" onClick={nextStep}>Next</button>
                        </div>
                    </div> : null}
                    {step === 8 && userType === 'startup' ? <div className="d-flex">
                        <div className={styles.leftSection}>
                            <Form.Group controlId="formBasicText">
                                <Form.Label className={styles.formLabel}>Startup Description </Form.Label>
                                <Form.Control
                                    className={styles.inputField}
                                    type="text"
                                    placeholder="Startup Description..."
                                    required
                                    autoFocus
                                    value={startupDesc}
                                    onChange={(e) => {
                                        setstartupDesc(e.target.value);
                                    }}
                                />
                            </Form.Group>
                        </div>
                        <div className={styles.rightSection}>
                            <div className="helpSection">
                                <p>Enter Startup Description</p>
                            </div>
                            <button className="prev btn btn-primary" onClick={prevStep}>Prev</button>
                            &nbsp;&nbsp;
                            <button className="next btn btn-primary" onClick={nextStep}>Next</button>
                        </div>
                    </div> : null}
                    {step === 9 && userType === 'startup' ? <div className="d-flex">
                        <div className={styles.leftSection}>
                            <Form.Group controlId="formBasicText">
                                <Form.Label className={styles.formLabel}>Startup Address </Form.Label>
                                <Form.Control
                                    className={styles.inputField}
                                    type="text"
                                    placeholder="Delhi..."
                                    required
                                    autoFocus
                                    autoCapitalize="uppercase"
                                    value={startupAddress}
                                    onChange={(e) => {
                                        setstartupAddress(e.target.value);
                                    }}
                                />
                            </Form.Group>
                        </div>
                        <div className={styles.rightSection}>
                            <div className="helpSection">
                                <p>Enter Your Address</p>
                            </div>
                            <button className="prev btn btn-primary" onClick={prevStep}>Prev</button>
                            &nbsp;&nbsp;
                            <button className="next btn btn-primary">Register</button>
                        </div>
                    </div> : null}
                    {userType === 'startup' && step === 10 ? <div className="d-flex">
                        <div className={styles.leftSection}>
                            <button className="btn btn-primary" onClick={submitHandler}> Submit</button>
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


export default BlindRegister