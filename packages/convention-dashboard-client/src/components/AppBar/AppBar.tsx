import classes from './AppBar.module.css'
import logo from '../../assets/logo.png';
import {useDispatch, useSelector} from "react-redux";
import {getFullName} from "../../membership/membershipSlice.ts";
import {logout} from "../../app/appSaga.ts";
import {Button} from "../Button/Button.tsx";
import type {ActionCreatorWithoutPayload} from "@reduxjs/toolkit";

type Props = {
    backAction?: ActionCreatorWithoutPayload;
}

export const AppBar = ({backAction}: Props) => {
    const fullName = useSelector(getFullName);
    const dispatch = useDispatch();

    function goToHome() {
        if (backAction) {
            dispatch(backAction());
        }
    }

    function signout() {
        dispatch(logout());
    }

    return (
        <div className={classes.container}>
            <div className={classes.navbar}>
                <img src={logo} alt="DSA Logo" className={classes.logo} onClick={goToHome}
                     style={{cursor: backAction ? 'pointer' : ''}}/>
                <div>
                    <p>STL DSA</p>
                    <p>Local Convention Dashboard</p>
                </div>

                {fullName && <div className={classes.user}>
                    <p className={classes.name}>{fullName}</p>
                    <p>
                        <span className={classes.signout} onClick={signout}>Signout</span>
                    </p>
                </div>}
            </div>

            {backAction && <div><Button label="Back" disabled={false} onClick={backAction}/></div>}
        </div>
    )
}