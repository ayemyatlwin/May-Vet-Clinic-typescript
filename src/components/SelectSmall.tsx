import { dataTypes } from "@/pages";
import React, { useState } from "react";

// Define
interface SelectSmallProps {
    val: string;
    valueOne: string;
    valueTwo: string;
    valueThree?: string;
    data: dataTypes[];
    setSelectedStatus: React.Dispatch<React.SetStateAction<string>>;
}

export default function SelectSmall({
    val,
    valueOne,
    valueTwo,
    valueThree,
    setSelectedStatus
}: SelectSmallProps) {





    const handleDirectorySelect = (selectedValue: string) => {
        setSelectedStatus(selectedValue)

    };



    return (
        <>
            <select
                onChange={(e) => {
                    e.preventDefault();
                    handleDirectorySelect(e.target.value)
                }}
                id="small"
                className="block w-full p-1 mb-3 text-sm text-placeholder selectBorders rounded-full bg-inherit"
            >

                <option value={val}>{val}</option>

                <option value={valueOne}>{valueOne}</option>

                <option value={valueTwo}>{valueTwo}</option>

                {valueThree && <option value={valueThree}>{valueThree}</option>}
            </select>
        </>
    );
}
