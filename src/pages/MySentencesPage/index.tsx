import { useContext, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import api from '../../core/api';
import { AppContext } from '../../core/app-context';
import { Box, Button, Center, Flex, Text } from '@chakra-ui/react';
import { Word } from '../../types';
import { MdNavigateBefore } from "react-icons/md";


export default function MySentencesPage() {

    const [appState, dispatch] = useContext(AppContext);
    const [randomAdjs, setRandomAdjs] = useState<Array<string>>(["amazing"]);
    const [randomAdjIdx, setRandomAdjIdx] = useState<number>(0);
    const [randomAdj, setRandomAdj] = useState<string>("amazing");

    function getRandomAdjectives() {
        dispatch({
            type: "setLoading"
        });
        api
            .get('/api/get-random-words', { wordType: 'adjective' })
            .then((result) => {
                setRandomAdjs(result.data.words);
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

    useEffect(() => {
        api
            .get('/api/fetch-sentences', {})
            .then((result) => {
                try {
                    dispatch({
                        type: "update",
                        id: "mySentences",
                        value: result.data
                    });
                    getRandomAdjectives();
                } catch (error) {
                    console.log(error);
                }
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                dispatch({
                    type: "unsetLoading"
                });
            });
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            if (randomAdjs.length > 0) {
                if (randomAdjIdx === randomAdjs.length - 1) {
                    setRandomAdjIdx(0);
                }
                else {
                    setRandomAdjIdx(randomAdjIdx + 1);
                }
                setRandomAdj(randomAdjs[randomAdjIdx].toUpperCase());
            }
        }, 8000);
        return () => clearInterval(interval);
    }, []);

    return (
        <Box
            minH="100vh"
            backgroundColor='background'
            backgroundImage='url("https://www.transparenttextures.com/patterns/inspiration-geometry.png")'
        >
            <Flex>
                <Link to="/">
                    <Text
                        color="whitesmoke"
                        fontSize={18}
                        fontWeight={400}
                        _hover={{ textDecor: "underline" }}
                        p={4}
                    >
                        {<MdNavigateBefore size={24} style={{ display: "inline-block", color: "white" }} />}Back
                    </Text>
                </Link>
            </Flex>
            <Box
                mx={[4, 8, 12]}
                pt={12}
            >
                <Box color="whitesmoke" textAlign="center">
                    <Box mb={12}>
                        <Text
                            fontSize={27}
                            fontWeight={600}
                            textShadow="3px 4px rgba(85, 85, 85, 0.6)"
                            mb={10}
                        >
                            My {randomAdjs.length > 0 ? randomAdjs[randomAdjIdx].toUpperCase() : "AMAZING"} senetences
                        </Text>
                        <Box maxH="50vh" overflowY="auto">
                            {appState.mySentences &&
                                appState.mySentences.slice().reverse().map((sentOb: any) => {
                                    const sent: Array<Word> = sentOb.sentence;
                                    return (
                                        <Text
                                            fontWeight={500}
                                            fontSize={[17, 18, 18]}
                                            my={2}
                                            textShadow="2px 3px rgba(75, 75, 75, 0.6)"
                                            _hover={{
                                                fontSize: [18, 20, 20]
                                            }}
                                        >
                                            "{sent.map((word: Word, wIdx: number) => {
                                                if (wIdx === 0)
                                                    word.value = word.value[0].toUpperCase() + word.value.substring(1);
                                                return word.value + " ";
                                            })}."
                                        </Text>
                                    );
                                })
                            }
                        </Box>
                        {/* <Text fontStyle='italic'>- a wise sage</Text> */}
                    </Box>
                </Box>

                <Center>
                    <Link to="/">
                        <Button
                            backgroundColor="hsl(24, 96%, 45%)"
                            p={6}
                            mt={3}
                            mb={8}
                            boxShadow="dark-lg"
                            color="whitesmoke"
                            _hover={{
                                backgroundColor: "hsl(24, 100%, 55%)"
                            }}
                            _active={{}}
                        >
                            <Text fontWeight={600}>
                                Add more!
                            </Text>
                        </Button>
                    </Link>
                </Center>
            </Box>
        </Box>

    )
}
