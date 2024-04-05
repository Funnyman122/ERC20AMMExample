"use client";
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ColorModeScript, useDisclosure, Button, Modal,  ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Text, Center, Textarea, Input, Box, Flex, Grid} from '@chakra-ui/react'
import { useForm } from "react-hook-form";
import Image from "next/image" 
import searchServer from "./searchserver";
import * as JsSearch from 'js-search';
import Autoplay from 'embla-carousel-autoplay'
import { Carousel, CarouselContent, CarouselNext, CarouselPrevious, CarouselItem, } from '@/components/ui/carousel';
import {
        Card,
        CardContent,
        CardDescription,
        CardFooter,
        CardHeader,
        CardTitle,  
      } from "@/components/ui/card"
import { common } from '@mui/material/colors';
import { ScrollArea } from "@/components/ui/scroll-area"
import useEmblaCarousel from 'embla-carousel-react';



const tokens: {id:string, name:string, ticker: string, address: string, image?:string|undefined}[] = [
    {"id": "1", "name": "Ethereum", "ticker": "ETH", "address": "N/A", "image": "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png"},
    {"id": "2", "name": "BNB", "ticker": "BNB", "address": "N/A", "image": "https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png"},
    {"id": "3", "name": "USD Coin", "ticker": "USDC", "address": "N/A"},
    {"id": "4", "name": "Wrapped Bitcoin", "ticker": "WBTC", "address": "N/A"},
    {"id": "5", "name": "Chainlink", "ticker": "LINK", "address": "N/A"},
    {"id": "6", "name": "Polygon", "ticker": "MATIC", "address": "N/A"},
    {"id": "7", "name": "Dai", "ticker": "DAI", "address": "N/A"},
    {"id": "8", "name": "Uniswap", "ticker": "UNI", "address": "N/A"},
    {"id": "9", "name": "Avalanche", "ticker": "AVAX", "address": "N/A"},
    {"id": "10", "name": "Ethereum Classic", "ticker": "ETC", "address": "N/A"},
    {"id": "17", "name": "Avalanche", "ticker": "AVAX", "address": "N/A"}
  ]
  

  
    
const searchQuery = new JsSearch.Search("id");
searchQuery.indexStrategy = new JsSearch.AllSubstringsIndexStrategy();
searchQuery.addIndex("name");
searchQuery.addIndex("ticker");
searchQuery.addIndex("address");
searchQuery.addDocuments(tokens);





export default function Tokenselect({commonCrypto}: {commonCrypto: any}) {
    const formRef: any = useRef(null);
    const [results, setResults]: [any[], any] = useState([...tokens]);
    
    const form = useForm<{searchQuery:string}>({
        defaultValues: {
          searchQuery: "",
        },
      });
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [state, setState]: [any, any] = useState(commonCrypto);
  console.log(commonCrypto);
    return (
        <>
    <Button onClick={onOpen}>Pick Token</Button>
    <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
        <ModalOverlay>
            <ModalContent minHeight={"30%"} maxHeight={"100%"}>
                <ModalHeader>Select Token</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                <form ref={formRef}>
                    <div>
                        <Input height={"50px"} {...form.register("searchQuery", {onChange: (e)=>{setResults(searchQuery.search(e.target.value))}})} placeholder='Enter a token name, ticker or address...' minWidth={"100%"} borderColor={"purple"}/>
                    </div>
                    </form>
                    <Box mt={3}>
                        Trending tokens:
                        <Carousel plugins={[
        Autoplay({
          delay: 2000,
          stopOnInteraction: false,
        }),
      ]}>
                            <CarouselContent>
                                {commonCrypto.map((token:any, _index:any) => {
                                    return (
                                        <CarouselItem className="basis-1/2" key={_index}>
                                            <Card className='bg-dark text-white'>
                                                <CardContent className='flex items-center justify-center p-6 bg-dark' style={{height:"20px"}}>
                                                    <Center>
                                                        <Flex className='flex-end'>
                                                            <Center>
                                                            <Text className='me-3'>{token.name}</Text>
                                                            {token.image ? <Image className='' src={token.image} alt="token image" width={2} height={2} style={{width:"auto", height:"25px"}}/> : <></>}          
                                                            </Center>
                                                        </Flex>
                                                        </Center>
                                                </CardContent>
                                            </Card>
                                        </CarouselItem>
                                    );
                                })}
                            </CarouselContent>
                        </Carousel>
                        Common tokens:
                        <Flex mt={3} mb={4}>
                            <Box me={2} rounded={"md"} minHeight={"50px"} minWidth = {"32%"} borderStyle={"solid"} borderColor={"purple"} borderWidth={"1px"}>
                                <Center height={"100%"}>Ethereum  <Image src={tokens[0].image??""} alt="token image" width={2} height={2} style={{width:"auto", height:"25px"}}/></Center>
                            </Box>
                            <Box me={2} rounded={"md"} minHeight={"50px"} minWidth = {"32%"} borderStyle={"solid"} borderColor={"purple"} borderWidth={"1px"}>
                                <Center height={"100%"}>BNB  <Image src={tokens[1].image??""} alt="token image" width={2} height={2} style={{width:"auto", height:"25px"}}/></Center>
                            </Box>
                            <Box rounded={"md"} minHeight={"50px"} minWidth = {"32%"} borderStyle={"solid"} borderColor={"purple"} borderWidth={"1px"}>
                                <Center height={"100%"}>Solana  </Center>
                            </Box>
                        </Flex>
                    </Box>
                    <ScrollArea style={{maxHeight: "200px"}} className='h-72 w-100 rounded-md border' color='Slate'> 
                    <div className="p-4">
                            {results.slice(0,10).map((token, _index) => {
                            return (
                            <div key={_index}>  
                                <Card className='flex items-center bg-dark mb-3 border-none text-white' style={{maxHeight:"50px"}}>
                                    
                                    <Center height ={"50px"} ms={3}>
                                    
                                    {token.image ? <Image key={token.id} src={token.image??""} alt="token image" width={2} height={2} style={{width:"auto", height:"25px", marginRight:"20px"}}/>
                                     : <></>}
                                     <Flex direction={"column"}>
                                        <Text me={3}>{token.ticker}</Text>
                                        <Text me={3}>{token.name}</Text>
                                    </Flex>
                       
                                    
                                    </Center>
                                    
                                </Card>
                            </div>
                            )
                        }
                        )}
                    </div>
                    </ScrollArea>
                </ModalBody>
            </ModalContent>
        </ModalOverlay>
    </Modal>
    </>
  )
}