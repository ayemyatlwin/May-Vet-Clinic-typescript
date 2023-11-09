import { dataTypes } from "@/pages";
import React from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

interface PaginationProps {
    setData: (data: dataTypes[]) => void;
    rowsPerPage: number;
    data?: dataTypes[];
}

const Pagination: React.FC<PaginationProps> = ({ setData, rowsPerPage, data }) => {
    const skipTen = () => {
        // data &&
        //     setData(data?.slice(rowsPerPage - 1, data?.length - 1));
        // const next = data?.slice(rowsPerPage - 1, data.length - 1)
        // console.log(next);


    };
    const revTen = () => {
        // data && setData(data?.slice(0, 10));
        // const back = data?.slice(0, 10);
        // console.log(back);

    };

    return (
        <div>
            <section className="w-full">
                <div className="flex items-center rounded">
                    <BiChevronLeft
                        onClick={() => revTen()}
                        className="pagination-btn cursor-pointer w-8 h-7 p-1"
                    />

                    <BiChevronRight
                        onClick={() => skipTen()}
                        className="pagination-btn cursor-pointer w-8 h-7 p-1"
                    />
                </div>
            </section>
        </div>
    );
};

export default Pagination;
