import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Image,
  Input,
  Link,
  ModalFooter,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Center } from '@chakra-ui/react';
import { Link as NavLink } from 'react-router-dom';
import useAuth from '../context/AuthContext';
//   import Footer from '../components/Footer';
// import { FiGithub } from 'react-icons/fi';
function Landing() {
  const { signInPopup, error, loading } = useAuth();
  let toast = useToast();
  if (error) {
    toast({
      title: 'Error',
      description: `${error.message} - ${error.code}`,
      status: 'error',
      isClosable: true,
    });
  }
  return (

    <Flex direction={'column'}>
      <Flex direction="column">
        <Flex
          direction={['column', 'column', 'column', 'row']}
          alignItems={'center'}
          justifyContent={'space-between'}
          p={[0, 0, 0, 5]}
          h={['10vh', '10vh', '10vh', 'auto']}

        // sboxShadow={'xl'}
        // bg={useColorModeValue('gray.100', 'gray.900')}
        >
          <NavLink to="/">
            <Flex direction={'column'}>
              <Heading
                fontFamily={`'Poppins', sans-serif`}
                fontSize={['20px', '24px', '28px', '30px']}
              >
                {' '}
                BetaLabs
              </Heading>{' '}
            </Flex>
          </NavLink>
          <Flex justifyContent={'flex-end'} gap={3}>
            <Button
              onClick={signInPopup}
              // onClick={() => console}
              w={'full'}
              maxW={'md'}
              variant={'outline'}
              leftIcon={<FcGoogle />}
              isLoading={loading}
            >
              <Center>
                <Text display={['none', 'none', 'flex', 'flex']}>
                  Sign in with Google
                </Text>
              </Center>
            </Button>

            <ColorModeSwitcher />
          </Flex>
        </Flex>

        <Flex direction={'column'} justifyContent={'center'}>
          <Flex
            minH={'90vh'}
            justifyContent={'center'}
            align={'center'}
            direction={'column'}
          >
            <Heading
              fontFamily={`'Poppins', sans-serif;`}
              // color={useColorModeValue('cyan.600', 'cyan')}
              fontSize={['30px', '40px', '60px', '80px']}
              // textTransform={'uppercase'}
              display={'flex'}
            >
              Welcome to BetaLabs Portal
            </Heading>
            <Text
              mt={5}
              fontSize={['16px', '21px', '25px', '25px']}
              w={'75%'}
              textAlign={'center'}
              fontFamily={`'Roboto', sans-serif;`}
              fontWeight={'medium'}
            >
              Official portal for BetaLabs, Tech Club of IIIT Kottayam
            </Text>
            <ButtonGroup spacing={10} mt={5}>
              <Button
                variant={'solid'}
                size={'lg'}
                colorScheme={'cyan'}
                borderRadius={'full'}
                onClick={signInPopup}
                isLoading={loading}
              >
                {' '}
                Get Started
              </Button>
              <Button
                variant={'ghost'}
                size={'lg'}
                colorScheme={'cyan'}
                borderRadius={'full'}
                onClick={() => {
                  let scrollAmt = Math.round(window.innerHeight * 1.05);
                  console.log(scrollAmt);
                  window.scrollTo({
                    top: scrollAmt,
                  });
                }}
              >
                Learn More
              </Button>
            </ButtonGroup>
          </Flex>
        </Flex>
      </Flex>
      <Flex
        direction={['column', 'column', 'column', 'row']}
        bg={useColorModeValue('cyan.50', 'blackAlpha.500')}
        id={'about'}
      >
        <Flex mx={[0, 0, 5, 10]} minW={'350px'} flexBasis={'50%'} flexGrow={1}>
          <Image
            alt={'Landing Image'}
            objectFit={'cover'}
            src={
              'https://res.cloudinary.com/dpjf6btln/image/upload/v1675090685/Seminar-pana_wkf8zl.png'
            }
          />
        </Flex>
        <Flex direction={'column'} justifyContent={'center'} align={'center'}>
          <Heading
            fontSize={['25px', '30px', '45px', '45px']}
            fontFamily={`'Poppins', sans-serif;`}
            w={'75%'}
          >
            {' '}
            Get latest updates about TCA Events
          </Heading>
          <Text w={'75%'} my={5}
            fontSize={['15px', '20px', '24px', '24px']}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
          </Text>
        </Flex>
      </Flex>{' '}
      <Flex
        direction={['column', 'column', 'column', 'row-reverse']}
        bg={useColorModeValue('whiteAlpha', 'blackAlpha.100')}
      >
        <Flex
          flex={1}
          mx={[0, 0, 5, 10]}
          minW={'350px'}
          flexBasis={'50%'}
          flexGrow={1}
        >
          <Image
            alt={'Landing Image'}
            objectFit={'cover'}
            src={
              'https://res.cloudinary.com/dpjf6btln/image/upload/v1675090685/Team_work-amico_uwfi9a.png'
            }
          />
        </Flex>
        <Flex direction={'column'} justifyContent={'center'} align={'center'}>
          <Heading
            fontSize={['25px', '30px', '45px', '45px']}
            fontFamily={`'Poppins', sans-serif;`}
            w={'75%'}
          >
            {' '}
            Collaborate with your peers on different Tech Club Activities
          </Heading>
          <Text w={'75%'} my={5}
            fontSize={['15px', '20px', '24px', '24px']}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
          </Text>
        </Flex>
      </Flex>
      <Flex
        direction={['column', 'column', 'column', 'row']}
        bg={useColorModeValue('cyan.50', 'blackAlpha.500')}
      >
        <Flex
          flex={1}
          mx={[0, 0, 5, 10]}
          minW={'350px'}
          // maxH={'500px'}
          flexBasis={'50%'}

        >
          <Image
            alt={'Landing Image'}
            objectFit={'cover'}
            src={
              'https://res.cloudinary.com/dpjf6btln/image/upload/v1675090685/Next_steps-rafiki_rmtbkf.png'
            }
          />
        </Flex>
        <Flex direction={'column'} justifyContent={'center'} align={'center'}>
          <Heading
            fontSize={['25px', '30px', '45px', '45px']}
            fontFamily={`'Poppins', sans-serif;`}
            w={'75%'}
          >
            {' '}
            Checkout the leaderboard
          </Heading>
          <Text w={'75%'} my={5}
            fontSize={['15px', '20px', '24px', '24px']}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
          </Text>
        </Flex>
      </Flex>{' '}
      <Flex
        direction={'column'}
        bg={useColorModeValue('whiteAlpha', 'blackAlpha.100')}
      >
        <Flex direction={'column'} justifyContent={'center'} align={'center'}>
          <Heading
            fontSize={['25px', '30px', '45px', '45px']}
            fontFamily={`'Poppins', sans-serif;`}
            my={20}
          >
            {' '}
            Let's grow together
          </Heading>
        </Flex>
        <Flex
          minW={'350px'}
          // w={'75%'}
          justifyContent={'center'}
          align={'center'}
        >
          <Image
            alt={'Landing Image'}
            objectFit={'cover'}
            src={
              'https://res.cloudinary.com/dpjf6btln/image/upload/v1675090787/Creative_team-amico_d2guz3.png'
            }
            w={'50%'}
          />
        </Flex>
        <Flex
          justifyContent={'center'}
          align={'center'}
          direction={'column'}
          my={10}
        >
          <Heading
            fontSize={['20px', '25px', '25px', '30px']}
            fontFamily={`'Poppins', sans-serif;`}
            mb={10}
          >
            {' '}
            Ready for some mischief?
          </Heading>
          <Button
            variant={'solid'}
            bg={'cyan.500'}
            variantColor={'white'}
            color={'white'}
            borderColor={'whiteAlpha.300'}
            size={'lg'}
            borderRadius={'full'}
            _hover={{
              bg: 'cyan.600',
            }}
            onClick={signInPopup}
            isLoading={loading}
            mb={10}
          >
            {' '}
            Join Us Now
          </Button>
        </Flex>
      </Flex>
      {/* <Footer /> */}
    </Flex>
  );
}

export default Landing;
