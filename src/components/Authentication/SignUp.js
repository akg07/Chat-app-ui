import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'

const SignUp = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pic, setPic] = useState(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const handelShowForPasswordClick = () => { setShowPassword(!showPassword); };
  const handelShowForConfirmPasswordClick = () => { setShowConfirmPassword(!showConfirmPassword); };


  const postDetails = () => {}
  const submitHandler = () => {};

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
          type='file'
          p={1.5}
          accept='image/*'
          onChange={(e) => {
            postDetails(e.target.files[0]);
          }}
        />
      </FormControl>

      <Button colorScheme='blue' width="100%" style={{ marginTop: 15}} onClick={submitHandler}>
        Sign Up
      </Button>
    </VStack>
  );
}

export default SignUp
