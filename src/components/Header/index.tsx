import React from 'react'
import { Box, Flex, Text } from '@chakra-ui/react';
import { Link } from "react-router-dom";
import { MdNavigateNext } from "react-icons/md";

export default function Header() {
    return (
        <Box backgroundColor='#EFD780' textAlign='center' py={6} px={3} boxShadow="dark-lg">
            <Text className="title">
                Sentence Builder
            </Text>
            <Text>
                Dynamically put sentences together from a selection of nouns, verbs, adjectives and more!
            </Text>
            <Flex justifyContent="flex-end">
                <Link to="/my-sentences">
                    <Text
                        color="primaryDark"
                        fontSize={[16, 16, 16]}
                        fontWeight={500}
                        mx={[4, 8, 12]}
                        my={5}
                        textAlign="right"
                        _hover={{
                            textDecor: "underline"
                        }}
                    >
                        View My Sentences{<MdNavigateNext size={24} style={{ display: "inline-block", color: "hsl(220, 26%, 14%)" }} />}
                    </Text>
                </Link>
            </Flex>
        </Box>
    )
}
