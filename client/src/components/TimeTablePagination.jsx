import styled from 'styled-components';
import React, { useState, useEffect } from 'react';

const PageWrapper = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
	margin-top: 10px;
`;
const PageBtn = styled.button``;

const Pagination = ( {pageCount, pageGroup, setPageGroup, timeTable, perpage, page, setPage, first, setFirst, last, setLast , lastId, setLastId}) => {
    const current = Math.ceil(timeTable.length/perpage) + pageCount * pageGroup; 
    
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

    const handlePrevPage = () =>{
        setFirst((last-1) -pageGroup *pageCount); 
        setPageGroup(pageGroup - 1);
    }

    const handleNextPage = () =>{
        setFirst(last + 1);  
        setPageGroup(pageGroup + 1);

        if( lastId.filter( id => id >= timeTable[timeTable.length -1].id).length == 0 ){
            setLastId([...lastId, timeTable[timeTable.length -1].id]);
        }
    }

    useEffect(()=>{
        if (current < last){
            setLast(current);
        }
    },[current])

    useEffect(()=>{
        setLast((pageGroup + 1)*pageCount); 
    },[first,pageGroup]);

    useEffect(()=>{
        setPage(pageGroup * pageCount + 1);
    },[pageGroup]);

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
                <PageBtn onClick={() => handleNextPage()} disabled={last < (pageGroup+1) * pageCount}>
					{'>>'}
				</PageBtn>
			</PageWrapper>
		</>
	);
}

export default Pagination;
