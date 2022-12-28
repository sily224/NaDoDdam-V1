import {PageWrapper, PageBtn} from '../styles/Styled'

// memo 지우: total(데이터 총 갯수), limit(한 페이지에 보여줄 갯수)
const Pagination = ({ total, limit, page, setPage }) => {
	const numPages = Math.ceil(total / limit);

	return (
		<>
			<PageWrapper>
				<PageBtn onClick={() => setPage(page - 1)} disabled={page === 1}>
					&lt;
				</PageBtn>
				{Array(numPages)
					.fill()
					.map((_, i) => (
						<PageBtn
							key={i + 1}
							onClick={() => setPage(i + 1)}
							aria-current={page === i + 1 ? 'page' : null}
						>
							{i + 1}
						</PageBtn>
					))}
				<PageBtn onClick={() => setPage(page + 1)} disabled={page === numPages}>
					&gt;
				</PageBtn>
			</PageWrapper>
		</>
	);
};

export default Pagination;
