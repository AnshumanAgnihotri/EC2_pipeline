
import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import { isEmptyArray, } from "../../utils/utils";
import HeadMetadata from '../shared/HeadMetadata';
import Loader from "../shared/Loader";
import TopHeader from "./topHeader";
import SkillTable from "./skillTable";

const index = () => {
   
    return (
        <>
         <HeadMetadata metadata={{ title: 'LiFT Learning | Combined Portfollio' }} />
         <TopHeader />
         <SkillTable />
        </>
    )
}

export default index