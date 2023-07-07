import React from 'react'
import {
  FormControl,
  FormLabel,
  VStack,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  InputLeftElement
} from '@chakra-ui/react'
import { useState } from 'react'
import { HiOutlineMail } from 'react-icons/hi'
import { BiLockAlt } from 'react-icons/bi'
import { LuEye, LuEyeOff } from 'react-icons/lu'

const Login = () => {

  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const [show, setShow] = useState(false)

  const handleShow = () => {
    setShow(!show)
  }

  return (
    <VStack spacing='15px'>

      <FormControl id='email'>
        <FormLabel></FormLabel>
        <InputGroup size='lg'>
          <InputLeftElement>
            <HiOutlineMail size={'24px'} color='#718299' />
          </InputLeftElement>
          <Input
            placeholder='Email'
            type='email'
            onChange={(e) => {
              setEmail(e.target.value)
            }}
          ></Input>
        </InputGroup>
      </FormControl>

      <FormControl id='password'>
        <FormLabel></FormLabel>
        <InputGroup size='lg'>
          <InputLeftElement>
            <BiLockAlt size={'24px'} color='#718299' />
          </InputLeftElement>
          <Input
            type={show ? 'password' : 'text'}
            placeholder='Password'
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          ></Input>
          <InputRightElement>
            <Button variant='link' size='lg' onClick={handleShow}>
              {show ? <LuEyeOff size='24px' color='#718299' /> : <LuEye size='24px' color='' />}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        w={'100%'}
        mt={'10px'}
        colorScheme='blue'
      >
        Log In
      </Button>

    </VStack>
  )
}

export default Login