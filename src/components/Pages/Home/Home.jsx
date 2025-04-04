import React from "react";
import "../styles/home.css";
import { AnyChar } from "./Icons/AnyChar";
import { AnyCom } from "./Icons/AnyCom";
import { AnySer } from "./Icons/AnySer";
import { ShowChars } from "./Icons/ShowChars";
import { AnyTheme } from "./Icons/AnyTheme";
import { AnyFavor } from "./Icons/AnyFavor";

function Home() {
    return (
       <>
            <div className="container">
                <div className="window-cont">
                    <div className="home-title">
                        <h1 className="title-title">All Marvel characters</h1>
                        <p className="window-text">
                            You can find any series, character or comic from the
                            marvel universe
                        </p>
                    </div>
                    <div className="functions">
                        <div className="windows">
                            <div className="icon-bg">
                                <div className="icon">
                                    <AnyChar/>
                                </div>
                            </div>
                            <h2 className="window-title">Any characters</h2>
                            <p className="window-text">
                                Fingerstache flexitarian street art 8-bit waist
                                co, subway tile poke farm.
                            </p>
                        </div>
                        <div className="windows">
                            <div className="icon-bg">
                                <div className="icon">
                                    <AnyCom/>
                                </div>
                            </div>
                            <h2 className="window-title">Any comics</h2>
                            <p className="window-text">
                                Fingerstache flexitarian street art 8-bit waist
                                co, subway tile poke farm.
                            </p>
                        </div>
                        <div className="windows">
                            <div className="icon-bg">
                                <div className="icon">
                                    <AnySer/>
                                </div>
                            </div>
                            <h2 className="window-title">Any series</h2>
                            <p className="window-text">
                                Fingerstache flexitarian street art 8-bit waist
                                co, subway tile poke farm.
                            </p>
                        </div>
                        <div className="windows">
                            <div className="icon-bg">
                                <div className="icon">
                                    <ShowChars/>
                                </div>
                            </div>
                            <h2 className="window-title">
                                Shows characters from comics/series
                            </h2>
                            <p className="window-text">
                                Fingerstache flexitarian street art 8-bit waist
                                co, subway tile poke farm.
                            </p>
                        </div>
                        <div className="windows">
                            <div className="icon-bg">
                                <div className="icon">
                                    <AnyTheme/>
                                </div>
                            </div>
                            <h2 className="window-title">Dark theme</h2>
                            <p className="window-text">
                                Fingerstache flexitarian street art 8-bit waist
                                co, subway tile poke farm.
                            </p>
                        </div>
                        <div className="windows">
                            <div className="icon-bg">
                                <div className="icon">
                                    <AnyFavor/>
                                </div>
                            </div>
                            <h2 className="window-title">
                                Ability to add to favorites
                            </h2>
                            <p className="window-text">
                                Fingerstache flexitarian street art 8-bit waist
                                co, subway tile poke farm.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
   }
export default Home;