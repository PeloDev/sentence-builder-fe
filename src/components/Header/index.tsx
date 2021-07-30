import React from 'react'
import { Box, Text } from '@chakra-ui/react';

export default function Header() {
    return (
        <Box backgroundColor='#EFD780' textAlign='center' py={6} px={3} boxShadow="dark-lg">
            <Text className="title">
                Sentence Builder
            </Text>
            <Text>
                Dynamically put sentences together from a selection of nouns, verbs, adjectives and more!
            </Text>
        </Box>
    )
}
