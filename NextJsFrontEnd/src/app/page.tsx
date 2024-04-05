import Image from "next/image";
//import web3modal hooks
import { useWeb3ModalAccount } from '@web3modal/ethers/react'
import ConnectModal from "./components/ConnectModal";
// i want to make a header bar with chakra, add all the neccesary imports for this
import { Box, Flex, Spacer, Heading, Link, extendTheme, Center } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { ConnectButton } from "./components/ConnectModal";
import {
  Text,
  IconButton,
  Stack,
  Collapse,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react'
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons'
import NextLink from 'next/link'
import zIndex from "@mui/material/styles/zIndex";

const theme = extendTheme({
  textStyles: {
    h1: {
      // you can also use responsive styles
      fontSize: ["48px", "72px"],
      fontWeight: "bold",
      lineHeight: "110%",
      letterSpacing: "-2%",
    },
    h2: {
      fontSize: ["36px", "48px"],
      fontWeight: "semibold",
      lineHeight: "110%",
      letterSpacing: "-1%",
    },
  },
})


export default function Home() {
  return (
    <>
    Hello word
    </>
  );
}

