import React, { useState } from 'react'
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const toast = useToast();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handelShowForPasswordClick = () => {
    setShowPassword(!showPassword);
  };
  
  const submitHandler = async() => {
    setLoading(true)
    if(!email || !password) {
      toast({
        title: "Enter all required fields.",
        status: "warning",
        duration: "3000",
        isClosable: true,
        position: "top-right",
      });

      setLoading(false);
    }

    try{
      const config = {
        headers: {
          'Content-type': 'application/json'
        }
      }

      const {data} = await axios.post("/api/user/login", {email, password}, config);
      toast({
        title: "Login Successful",
        status: "success",
        duration: "3000",
        isClosable: true,
        position: "bottom",
      });
      
      localStorage.setItem('userInfo', JSON.stringify(data));
      setLoading(false);
      navigate("/chats");

    }catch(err) {
      console.log(err);
      toast({
        title: `${err.response.data.message}`,
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

      <FormControl id="email">
        <FormLabel>Email </FormLabel>
        <Input
          placeholder="Enter your email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </FormControl>

      <FormControl id="password">
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

      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Sign In
      </Button>
    </VStack>
  );
}

export default Login
