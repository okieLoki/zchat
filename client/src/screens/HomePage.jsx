import React from 'react'
import {
  Container,
  Box,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabIndicator,
  TabPanel,
  Image
} from '@chakra-ui/react'
import Login from '../components/authentication/Login'
import SignUp from '../components/authentication/SignUp'

const HomePage = () => {
  return (

    <Container maxW='xl' centerContent justifyContent='center'> 
      <Box
        bg='white'
        w='100%'
        p={4}
        borderRadius='lg'
        borderWidth='1px'
        shadow='md'
      >

        <Tabs position="relative" variant="unstyled" isFitted>
          <TabList>
            <Tab>Login</Tab>
            <Tab>Sign Up</Tab>

          </TabList>
          <TabIndicator
            mt="-1.5px"
            height="2px"
            bg="blue.500"
            borderRadius="1px"
          />
          <TabPanels>
            <TabPanel>

              <Login />

            </TabPanel>
            <TabPanel>

              <SignUp />

            </TabPanel>

          </TabPanels>
        </Tabs>


      </Box>

    </Container>

  )
}

export default HomePage