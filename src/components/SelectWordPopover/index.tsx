import React, { useContext, useEffect, useRef, useState } from 'react';
import {
    Box,
    Button,
    ButtonGroup,
    Input,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverFooter,
    PopoverHeader,
    PopoverTrigger,
    Text,
    useDisclosure
} from '@chakra-ui/react';
import api from '../../core/api';
import { AppContext } from '../../core/app-context';

export default function SelectWordPopover() {

    const [appState, dispatch] = useContext(AppContext);

    const [words, setWords] = useState<Array<string> | null>(null);
    const [selectedWordType, setSelectedWordType] = useState<string | null>(null);
    const [filterTerm, setFilterTerm] = useState<string>("");

    const initialFocusRef = useRef<any | null>();
    const disclosure = useDisclosure();

    useEffect(() => {
        dispatch({
            type: "setLoading"
        });
        api
            .get('/api/get-word-types', {})
            .then((result) => {
                dispatch({
                    type: "update",
                    id: "wordTypes",
                    value: result.data
                });
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                dispatch({
                    type: "unsetLoading"
                });
            });
    }, [])

    function getWords(wordType: string) {
        dispatch({
            type: "setLoading"
        });
        api
            .get('/api/get-words', { wordType: wordType })
            .then((result) => {
                console.log(result);
                setWords(result.data.words);
                setSelectedWordType(result.data.wordType);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                dispatch({
                    type: "unsetLoading"
                });
            });
    }

    function handleChange(e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) {
        let { value } = e.currentTarget;
        setFilterTerm(value);
        // console.log();
    }

    function selectWord(selectedWord: string) {
        dispatch({
            type: "add",
            id: "currentSentence",
            value: { value: selectedWord, type: selectedWordType, id: Math.floor(Date.now()) }
        });
        resetPopover();
    }

    function resetPopover() {
        setWords(null);
        setFilterTerm("");
        setSelectedWordType(null);
    }

    return (
        <Popover
            initialFocusRef={initialFocusRef}
            placement="bottom"
            closeOnBlur={false}
            onClose={() => {
                resetPopover();
                disclosure.onClose();
            }}
        >
            <PopoverTrigger>
                <Text fontWeight={600} color="whitesmoke" textAlign="center">
                    Add word
                </Text>
            </PopoverTrigger>
            <PopoverContent
                color="white"
                bg="blue.800"
                borderColor="blue.800"
                maxH="50vh"
                maxW="100vw"
                cursor="default"
            >
                <PopoverHeader pt={4} fontWeight="bold" border="0" textAlign="center">
                    {selectedWordType !== null ? `Pick a ${selectedWordType}` : "Select a word type"}
                    {selectedWordType &&
                        <Input
                            mt={2}
                            placeholder={`Search ${selectedWordType}s`}
                            onChange={handleChange}
                        />
                    }
                </PopoverHeader>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody overflowY="auto" mb={2}>
                    {
                        words !== null ?
                            <Box>
                                {
                                    words
                                        .filter((word) => word.toLowerCase().includes(filterTerm))
                                        .map((word, idx) => (
                                            <Box
                                                key={idx}
                                                w="100%"
                                                p={2} borderBottomWidth={1}
                                                borderBottomColor="#888"
                                                cursor="pointer"
                                                onClick={() => { selectWord(word); }}
                                            >
                                                <Text>{word}</Text>
                                            </Box>
                                        ))
                                }
                            </Box>
                            :
                            appState.wordTypes && appState.wordTypes.map((type: any, idx: number) => (
                                <Button
                                    key={idx}
                                    isLoading={appState.loading}
                                    m={1}
                                    colorScheme="green"
                                    onClick={() => {
                                        getWords(type);
                                    }}
                                >
                                    {type}
                                </Button>
                            ))
                    }
                </PopoverBody>
            </PopoverContent>
        </Popover>
    )
}
