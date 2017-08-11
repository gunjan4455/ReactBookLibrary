import React from "react";
import config from '../../config'
const { API: { protocols, domain , imagePath} } = config;

//class Header extends React.Component {
//    render() {
//        return (
//            <div>
//
//                <div id="bar">
//                    <img src={`${protocols.HTTP}${domain.BOOKS_CONNECT_LOCAL}${imagePath}bar.jpg`} />
//                </div>
//            </div>
//        )
//    }
//}



const Header = () => (
    <div>
        <div id="bar">
            <img src={`${protocols.HTTP}${domain.BOOKS_CONNECT_LOCAL}${imagePath}bar.jpg`} />
        </div>
    </div>
);

export default Header