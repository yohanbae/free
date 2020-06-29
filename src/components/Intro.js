import React from "react";
import styled from "styled-components";
import '../App.css';
import Hero from "../assets/buritto.png";

const Wrap = styled.div`
    width:100%;
    display:grid;
    justify-content: center;
    font-family: 'Source Sans Pro', sans-serif;
    font-size:18px;
    font-weight:300;
    margin-bottom:50px;
`;

const Header = styled.div`
    height:50px;
    margin-bottom:30px;
    display:grid;
    align-items:center;
    font-size:13px;
    position:relative;
    &:before{
        width:20px; height:20px;
        content:'';
        background:yellow;
        opacity:0.6;
        right:0px;
        top:15px;
        position:absolute;
        transform:rotate(45deg);

    }
`;

const Box = styled.div`
    border-radius:5px;
    background: rgba(191, 217, 255, 0.3);
    width:60vw;
    padding:30px;
    box-sizing: border-box;
    border-top:7px solid rgba(191, 217, 255, 0.5);
    border-bottom:7px solid rgba(191, 217, 255, 0.5);

    display:grid;
    grid-template-columns: 1fr 1fr;

    @media only screen and (max-width: 600px) {
        grid-template-columns: 1fr;
        padding:10px;
        font-size:15px;
    }
`;

const H3 = styled.h3`
    text-align:center;
    font-weight:300;
    font-size:25px;
    @media only screen and (max-width: 600px) {
        display:none;
    }
`;

const ImgWrap = styled.div`
    width:100%; height:100%;
    display:grid;
    align-items:center;
    justify-content:center;
    @media only screen and (max-width: 600px) {
        margin-bottom:20px;
    }
`;

const Li = styled.li`
padding:0; margin:0;
    margin-bottom:10px;
    list-style-type: square;
    list-style-position: inside;
`;

const Intro = () => {
    
    return(
        <Wrap>
            <Header>HANISON DEV</Header>
            <H3>FREE WEBSITE SERVICE FOR LIMITED TIMER OFFER</H3>
            <Box>
                <ImgWrap>
                    <img src={Hero} alt="Logo" style={{width:'150px', height:'150px'}} />
                </ImgWrap>
                <div>
                Hello, this is Hanison Dev. Currently, we are providing a free website service for a limited time.
                This is 100% free service and we want only two things from you.
                <ul>
                    <Li>Your honest review of the completed website. Less than 100 letters</Li>
                    <Li>Permit us to post the completed website on my portfolio page</Li>
                </ul>
                If you want the service, please fill out the form below. Only selected candidates will get the service.
                </div>
            </Box>
        </Wrap>
    )
}

export default Intro;
