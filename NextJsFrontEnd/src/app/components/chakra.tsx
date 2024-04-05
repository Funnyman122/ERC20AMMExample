"use client";


import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import { extendTheme, type ThemeConfig } from '@chakra-ui/react'
const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

export default function Chakra({children}: {children: React.ReactNode}) {
    const _theme = extendTheme({config})
  return (
    <ChakraProvider theme={_theme}>
      {children}
    </ChakraProvider>
  )
}
