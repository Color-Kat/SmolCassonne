import React, {memo} from 'react';
import ReactPaginate from "react-paginate";
import {twMerge} from "tailwind-merge";
import {BiChevronRight} from "react-icons/bi";
import {BsArrowLeft, BsArrowRight} from "react-icons/bs";

interface PaginateProps {
    currentPage: number;
    pageCount: number;
    handlePageClick: (e: any) => void;

    className?: string;
    activeClassName?: string;
}

const NextLabel = memo(() => (
    <div className="px-4 h-full flex items-center text-slate-700">
        <BsArrowRight className="w-5 h-5" />
    </div>
));

const PrevLabel = memo(() => (
    <div className="px-4 h-full flex items-center text-slate-700">
        <BsArrowLeft className="w-5 h-5" />
    </div>
));

export const Paginate: React.FC<PaginateProps> = memo(({
                                                      currentPage,
                                                      pageCount,
                                                      handlePageClick,

                                                      className,
                                                      activeClassName
}) => {

    if(pageCount <= 1) return null;

    return (
        <ReactPaginate
            breakLabel="..."
            nextLabel={<NextLabel />}
            previousLabel={<PrevLabel />}
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            renderOnZeroPageCount={null}
            forcePage={currentPage}

            className={twMerge(
                "relative flex mx-auto rounded-lg w-max items-stretch overflow-hidden divide-x divide-black/10 select-none",
                "text-slate-800 bg-white/70 h-8 shadow-md",
                className
            )}
            pageLinkClassName="px-2.5 h-full hover:bg-black/5 flex items-center"
            activeClassName={twMerge("bg-slate-300/50 text-slate-900", activeClassName)}
            nextClassName="hover:bg-black/5"
            previousClassName="hover:bg-black/5"
            breakLinkClassName="px-2 hover:bg-black/5"
        />
    );
});