import React, { useState, useEffect } from "react";
import axios from "axios";
import { Payload } from "../interfaces/payload";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Cookie from "js-cookie"; // Import js-cookie
import loginBanner from "../../public/banner/loginBanner.jpg";
import loginBox from "../../public/banner/Box.jpg";

//MUI

// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

//UI
import styled from "styled-components";

const Login = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const [isCheck, setIsCheck] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogin = async () => {
    // ตรวจสอบว่า username และ password ไม่เป็นค่าว่าง
    if (!username.trim() || !password.trim()) {
      setErrorMessage("Username and password are required");
      return;
    }
    if (!isCheck) {
      setErrorMessage("Please accept the terms");
      return;
    }
    

    console.log("Trying to login with:", { username, password });

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login", {
        username,
        password,
      });

      console.log("API Response:", response.data); // ตรวจสอบ response

      const payload: Payload = response.data;

      if (!payload.user || !payload.token) {
        setErrorMessage("Something is wrong");
        return;
      }

      // เก็บข้อมูลลงใน cookies
      Cookie.set("token", payload.token, { expires: 7, secure: true });

      const userinfo = {
        name: payload.user.name,
        username: payload.user.username,
        role: payload.user.role,
        active:payload.user.active
      };
      if(userinfo.active){
        const encodedUserinfo = btoa(JSON.stringify(userinfo));
        Cookie.set("userinfo", encodedUserinfo, { expires: 7, secure: true });
        router.push("admin");
      }
      if(userinfo.active == 0){
        console.log("active = 0");
      }
    } catch (error) {
      console.error("Login failed", error);
      setErrorMessage("Invalid credentials");
    }
  };

  if (!isClient || typeof window == 'undefined') {
    return null;
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center pt-[100px] bg-[#F6F6F6]">
      <div className="text-[65px] font-light drop-shadow-[0px_10px_30px_rgba(0,0,0,0.7)]">
        Login
      </div>
      <div className="flex flex-row items-center">
        <div className="flex flex-col bg-white shadow-lg w-[500px] h-[410px] items-center justify-center">
          <h1 className="mb-[20px] text-[25px]">.life Inventory Management</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
            className="flex flex-col w-fit gap-4"
          >
            <input
              placeholder="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border-2 rounded-xl px-4 w-full h-[50px]"
            />
            <input
              placeholder="User Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-2 rounded-xl px-4 w-full h-[50px]"
            />
            <p className="text-red-500 w-full h-[20px] flex flex-row justify-end">
              {errorMessage}
            </p>
            <div className="flex gap-2 flex-row items-center">
              <div
                onClick={()=>{
                  if(isCheck){
                    setIsCheck(false)
                  }else{
                    handleOpen()
                  }
                }}
                className={`w-[15px] h-[15px] border-gray-500 border-[1px]  rounded-full ${
                  isCheck && "bg-green-500"
                }`}
              ></div>
              <div>ฉันยอมรับนโยบายความเป็นส่วนตัวและเงื่อนไขการใช้บริการ</div>
            </div>
            <StyledLogin>
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 rounded-xl"
              >
                Login
              </button>
            </StyledLogin>
          </form>
        </div>
        <div className="relative h-[410px]">
          <Image
            src={loginBanner}
            alt="Banner"
            className="w-[350px] object-cover h-[410px] bg-black"
          />
          <Image
            src={loginBox}
            alt="Banner"
            className="absolute z-10 top-[100px] left-1/2 transform -translate-x-1/2 p-4"
          />
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] bg-white border-2 shadow-2xl p-4 overflow-auto rounded-xl">
          <h2 id="modal-modal-title" className="text-lg font-bold">
            คำชี้แจง
          </h2>
          <p
            id="modal-modal-description"
            className="mt-4 text-sm text-gray-700"
          >
            เว็บไซต์นี้ถูกสร้างขึ้นโดยมีวัตถุประสงค์เพื่อการศึกษาเท่านั้น
            และไม่ได้รับการรับรองหรือมีความเกี่ยวข้องกับบริษัทหรือแบรนด์ใดๆ
            ที่ปรากฏในเนื้อหาของเว็บไซต์นี้
            ข้อมูลทั้งหมดที่ปรากฏในเว็บไซต์ถือเป็นข้อมูลจำลองและไม่มีวัตถุประสงค์ทางการค้า
          </p>
          <p className="mt-2 text-sm text-gray-700">
            This website has been created solely for educational purposes and is
            not affiliated with or endorsed by any brands or companies mentioned
            in its content. All content displayed on this website is fictional
            and not intended for commercial use.
          </p>
          <StyledWrapper
            onClick={() => {
              setIsCheck(true);
              handleClose();
            }}
          >
            <button>เห็นด้วย / Agree</button>
          </StyledWrapper>
        </div>
      </Modal>
    </div>
  );
};

export default Login;

const StyledLogin = styled.div`
  button {
    width:100%;
    margin-top: 20px;
    padding: 10px 20px;
    border-radius: 10px;
    border: 0;
    background-color: rgb(132, 137, 250);
    letter-spacing: 1.5px;
    font-size: 15px;
    transition: all 0.3s ease;
    box-shadow: rgb(70, 75, 163) 0px 10px 0px 0px;
    color: hsl(0, 0%, 100%);
    cursor: pointer;
  }

  button:hover {
    box-shadow: rgb(70, 75, 163) 0px 7px 0px 0px;
  }

  button:active {
    background-color: rgb(132, 137, 250);
    /*50, 168, 80*/
    box-shadow: rgb(70, 75, 163) 0px 0px 0px 0px;
    transform: translateY(5px);
    transition: 200ms;
  }
`;


const StyledWrapper = styled.div`
  button {
    margin-top: 20px;
    padding: 10px 20px;
    border-radius: 10px;
    border: 0;
    background-color: rgb(255, 56, 86);
    letter-spacing: 1.5px;
    font-size: 15px;
    transition: all 0.3s ease;
    box-shadow: rgb(201, 46, 70) 0px 10px 0px 0px;
    color: hsl(0, 0%, 100%);
    cursor: pointer;
  }

  button:hover {
    box-shadow: rgb(201, 46, 70) 0px 7px 0px 0px;
  }

  button:active {
    background-color: rgb(255, 56, 86);
    /*50, 168, 80*/
    box-shadow: rgb(201, 46, 70) 0px 0px 0px 0px;
    transform: translateY(5px);
    transition: 200ms;
  }
`;
