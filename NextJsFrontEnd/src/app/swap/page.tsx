import React from 'react'
import { Center, Box, Heading, Flex, Text, Stack, VStack } from '@chakra-ui/react';
import { chainIds } from '../components/ConnectModal';
import Image from 'next/image';
import CurrencySelect from '../components/swapcomps';
import Tokenselect from '../components/tokenselect';
import { common } from '@mui/material/colors';
import { ImageList } from '@mui/material';
// install the ts types for this module
// npm install --save-dev @types/heroicons-react


//import an icon that indicates a reversal or flip



import { ChevronDoubleDownIcon, ArrowsUpDownIcon } from '@heroicons/react/24/solid'



const commonCrypto = [
        {"name": "Ethereum"},
        {"name": "BNB"},
        {"name": "USD Coin"},
        {"name": "Wrapped Bitcoin"},
        {"name": "Chainlink"},
        {"name": "Polygon"},
        {"name": "Dai"},
        {"name": "Uniswap"},
        {"name": "Avalanche"},
        {"name": "Ethereum Classic"},
        {"name": "Avalanche"}
    ]

    

async function getAllImages(state: {name:string}[]) {
        const promises = state.map(async token => {
                
            const url = "https://api.coingecko.com/api/v3/coins/"
            const res = await fetch(url+token.name.toLowerCase(), {next: { revalidate: false }})
            if (res.status === 200) {
                const out = await res.json();
                const image = {...token, image: out.image.large}
                return image;
            } else {
                return token;
            }
        });
        return Promise.all(promises);
    }

const _images = getAllImages(commonCrypto);

export default async function SwapPage() {
        const images = await _images
    return (
        <div>
                <Center width={"100vw"} height={"100vh"}>
                <Box borderRadius={"3xl"} borderStyle={"solid"} borderColor={"black"} borderWidth={"8px"} minWidth={"30%"} minHeight={"80%"} >
                <Flex direction={"column"}>
                        <Flex flex={{base:1, padStart:2}} justify={{base:"center", md:"5",} }>
                        <Text fontSize={"2xl"} ps={2}>Swap!</Text>
                        </Flex>
                        <Center width={"100%"} height={"100%"} pt={5}>
                        <Box backgroundColor={"#262526"} color={"white"} borderRadius={"2xl"} minHeight={"20vh"} minWidth={"95%"} >
                                <Text ps={3} pt={5}>You Pay:</Text>
                                <Flex justifyContent={"end"} pe={3}>
                                <Box borderRadius={"25%"} backgroundColor={"gray"} minHeight={"20%"} minWidth={"20%"}>
                                <Center height={"100%"} width={"100%"}>
                                <Tokenselect commonCrypto={images}/>  
                                </Center>
                                </Box>
                                </Flex>
                        </Box>
                        </Center>
                        <Flex>
                        <Center width={"100%"} height={"100%"} mt={5}>
                        <ChevronDoubleDownIcon width={"25px"} color={"purple"} style={{marginLeft:"50px"}}/>
                        <ArrowsUpDownIcon width={"25px"} color={"purple"} style={{marginLeft:"25px"}}/>
                        </Center>
                        </Flex>
                        <Center width={"100%"} height={"100%"} pt={5} className='flex flex-bottom items-bottom content-bottom'>
                        
                        <Box backgroundColor={"#262526"} color={"white"} borderRadius={"2xl"} minHeight={"20vh"} minWidth={"95%"} >
                                <Text ps={3} pt={5}>You Receive:</Text>
                                <Flex justifyContent={"end"} pe={3}>
                                <Box borderRadius={"25%"} backgroundColor={"gray"} minHeight={"20%"} minWidth={"20%"}>
                                <Center height={"100%"} width={"100%"}>
                                <Tokenselect commonCrypto={images}/>  
                                </Center>
                                </Box>
                                </Flex>
                        </Box>
                        </Center>
                        </Flex>
                </Box>
                </Center>
        </div>
    )
}
