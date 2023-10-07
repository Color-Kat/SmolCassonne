import {useCallback, useState} from "react";

/**
 * Return data for Paginate component by itemsCount and itemsPerPage
 *
 * @param itemsCount
 * @param itemsPerPage
 */
export const usePaginate = (itemsCount: number, itemsPerPage: number = 50) => {
    const [paginationOffset, setPaginationOffset] = useState(0);

    const pageCount = Math.ceil(itemsCount / itemsPerPage);
    const handlePageClick = useCallback((event: any) => {
        const newOffset = (event.selected * itemsPerPage) % itemsCount;
        setPaginationOffset(newOffset);
    }, [itemsCount]);

    const currentPage= paginationOffset / itemsPerPage;

    return {
        itemsCount,
        itemsPerPage,

        paginationOffset,
        handlePageClick,

        currentPage,
        pageCount,
    }
}