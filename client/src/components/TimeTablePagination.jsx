import styled from 'styled-components';
import React, { useState, useEffect } from 'react';


const PageWrapper = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
	margin-top: 10px;
`;
const PageBtn = styled.button``;


const Pagination = ( {limit, length, perpage, page, setPage, first,setFirst, last, setLast , setLastId, fetchData}) => {

	let pageCount = Math.ceil(limit / perpage);  
    const current = Math.ceil(length/perpage); 
    const pageGroup = Math.ceil(page / pageCount);

    if (current < pageCount){
        pageCount = current;
    }
    if (current < last){
        last = current;
    }
    
    const pageNum = () =>{
        let pageList = [];
        
        // console.log(first,last);
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
        setLast(pageGroup * pageCount);
    },[first,last,pageCount]);

    const handlePrevPage = () =>{
        console.log(last);
        setFirst(last - pageCount);
        setLast( first + pageCount - 1);
        setPage(last - 1);
        fetchData(pageGroup-2);
    }
    const handleNextPage = () =>{
        setFirst(last+1);   
        setPage(pageGroup * pageCount + 1);
        fetchData(pageGroup);
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
                <PageBtn onClick={() => handleNextPage()} disabled={length < limit}>
					{'>>'}
				</PageBtn>
			</PageWrapper>
		</>
	);
}

export default Pagination;
