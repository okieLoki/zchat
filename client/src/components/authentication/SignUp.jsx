import React from 'react'
import {
  FormControl,
  FormLabel,
  VStack,
  Input,
  HStack,
  InputGroup,
  InputRightElement,
  Button,
  useToast
} from '@chakra-ui/react'
import { useState } from 'react'
import { LuEye, LuEyeOff } from 'react-icons/lu'
import axios from 'axios'
import EmailValidator from 'email-validator'


const SignUp = () => {
  const [firstname, setFirstname] = useState()
  const [lastname, setLastname] = useState();
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [dob, setDob] = useState()
  const [pic, setPic] = useState()
  const [hidePass, setHidePass] = useState(true)
  const [loading, setLoading] = useState(false)

  const toast = useToast()

  const handleShow = () => {
    setHidePass(!hidePass)
  }

  const postDetails = (pic) => {
    setLoading(true)
    if (pic === undefined) {
      toast({
        title: 'Please select an image',
        status: 'Warning',
        duration: 5000,
        isClosable: true,
        position: 'top'
      })
      return
    }
    if (pic.type !== "image/jpeg" && pic.type !== "image/png") {
      toast({
        title: "Please Select a JPEG or PNG Image",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
      return;
    }
    if (pic.type === 'image/jpeg' || pic.type === 'image/png') {
      const data = new FormData()
      data.append("file", pic)
      data.append("upload_preset", "zchat-app")
      data.append("cloud_name", "ds90zherj")

      axios.post("https://api.cloudinary.com/v1_1/ds90zherj/image/upload", data).then((response) => {
        setPic(response.data.url.toSring())
        setLoading(false)
      }).catch((err) => {
        console.warn(err);
        toast({
          title: "An error has occurred while uploading the profile picture",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        setLoading(false)
      })
    }
  }

  const submitHandler = () => {
    setLoading(true)
    if (!firstname || !email || !password || !dob) {
      toast({
        title: 'Please fill in all the fields',
        status: 'warning',
        duration: '5000',
        isClosable: true,
        position: 'top'
      })
      setLoading(false)
      return
    }

    if (!EmailValidator.validate(email)) {
      toast({
        title: 'Please enter a valid email address',
        status: 'warning',
        duration: '5000',
        isClosable: true,
        position: 'top'
      })
      setLoading(false)
      return
    }

    const currentDate = new Date()
    const dobDate = new Date(dob)

    if (currentDate.getFullYear() - dobDate.getFullYear() < 13) {
      toast({
        title: 'You must be at least 13 years old to use this app',
        status: 'warning',
        duration: '5000',
        isClosable: true,
        position: 'top'
      })
      setLoading(false)
      return
    }

    axios.post('http://localhost:8080/api/user/',
      { firstname, lastname, email, password, dob, pic },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).then((res) => {
      if (res.status === 201) {
        toast({
          title: 'Account created successfully',
          status: 'success',
          duration: '5000',
          isClosable: true,
          position: 'top'
        })
      }
    }).catch((err) => {
      console.warn(err);
      toast({
        title: "An error has occurred while creating an account",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setLoading(false)
    }).finally(() => {
      setLoading(false)
    })

  }

  return (
    <VStack spacing='15px'>

      <HStack>
        <FormControl id='first_name' isRequired>
          <FormLabel>First Name</FormLabel>
          <Input
            size="lg"
            onChange={(e) => {
              setFirstname(e.target.value)
            }}
          ></Input>
        </FormControl>

        <FormControl id='last_name'>
          <FormLabel>Last Name</FormLabel>
          <Input
            size="lg"
            onChange={(e) => {
              setLastname(e.target.value)
            }}
          ></Input>
        </FormControl>
      </HStack>

      <FormControl id='email' isRequired>
        <FormLabel>Email address</FormLabel>
        <Input
          size="lg"
          onChange={(e) => {
            setEmail(e.target.value)
          }}
        ></Input>
      </FormControl>

      <FormControl id='password' isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="lg">
          <Input
            type={hidePass ? 'password' : 'text'}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          ></Input>
          <InputRightElement>
            <Button variant='link' size='lg' onClick={handleShow}>
              {hidePass ? <LuEyeOff size='20px' color='#718299' /> : <LuEye size='20px' color='' />}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id='dob' isRequired>
        <FormLabel>Date of Birth</FormLabel>
        <Input
          size="lg"
          type="date"
          onChange={(e) => {
            setDob(e.target.value)
          }}
        />
      </FormControl>

      <FormControl id='picture'>
        <FormLabel>Upload Profile Picture</FormLabel>
        <Input
          size='lg'
          id='profilepic'
          type='file'
          p={2}
          accept='image/'
          onChange={(e) => {
            postDetails(e.target.files[0])
          }}
        ></Input>
      </FormControl>

      <Button
        w={'100%'}
        mt={'10px'}
        colorScheme='blue'
        onClick={submitHandler}
        isLoading={loading}
      >
        Sign Up
      </Button>

    </VStack>
  )
}

export default SignUp