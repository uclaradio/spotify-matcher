import "./App.css";
import React, {useState, useEffect} from "react";
import {loginUrl} from "./spotify";
import SpotifyWebApi from "spotify-web-api-js";

function App() {
    const spotify = new SpotifyWebApi();

    const initialState = {
        token: "",
        displayName: ""
    };

    const [userData, setUserData] = useState(initialState);

    // https://dev.to/dom_the_dev/how-to-use-the-spotify-api-in-your-react-js-app-50pn
    useEffect(() => {
        const hash = window.location.hash;
        let token = window.localStorage.getItem("token");

        if (!token && hash) {
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1];

            window.location.hash = "";
            window.localStorage.setItem("token", token);
        }

        spotify.setAccessToken(token);
        spotify.getMe().then(user => {
            setUserData({
                token: token,
                displayName: user.display_name
            });
        });
    }, [spotify, userData]);

    const logout = () => {
        spotify.setAccessToken("");
        setUserData({
            token: "",
            displayName: ""
        });
        window.localStorage.removeItem("token");
    }

    const token = spotify.getAccessToken();

    let loggedInAs;
    if (token) {
        loggedInAs = <h3>Logged in as {userData.displayName}</h3>
    }

    return (
        <div className="App">
            <header className="App-header">
                <h1>Spotify Matcher</h1>

                {loggedInAs}

                {!token ?
                    <a href={loginUrl} id="signInButton">Sign in with Spotify!</a> :
                    <button onClick={logout}>Logout</button>
                }
            </header>
        </div>
    );
}

export default App;
