import React, {useState} from "react";
import styled from "styled-components";
import { toast } from 'react-toastify';
import emailjs from "emailjs-com";
import '../App.css';

const Wrap = styled.div`
    width:100%;
    display:grid;
    justify-content: center;
    font-family: 'Source Sans Pro', sans-serif;
    font-size:18px;
    font-weight:300;
    margin-bottom:30px;
`;

const Box = styled.div`
    border-radius:5px;
    width:60vw;
    padding:30px;
    box-sizing: border-box;
    margin-bottom:30px;
    background: rgba(191, 217, 255, 0.3);
    border-top:7px solid rgba(191, 217, 255, 0.5);
`;

const H3 = styled.div`
    font-weight:300;
    padding:0;
    height:30px;
    display:grid;
    align-items:center;
    margin-bottom:10px;
    font-size:25px;
    @media only screen and (max-width: 600px) {
        font-size:15px;
    }
`;

const SampleInput = styled.input`
    width:100%;
    box-sizing: border-box;
    padding:5px 15px;
    font-family: 'Source Sans Pro', sans-serif;
    font-size:18px;
    font-weight:300;
    @media only screen and (max-width: 600px) {
        font-size:14px;
    }
`;

const UserInput = styled(SampleInput)`
    margin-bottom:15px;
    &:last-child{
        margin-bottom:0;   
    }
`;

const Button = styled.button`
    background: rgba(191, 217, 255, 0.8);
    border:3px solid rgba(32, 68, 176, 0.3);
    box-sizing: border-box;
    padding:10px 0;    
    color: rgba(32, 68, 176, 0.8);
    font-weight:bold;
    cursor:pointer;
    font-size:25px;
    &:hover{
        color:rgba(32, 68, 176, 0.5);
    }
`;

const Title = styled.div`
    position:relative;
    font-size:20px;
    margin-bottom:20px;
    z-index:10;    
    @media only screen and (max-width: 600px) {
        font-size:15px;
    }
`;

const Answer = styled.div`
    margin-bottom:10px;
    margin-left:10px;
    &:last-child{
        margin-bottom:0;
    }
    @media only screen and (max-width: 600px) {
        font-size:14px;
    }
`;

const DoneWrap = styled.div`
    display:grid;
    width:100vw;
    align-items:center;
    justify-content:center;
    text-align:center;
`;

const Questions = () => {
    const [option1, setOption1] = useState("");
    const [option2, setOption2] = useState("");
    const [option3, setOption3] = useState("");
    const [option4, setOption4] = useState("");
    const [option5, setOption5] = useState("");
    const [extra1, setExtra1] = useState(false);
    const [extra2, setExtra2] = useState(false);
    
    const [isProcessing, setIsProcessing] = useState(false);
    const [sample, setSample] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [functionDesc, setFunctionDesc] = useState("");

    const onChange1 = e => { setOption1(e.target.value); };
    const onChange2 = e => { setOption2(e.target.value); };
    const onChange3 = e => { setOption3(e.target.value); };
    const onChange4 = e => { setOption4(e.target.value); };
    const onChange5 = e => { setOption5(e.target.value); };

    const onExtra1 = () => { extra1 ? setExtra1(false) : setExtra1(true) };
    const onExtra2 = () => { extra2 ? setExtra2(false) : setExtra2(true) };

    const onName = e => {setUserName(e.target.value);};
    const onEmail = e => {setEmail(e.target.value);};
    const onFunctionDesc = e => {setFunctionDesc(e.target.value);};
    const onSample = e => {setSample(e.target.value);};

    const [allDone, setAllDone] = useState(false);

    const onSend = async () => {
        setIsProcessing(true);

        if((option1 === "") || (option2 === "") || (option3 === "") || (option4 === "") || (option5  === "") || (userName === "") || (email === "")) {
            toast.error('Please fill out all information', {
                position: "bottom-left",
                autoClose: 5000,
            });
            setIsProcessing(false);
            return;
        }

        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!emailRegex.test(email)) {
            toast.error('Enter email correctly!', {
                position: "bottom-left",
                autoClose: 5000,
            });
            setIsProcessing(false);
            return;
        }

        emailjs.init(process.env.REACT_APP_USER_ID);

        let htmlText = `
            [Client Name : ${userName}]
            [Client Email : ${email}]        
            [Page Number : ${option1}]
            [Design Style : ${option2}]
            [Design Sample : ${sample}]
            [Service Type : ${option3}]
            [Image File Avaialble : ${option4}]
            [Extra Shopping Function? : ${extra1}]
            [Extra Login Function? : ${extra2}]
            [Function Description : ${functionDesc}]
            [Domain wanted? : ${option5}]            
        `;

        let templateParams = {
            name: 'From Client',
            notes: 'Homepage Requested',
            message_html: htmlText,
            to_name: "John Bae",
            from_name: email
        };
         
        emailjs.send(process.env.REACT_APP_SERVICE_ID, process.env.REACT_APP_TEMPLATE_ID, templateParams)
            .then(function(response) {
                setIsProcessing(false);
                setAllDone(true);
                toast.success('Thank you. Request received!', {
                    position: "bottom-left",
                    autoClose: 20000,
                });     
            }, function(error) {
                setIsProcessing(false);
                toast.error('Network error. Please try again.', {
                    position: "bottom-left",
                    autoClose: 5000,
                });   
            });
    }


    return(
        <>
        {
        allDone ?
        <DoneWrap>
            <Box>
                <Title>Thank you</Title>
                We received your request.<br />
                Only selected candidate will receive a reply within 2 days.<br />
                If you don't get a reply please try again next time!
            </Box>
        </DoneWrap>
        :
        <>
        <Wrap>
            <H3>UI DESIGN</H3>
            <Box onChange={onChange1}>
                <Title>Q) How many menu pages needed in Website? *</Title>
                <Answer><input type="radio" id="15" value="1-5" name="numberbutton" /><label htmlFor="15">1 - 5 pages</label></Answer>
                <Answer><input type="radio" id="610" value="6-10" name="numberbutton" /><label htmlFor="610">6 - 10 pages</label></Answer>
            </Box>
            <Box onChange={onChange2}>
            <Title>Q) What type of design do you prefer? *</Title>
                <Answer><input type="radio" id="artistic" value="artistic" name="styleprefer" /><label htmlFor="artistic">Artistic (Less Text, More visual effect, Creative Design)</label></Answer>
                <Answer><input type="radio" id="minimalism" value="minimalism" name="styleprefer" /><label htmlFor="minimalism">Minimalism (Less Images / Simple )</label></Answer>
                <Answer><input type="radio" id="modern" value="modern" name="styleprefer" /><label htmlFor="modern">Modern Standard (Information is priority / Simple)</label></Answer>
            </Box>
            <Box>
                <Title>Q) Do you have a specific website design as a sample?</Title>
                <SampleInput type="text" value={sample} onChange={onSample} placeholder="http://www...." />
            </Box>                        
            <Box onChange={onChange3}>
                <Title>Q) Which service do you require? *</Title>
                <Answer><input type="radio" id="personal" value="personal" name="servicetype" /><label htmlFor="personal">Personal Portfolio</label></Answer>
                <Answer><input type="radio" id="product" value="product" name="servicetype" /><label htmlFor="product">Product Promotion</label></Answer>
                <Answer><input type="radio" id="organization" value="organization" name="servicetype" /><label htmlFor="organization">Organization</label></Answer>              
                
            </Box>
            <Box onChange={onChange4}>
                <Title>Q) Are you willing to provide image files for the website? *</Title>
                <Answer><input type="radio" id="fileyes" value="yes" name="imageprovide" /><label htmlFor="fileyes">Yes</label></Answer>
                <Answer><input type="radio" id="fileno" value="no" name="imageprovide" /><label htmlFor="fileno">No</label></Answer>                
            </Box>
        </Wrap>

        <Wrap>
            <H3>Website Functions</H3>
            <Box>
                <Title>Q) Any specific functions you need?</Title>
                <Answer><input type="checkbox" id="shopping" value="Shopping" name="numberbutton" onChange={onExtra1} /><label htmlFor="shopping">Shopping</label></Answer>
                <Answer><input type="checkbox" id="auth" value="Authentication" name="numberbutton" onChange={onExtra2} /><label htmlFor="auth">Authorization</label></Answer>                
            </Box>

            <Box>
                <UserInput type="text" value={functionDesc} onChange={onFunctionDesc} placeholder="Do you want to add any special features?" />
            </Box>

            <Box onChange={onChange5}>
                <Title>Q) Do you need a specific domain name? *</Title>
                <Answer><input type="radio" id="domainyes" value="yes" name="domain" /><label htmlFor="domainyes">Yes, I want something like google.com</label></Answer>
                <Answer><input type="radio" id="domainno" value="no" name="domain" /><label htmlFor="domainno">No, any name is fine</label></Answer>            
            </Box>                        

        </Wrap>
        <Wrap>
            <H3>Personal</H3>
            <Box>
                <UserInput type="text" value={userName} onChange={onName} placeholder="Please enter your name *" />
                <UserInput type="text" value={email} onChange={onEmail} placeholder="Email *" />
            </Box>
            <Button onClick={() => onSend()} disabled={isProcessing}>
                {
                    isProcessing ? "PROCESSING" : "SEND"
                }
            </Button>
        </Wrap>
        </>
        }

        </>
    )
}

export default Questions;
