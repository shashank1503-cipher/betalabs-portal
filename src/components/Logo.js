import { Text, useColorModeValue } from '@chakra-ui/react';
import React from 'react'

const Logo = (props) => {
    const color = useColorModeValue('cyan.600', 'cyan');
    return (
        <Text
            fontFamily={`'Poppins', sans-serif`}
            // color={color}
            fontWeight="bold"
            {...props}
        >
            BetaLabs
        </Text>
    )
}

export default Logo