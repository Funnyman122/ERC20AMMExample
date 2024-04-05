"use server";
import React from 'react'
import * as JsSearch from 'js-search';
const tokens: [{id:string, name:string, ticker: string, address: string}] = [{id:"1" ,name: "Ethereum", ticker: "ETH", address:"0x00"}]
const searchQuery = new JsSearch.Search("id");
searchQuery.addIndex(["name", "ticker", "address"]);
searchQuery.addDocuments(tokens);


const onMyFormSubmit = async (data:any) => {
    return searchQuery.search(data.target.value);
  };

export default onMyFormSubmit;
