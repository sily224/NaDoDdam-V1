import styled from 'styled-components';
import React, { useState, useEffect } from 'react';


const PageWrapper = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
	margin-top: 10px;
`;
const PageBtn = styled.button``;


const Pagination = ( {limit, length, perpage, page, setPage, first,setFirst, last, setLast ,fetchData}) => {

	let pageCount = Math.ceil(limit / perpage);

    if (length/perpage > pageCount){
        pageCount = (length/perpage)-pageCount;
    }

    const pageNum = () =>{
        let pageList = [];
        
        console.log(first,last);
        for (let i = first; i <= last; i++) {
            pageList.push(
                <PageBtn
                    key={i + 1}
                    onClick={() => setPage(i)}
                >
                {i}
                </PageBtn>
            );
        }
        return pageList;
    };

    useEffect(()=>{
        setLast( first + pageCount - 1);
    },[first,last,pageCount]);

    const handlePrevPage = () =>{
        setFirst(last - pageCount +1);
        setLast( first + pageCount - 1);
        fetchData();
    }
    const handleNextPage = () =>{
        setFirst(last+1);   
        setPage(page+1);
        fetchData();
    }

	return (
		<>
			<PageWrapper>
                <PageBtn onClick={() => handlePrevPage()}  disabled={page < pageCount+1}>
					{'<<'}
				</PageBtn>
				<PageBtn onClick={() => setPage(page - 1)} disabled={page===first}>
					&lt;
				</PageBtn>

				{
                    pageNum()
				}

				<PageBtn onClick={() => setPage(page + 1)} disabled={page === last}>
					&gt;
				</PageBtn>
                <PageBtn onClick={() => handleNextPage()} >
					{'>>'}
				</PageBtn>
			</PageWrapper>
		</>
	);
}

export default Pagination;
