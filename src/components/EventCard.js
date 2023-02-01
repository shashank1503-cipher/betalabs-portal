import {
    Box,
    Center,
    Heading,
    Text,
    Stack,
    Avatar,
    useColorModeValue,
    Image,
    Flex,
    Button,
    IconButton,
    useToast,
    Tooltip,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FaHeart, FaLink, FaUserSecret } from 'react-icons/fa';
import { FiHeart } from 'react-icons/fi';
import { HiOutlineExternalLink } from 'react-icons/hi';
import { useNavigate } from 'react-router';
import useAuth from '../context/AuthContext';

export default function EventCard(props) {
    
    let category = props.category;
    let id = props.id;
    let heroImage = props.heroImage
    let eventName = props.eventName;
    let eventTaker = props.eventTaker;
    let startDate = props.start;
    let endDate = props.end;
    let timing = props.timing;
    const bg = useColorModeValue('white', 'gray.900');
    const color = useColorModeValue('gray.700', 'white');
    let navigate = useNavigate();
    let toast = useToast();
    let { token } = useAuth();

    return (
        <Center py={6} px={6}>
            <Box
                maxW={'sm'}
                minW={'xs'}
                bg={bg}
                boxShadow={'2xl'}
                rounded={'md'}
                p={6}
                overflow={'hidden'}
            >
                <Box bg={'gray.100'} mt={-6} mx={-6} mb={12} pos={'relative'}>
                    <Image
                        src={heroImage}
                        maxH={'200px'}
                        mx={'auto'}
                        objectFit={'fill'}
                    />
                </Box>
                <Stack>
                    <Text
                        color={'green.500'}
                        textTransform={'uppercase'}
                        fontWeight={800}
                        fontSize={'sm'}
                        letterSpacing={1.1}
                    >
                        {category}
                    </Text>
                    <Heading
                        color={color}
                        fontSize={'2xl'}
                        fontFamily={'body'}
                        textAlign={'center'}
                    >
                        {eventName}
                    </Heading>
                    <Flex align={'center'}>
                        <Text color={'gray.400'}>
                            <Text
                                fontWeight={'bold'}
                                color={useColorModeValue('gray.700', 'gray.100')}
                            >
                                Date
                            </Text>
                            {startDate} - {endDate}
                            <Text
                                fontWeight={'bold'}
                                color={useColorModeValue('gray.700', 'gray.100')}
                            >
                                Taken By
                            </Text>
                            {eventTaker}
                            <Text
                                fontWeight={'bold'}
                                color={useColorModeValue('gray.700', 'gray.100')}
                            >
                                Timing
                            </Text>
                            {timing}
                        </Text>
                    </Flex>
                    <Flex justifyContent={'flex-end'}>
                        <Tooltip label={'View Event'} aria-label={'View Event'}>
                            <Button
                                onClick={() => navigate(`/event/${id}`)}
                                rightIcon={<HiOutlineExternalLink />}
                                colorScheme={'cyan'}
                            >
                                View
                            </Button>
                        </Tooltip>
                    </Flex>
                </Stack>
            </Box>
        </Center>
    );
}
