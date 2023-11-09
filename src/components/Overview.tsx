import React from "react";
import search from "../images/search.png";
import SelectSmall from "./SelectSmall";
import CreatePatient from "./CreatePatient";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import { dataTypes } from "@/pages";



interface OverviewProps {
    handleSearchInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    setData: React.Dispatch<React.SetStateAction<dataTypes[]>>;
    setSelectedStatus: React.Dispatch<React.SetStateAction<string>>;

}

const Overview: React.FC<OverviewProps> = ({ handleSearchInputChange, setSelectedStatus, setData }) => {
    const { selectedRow, setSelectedRow, searchQuery } = useAppContext();

    const rowChangeHandler = (value: string) => {
        setSelectedRow(Number(value));
    };

    return (
        <div className="flex flex-col px-5 pt-3">
            <h1 className="Title font-semibold pb-3">Patient List</h1>
            <div className="flex justify-between">
                <div className="flex flex-col">
                    <div className="inputSearch flex py-1">
                        <input
                            className="outline-none"
                            type="text"
                            placeholder="Search by Pet Name"
                            value={searchQuery}
                            onChange={handleSearchInputChange}
                        />
                        <Image src={search} className="h-3 w-3 mt-1.5 ms-auto" alt="" />
                    </div>
                    <div className="flex gap-3 mt-3">
                        <SelectSmall
                            val="Status"
                            setSelectedStatus={setSelectedStatus}
                            valueOne="allergy"
                            valueTwo="picky_eat"
                            viewOne="Picky Eater"
                            viewTwo="Allergy"

                        />
                        <SelectSmall
                            val="Breed All"
                            setSelectedStatus={setSelectedStatus}
                            valueOne="Golden Retriever"
                            valueTwo="Beagle"
                            valueThree="Spaniel"
                        />
                    </div>
                </div>
                <div className="flex flex-col">
                    <CreatePatient />
                    <div className="flex mt-3">
                        <label htmlFor="small" className="block text-xs font-medium">
                            Rows per page:
                        </label>
                        <select
                            value={selectedRow}
                            onChange={(e) => {
                                rowChangeHandler(e.target.value);
                            }}
                            id="small"
                            className="block w-full p-1 mb-3 text-sm text-placeholder selectBorders rounded-full bg-inherit"
                        >
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Overview;
