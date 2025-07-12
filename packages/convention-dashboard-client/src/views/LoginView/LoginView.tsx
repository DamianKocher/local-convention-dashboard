import classes from './LoginView.module.css';
import {LoginStages} from "./LoginStages.tsx";
import {AppBar} from "../../components/AppBar/AppBar.tsx";
import {Footer} from "../../components/Footer/Footer.tsx";

export const LoginView = () => {
    return (
        <>
            <AppBar homeButton={false}/>

            <div className={classes.panel}>
                <h1>Member Sign In</h1>

                <LoginStages/>
            </div>

            <Footer/>
        </>

    )
}