import { useContext, useState } from 'react';
import { Box, Button, Center, GridItem, Text } from '@chakra-ui/react';
import Header from '../../components/Header';
import { AppContext } from '../../core/app-context';
import { Word } from '../../types';
import { Link } from "react-router-dom";
import SelectWordPopover from '../../components/SelectWordPopover';
import api from '../../core/api';



export default function HomePage() {

    const [appState, dispatch] = useContext(AppContext);
    const [selectedWord, setSelectedWord] = useState<Word | null>(null);
    const [message, setMessage] = useState<{ value: string, status: number | null }>({ value: "", status: null });

    return (
        <Box
            minH="100vh"
            backgroundColor='background'
            backgroundImage='url("https://www.transparenttextures.com/patterns/inspiration-geometry.png")'
        >
            <Header />
            <Box
                mx={[4, 8, 12]}
                pt={7}
            >
                <Box color="whitesmoke" textAlign="center">
                    <Box mb={12}>
                        <Text fontWeight={500} fontSize={[17, 18, 18]}>
                            "{appState.currentSentence.map((word: Word, wIdx: number) => {
                                if (wIdx === 0)
                                    word.value = word.value[0].toUpperCase() + word.value.substring(1);
                                return word.value + " ";
                            })}."
                        </Text>
                        <Text fontStyle='italic'>- a wise sage</Text>
                    </Box>
                    <Text fontSize={14}>
                        Click "Add word" to begin building.
                    </Text>
                    <Text fontSize={14} mb={2}>
                        Click on word to remove.
                    </Text>
                </Box>
                <Box
                    borderRadius={6}
                    bg="whitesmoke"
                    mb={4}
                    boxShadow="lg"
                    p={4}
                >
                    {
                        appState.currentSentence.map((word: Word, idx: number) => (
                            <Box
                                key={idx}
                                display="inline-block"
                                _hover={{
                                    fontWeight: 700,
                                    backgroundColor: "hsl(24, 96%, 55%)",
                                    boxShadow: "lg",
                                    color: "white"
                                }}
                                backgroundColor={word === selectedWord ? "hsl(198, 78%, 64%)" : "white"}
                                boxShadow={word === selectedWord ? "lg" : ""}
                                color={word === selectedWord ? "white" : ""}
                                py={2}
                                px={1}
                                borderRadius={6}
                                cursor="pointer"
                                onClick={() => {
                                    if (word === selectedWord)
                                        setSelectedWord(null);
                                    else
                                        setSelectedWord(word);
                                }}
                            >
                                <Text
                                    fontSize={[17, 18, 18]}
                                    fontWeight={word === selectedWord ? 700 : 500}
                                    textAlign="center"
                                    _hover={{ fontWeight: 700 }}
                                >
                                    {idx === 0 ? `${word.value.substring(0, 1).toUpperCase()}${word.value.substring(1)}` : word.value}
                                </Text>
                            </Box   >
                        ))
                    }
                    <Text
                        display="inline-block"
                        fontSize={18}
                        fontWeight={500}
                        textAlign="center"
                        _hover={{ fontWeight: 700 }}
                    >
                        .
                    </Text>
                    <GridItem
                        display="inline-block"
                        backgroundColor="hsl(60, 100%, 25%)"
                        p={2}
                        ml={4}
                        borderRadius={2}
                        boxShadow="xl"
                        cursor="pointer"
                        _hover={{ backgroundColor: 'background', boxShadow: "dark-lg" }}
                    >
                        <SelectWordPopover />
                    </GridItem>
                    <GridItem
                        display="inline-block"
                        backgroundColor="hsl(24, 96%, 55%)"
                        p={2}
                        ml={4}
                        borderRadius={2}
                        boxShadow="xl"
                        cursor="pointer"
                        _hover={{ backgroundColor: 'hsl(15, 100%, 55%)', boxShadow: "dark-lg" }}
                        onClick={() => {
                            dispatch({
                                type: "update",
                                id: "currentSentence",
                                value: []
                            });
                            setMessage({ value: "", status: null });
                        }}
                    >
                        <Text fontWeight={600} color="whitesmoke" textAlign="center">
                            Clear
                        </Text>
                    </GridItem>
                </Box>
                {
                    selectedWord !== null &&
                    <Box>
                        <Text
                            color="white"
                            my={2}
                            fontWeight={600}
                        >
                            {selectedWord.value} - <span style={{ fontWeight: 300 }}>{selectedWord.type}</span>
                        </Text>
                        <Button
                            colorScheme="red"
                            onClick={() => {
                                selectedWord.id !== undefined && dispatch({
                                    type: "delete",
                                    id: "currentSentence",
                                    value: selectedWord.id
                                });
                                setSelectedWord(null);
                            }}
                        >
                            Remove
                        </Button>
                    </Box>
                }

                <Box>
                    {
                        message.status !== null &&
                        <>
                            <Text
                                textAlign="center"
                                color={message.status === 0 ? "red.700" : "blue.100"}
                                fontWeight={600}
                            >
                                {message.value}
                            </Text>
                            {
                                message.status !== 0 &&
                                <Link to="/my-sentences">
                                <Text
                                    textAlign="center"
                                    color={message.status === 0 ? "red.700" : "blue.100"}
                                    fontWeight={600}
                                    textDecor="underline"
                                >
                                    View
                                </Text>
                            </Link>
                            }
                        </>
                    }
                </Box>

                <Center>
                    <Button
                        isLoading={appState.loading}
                        backgroundColor="hsl(13, 77%, 55%)"
                        p={6}
                        my={12}
                        boxShadow="dark-lg"
                        isDisabled={appState.currentSentence.length < 3}
                        color="whitesmoke"
                        _hover={{
                            backgroundColor: "hsl(13, 100%, 55%)"
                        }}
                        _active={{}}
                        onClick={() => {
                            dispatch({
                                type: "setLoading"
                            });
                            api
                                .post('/api/store-sentence', { sentence: appState.currentSentence })
                                .then((result) => {
                                    if (typeof result.data === 'object') {
                                        if (result.data.sentence) {
                                            setMessage({ value: "Your sentence has been saved!", status: 1 })
                                        } else {
                                            setMessage({ value: "Something went wrong", status: 0 });
                                            console.log(result.data);
                                        }
                                    } else {
                                        setMessage({ value: "Something went wrong", status: 0 });
                                        console.log(result);
                                    }
                                })
                                .catch((err) => { console.log(err); })
                                .finally(() => {
                                    dispatch({
                                        type: "unsetLoading"
                                    });
                                });
                        }}
                    >
                        <Text fontWeight={600}>
                            Save Sentence
                        </Text>
                    </Button>
                </Center>
            </Box>
        </Box>

    )
}
