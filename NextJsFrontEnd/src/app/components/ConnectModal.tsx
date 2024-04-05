"use client";

import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { Box } from "@mui/material";
import { ColorModeScript, useDisclosure, Button, Modal,  ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Text, Center} from '@chakra-ui/react'
import { useWeb3Modal, useWeb3ModalAccount, useDisconnect } from '@web3modal/ethers/react';
import { useRouter } from 'next/navigation';
import Image from "next/image"


export const chainIds: { [key: number]: string } = {
    1: "https://assets.coingecko.com/coins/images/279/standard/ethereum.png?1696501628",
    10: "https://assets.coingecko.com/coins/images/25244/standard/Optimism.png?1696524385"
}





export function ConnectButton() {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        setIsLoading(false);
    }, []);
    const web3dis = useDisconnect();
    const router = useRouter();
    const web3modal = useWeb3Modal();
    const web3modalAccount = useWeb3ModalAccount();
    if (isLoading) {
        return null;
    }
    const chainIds: { [key: number]: string } = {
        1: "https://assets.coingecko.com/coins/images/279/standard/ethereum.png?1696501628",
        10: "https://assets.coingecko.com/coins/images/25244/standard/Optimism.png?1696524385"
    };
    return web3modalAccount.isConnected ? (
        <>
        <Button onClick={()=>web3dis.disconnect()}>Disconnect</Button>
        <Center>
            <Text m="auto">{"..."+String(web3modalAccount.address).slice(-5)}</Text>
            <Image src={chainIds[Number(web3modalAccount.chainId) ?? ""]} alt="Network Image" width={40} height={1} style={
                {borderRadius: "100%", borderColor: "black", borderWidth: "1px", borderStyle: "solid", width: "30px", height: "30px"}
            }/>
            </Center>
        </>
    ) : (<><Button onClick={() => web3modal.open()}>Connect Wallet</Button></>)
}


//<Button onClick={()=>web3dis.disconnect()}>Disconnect</Button>
//<Button onClick={() => web3modal.open()}>Connect Wallet</Button>


export default function ConnectModal() {
    const web3modal =  useWeb3Modal();
    const web3modalAccount = useWeb3ModalAccount();
    const [state, setState] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure()
    if (!state) {
        if (web3modalAccount.isConnected) {
            setState(true);
        } else {
        onOpen();
        setState(true);
    }
    }
    const handleClose = () => {
        setState(true);
        onClose()
        web3modal.open();
    }
    return !web3modalAccount.isConnected ? (
      <>
        <Modal isOpen={isOpen} onClose={handleClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>To use this app, Connect your wallet!</ModalHeader>
            <ModalBody>
                This will enable you to use the swapping function!
            </ModalBody>
            <ModalCloseButton />
          </ModalContent>
        </Modal>
      </>
    ) : <></>
}