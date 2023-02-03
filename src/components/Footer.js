import {
    Box,
    chakra,
    Container,
    Stack,
    Text,
    useColorModeValue,
    VisuallyHidden,
} from '@chakra-ui/react';
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

const SocialButton = ({
    children,
    label,
    href,
}) => {
    return (
        <chakra.button
            bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
            rounded={'full'}
            w={8}
            h={8}
            cursor={'pointer'}
            as={'a'}
            href={href}
            display={'inline-flex'}
            alignItems={'center'}
            justifyContent={'center'}
            transition={'background 0.3s ease'}
            _hover={{
                bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
            }}>
            <VisuallyHidden>{label}</VisuallyHidden>
            {children}
        </chakra.button>
    );
};

export default function Footer() {
    return (
        <Box
            bg={useColorModeValue('gray.50', 'gray.900')}
            color={useColorModeValue('gray.700', 'gray.200')}>
            <Container
                as={Stack}
                maxW={'6xl'}
                py={4}
                direction={{ base: 'column', md: 'row' }}
                spacing={4}
                justify={{ base: 'center', md: 'space-between' }}
                align={{ base: 'center', md: 'center' }}>
                <Text>Made With ❤️ by Shashank Srivastava</Text>
                <Stack direction={'row'} spacing={6}>
                    <SocialButton label={'Twitter'} href={'#'}>
                        <Link to="https://twitter.com/shashank1503_" target="_blank">
                            <FaTwitter />
                        </Link>
                    </SocialButton>
                    <SocialButton label={'Github'} href={'#'}>
                        <Link to="https://github.com/shashank1503-cipher" target="_blank">
                            <FaGithub />
                        </Link>
                    </SocialButton>
                    <SocialButton label={'LinkediIn'} href={'#'}>
                        <Link to="https://www.linkedin.com/in/shashank-srivastava-a72899201/" target="_blank">
                            <FaLinkedin />
                        </Link>
                    </SocialButton>
                </Stack>
            </Container>
        </Box>
    );
}
