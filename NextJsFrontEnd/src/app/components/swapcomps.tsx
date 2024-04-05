"use client";
import React from 'react'
import Image from 'next/image'
import { chainIds } from './ConnectModal'

export default function CurrencySelect() {
  return (
    <>
    <Image src={chainIds[1]} alt="Currency"/><>ETH</>
    </>
  )
}
