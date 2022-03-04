import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { Button, Form } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import Message from "../Message/index";
import Loader1 from "../Loader/index";
import registerImg from "../../assets/img/register.png";
import axios from "axios";
import { url } from "../../utilities";
function Register() {
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [address, setAddress] = useState("");
    const [user, setuser] = useState(null);
    const [sector, setSector] = useState("");
    const [industry, setIndustry] = useState("");
    const [startupId,setStartupId] = useState("");
    const [userType, setUserType] = useState("");
    const [error, seterror] = useState(null);
    // Extra Field for Startup Verification Id
    const [startupIdInput, setStartupIdInput] = useState(false)
    const history = useHistory();
    console.log("hy" + userType)
    const localData = localStorage.getItem("driveUserInfo");
    const userInfo = localData ? JSON.parse(localData) : null;
    useEffect(() => {
        if (userInfo || user) {
            history.push("/home");
        }
        // eslint-disable-next-line
    }, [userInfo]);

    if (error) {
        setTimeout(() => {
            seterror(null);
        }, 3000);
    }

    const setUserTypeFunc = (e) => {
        setUserType(e.target.value)
        if (e.target.value === 'startup') {
            setStartupIdInput(true);
        }
        else {
            setStartupIdInput(false);
        }
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
                {" "}
                {success && (
                    <Message variant={"success"}>Successfully created</Message>
                )}
                {error && <Message variant={"danger"}>{error}</Message>}
                <div className="mt-0" style={{ height: "100%" }}>
                    <Form onSubmit={submitRegister}>
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
                        <Form.Group controlId="formBasicAddress">
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
                        </Form.Group>
                        <Form.Group controlId="formBasicUserType">
                            <Form.Label>User Type &nbsp;</Form.Label>
                            <br />
                            <select className={styles.selectOption} onChange={setUserTypeFunc
                            }>
                                <option value="entrepreneur">Entrepreneur</option>
                                <option value="mentor">Mentor</option>
                                <option value="investor">Investor</option>
                                <option value="incubator">Incubator</option>
                                <option value="startup">Startup</option>
                            </select>
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
                        {startupIdInput ? <Form.Group controlId="formBasicId">
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
                    </Form>
                    <div className="mt-3">
                        <p>
                            Already have an account ?{" "}
                            <Link to="/login">Login</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;