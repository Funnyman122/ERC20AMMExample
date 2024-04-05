import './globals.css'

import { Web3Modal } from '../context/web3modal'
import { Box, Center, ChakraProvider, Flex, Link, useColorModeValue } from '@chakra-ui/react'
import {
  Text,
  IconButton,
  Stack,
  Collapse,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react'
import { ThemeProvider } from './components/darkmode'
import { ColorModeScript } from '@chakra-ui/react'
import NextLink from 'next/link'
import { useWeb3ModalAccount } from '@web3modal/ethers/react'
import ConnectModal from "./components/ConnectModal";
import { Button } from "@chakra-ui/react";
import { ConnectButton } from "./components/ConnectModal";
import { ColorSchemeScript, MantineProvider } from '@mantine/core';


export const metadata = {
  title: 'Web3Modal',
  description: 'Web3Modal Example'
}


export default function RootLayout({ children }: {children:any}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body style={{overflow:"hidden"}}>
        <ThemeProvider>
        <Web3Modal>
          <ChakraProvider>
            <Box>
    <main>
          <Box>
      <Flex
        zIndex={10000}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        align={'center'}>
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}>
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
        <Box >
        <Link color="#b0b0b0" as={NextLink} href="/" borderRadius="full" _hover={{
              textColor: '#FFFFFF',
              transition: '0.3s',
              textDecor: 'none',
              textShadow: '0 0 5px #262526, 0 0 5px #262526, 0 0 15px #262526, 0 0 15px #262526',
              background: 'radial-gradient(circle at center, #ffffff75, #ffffff20 100%)',
              boxShadow: '0 0 30px #ffffff47, 0 0 40px #ffffff47, 0 0 50px #ffffff47, 0 0 60px #ffffff47',
            }}><Text fontSize="2xl">Tofu Swap</Text></Link>
    </Box>
        </Flex>
        <Flex flex={{base: 1}} justify={{base: "center", md: "start"}}>
          <Center>
          <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-center'}
          direction={'row'}
          spacing={3}>
          <Link mx={2} color="#b0b0b0" as={NextLink} href="/swap" _hover={{
              textColor: '#FFFFFF',
              transition: '0.3s',
              textDecor: 'none',
              textShadow: '0 0 5px #262526, 0 0 5px #262526, 0 0 15px #262526, 0 0 15px #262526',
              background: 'radial-gradient(circle at center, #ffffff75, #ffffff20 100%)',
              boxShadow: '0px 0px 78px -8px #e30eae;',
            }}><Text fontSize="md">Swap</Text></Link>
            <Link mx={2} color="#b0b0b0" as={NextLink} href="/swap" _hover={{
              textColor: '#FFFFFF',
              transition: '0.3s',
              textDecor: 'none',
              textShadow: '0 0 5px #262526, 0 0 5px #262526, 0 0 15px #262526, 0 0 15px #262526',
              background: 'radial-gradient(circle at center, #ffffff75, #ffffff20 100%)',
              boxShadow: '0px 0px 78px -8px #e30eae;',
            }}><Text fontSize="md">Earn</Text></Link>
            <Link mx={2} color="#b0b0b0" as={NextLink} href="/swap" _hover={{
              textColor: '#FFFFFF',
              transition: '0.3s',
              textDecor: 'none',
              textShadow: '0 0 5px #262526, 0 0 5px #262526, 0 0 15px #262526, 0 0 15px #262526',
              background: 'radial-gradient(circle at center, #ffffff75, #ffffff20 100%)',
              boxShadow: '0px 0px 78px -8px #e30eae;',
            }}><Text fontSize="md">Betting</Text></Link>
          </Stack>
          </Center>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={3}>
          <ConnectModal />
          <ConnectButton/>
        </Stack>
      </Flex>
            
    </Box>
    </main>
    </Box>
          {children}
          </ChakraProvider>
          </Web3Modal>
          </ThemeProvider>
      </body>
    </html>
  )
}