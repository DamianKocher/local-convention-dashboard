import classes from './AppBar.module.css'
import logo from '../../assets/logo.png';
import {useDispatch, useSelector} from "react-redux";
import {goToDocumentsView} from "../../document/documentSaga.ts";
import {getFullName} from "../../membership/membershipSlice.ts";
import {logout} from "../../app/appSaga.ts";

type Props = {
    homeButton: boolean;
}

export const AppBar = ({homeButton}: Props) => {
    const fullName = useSelector(getFullName);
    const dispatch = useDispatch();

    function goToDocuments() {
        if (homeButton) {
            dispatch(goToDocumentsView());
        }
    }

    function signout() {
        dispatch(logout());
    }

    return (
        <div className={classes.navbar}>
            <img src={logo} alt="DSA Logo" className={classes.logo} onClick={goToDocuments}
                 style={{cursor: homeButton ? 'pointer' : ''}}/>
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
    )
}