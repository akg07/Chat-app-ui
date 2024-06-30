import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useToast } from "@chakra-ui/react";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const SignUp = () => {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pic, setPic] = useState(null);
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handelShowForPasswordClick = () => {
    setShowPassword(!showPassword);
  };
  const handelShowForConfirmPasswordClick = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const toast = useToast();

  const postDetails = (pics) => {
    setLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please select an image.",
        // description: "We've created your account for you.",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
    }

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "pers_chat_app");
      data.append("cloud_name", "dfcstdai1");

      fetch("https://api.cloudinary.com/v1_1/dfcstdai1/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          setLoading(false);
          console.log(data);
        });
    } else {
      toast({
        title: "Please select an image.",
        // description: "We've created your account for you.",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const submitHandler = async () => {
    setLoading(true);
    if(!name || !email || !password || !confirmPassword) {
      toast({
        title: "Please fill all the fields",
        status: "warning",
        "duration": "3000",
        isClosable: true,
        "position": "bottom"
      });
      setLoading(false);
      return;
    }

    if(password !== confirmPassword) {
      toast({
        title: "Password do not match.",
        status: "warning",
        duration: "3000",
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try{
      const config = {
        headers: {
          'Content-type': 'application/json'
        }
      }

      const {data} = await axios.post("/api/user", {name, email, password, pic}, config);
      toast({
        title: "Registration success.",
        status: "success",
        duration: "3000",
        isClosable: true,
        position: "bottom",
      });
      
      localStorage.setItem('userInfo', JSON.stringify(data));
      setLoading(false);
      navigate("/chats");

    }catch(err) {
      toast({
        title: "Error occured!",
        status: "error",
        duration: "3000",
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }

  };

  return (
    <VStack spacing="5px">
      <FormControl id="name">
        <FormLabel> Name</FormLabel>
        <Input
          placeholder="Enter your name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </FormControl>

      <FormControl id="email-signup">
        <FormLabel>Email </FormLabel>
        <Input
          placeholder="Enter your email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </FormControl>

      <FormControl id="password-signup">
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <InputRightElement>
            <Button
              h="1.75rem"
              size="sm"
              onClick={() => {
                handelShowForPasswordClick();
              }}
            >
              {showPassword ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="confirm-password">
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm your password"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />

          <InputRightElement>
            <Button
              h="1.75rem"
              size="sm"
              onClick={() => {
                handelShowForConfirmPasswordClick();
              }}
            >
              {showConfirmPassword ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="pic">
        <FormLabel>Upload your picture </FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => {
            postDetails(e.target.files[0]);
          }}
        />
      </FormControl>

      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default SignUp;
