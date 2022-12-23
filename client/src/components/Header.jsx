import { Link, useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { AiOutlineSearch } from 'react-icons/ai';
import { HiUserCircle, HiMenu } from 'react-icons/hi';
import { useSelector, useDispatch } from 'react-redux';
import { showLogin, showRegister } from '../store/ModalSlice';
import { getToken, getUserType,logout } from '../utils/utils';
import Selector from './Selector';
import TableDatePicker from './DatePicker';
import Logo from '../assets/logo.png';
import { reset } from '../store/OptionSlice';

const StyledHeader = styled.header`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1.2% 5%;
	box-sizing: border-box;
	border-bottom: 1px solid lightgray;
`;

const StyledSearchBar = styled.div`
	border-radius: 20px;
	height: 40px;
	width: 25%;
	position: relative;
	border: 1px solid #c3c2c2;
	cursor: pointer;

	> svg {
		position: absolute;
		top: 6px;
		right: 5px;
	}

	${(props) =>
		props.toggle &&
		css`
			display: none;
		`}
`;

const ActiveSearchBar = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
	width: 40%;
	position: relative;

	button {
		border: 0;
		cursor: pointer;
		background-color: white;
		margin: 0 40px;
		font-size: 30px;

		&:hover {
			text-decoration: underline;
		}
	}

	& > div {
		display: flex;
		justify-content: space-around;
		width: 100%;
	}
`;

const SearchOption = styled.div`
	display: flex;
	align-items: center;
	margin-top: 20px;
	border: 1px solid black;
	border-radius: 20px;
	height: 60px;

	& > div {
		display: flex;
		align-items: center;
		border-radius: 20px;
		height: 100%;
		z-index: 9999;
	}

	& > div:hover {
		cursor: pointer;
		background-color: lightgray;
	}
`;

const SearchMenu = ({ children }) => {
	return <SearchContainer>{children}</SearchContainer>;
};

const SearchContainer = styled.div`
	position: absolute;
	border: 1px solid black;
	background-color: white;
	top: 150px;
	z-index: 9999;
`;

const StyledNav = styled.div`
	border-radius: 20px;
	border: 1px solid #c3c2c2;
	padding: 3px;
	${(props) =>
		props.toggle &&
		css`
			box-shadow: 0 2px 4px rgba(0, 0, 0, 0.18);
			transition: box-shadow 0.2s ease;
		`}
	button {
		border: none;
		background: transparent;
		display: flex;
		align-items: center;
	}

	svg + svg {
		padding-left: 3px;
	}
`;

const StyledMenu = styled.div`
	display: none;
	${(props) =>
		props.toggle &&
		css`
			display: block;
		`}
	position: absolute;
	top: 10%;
	right: 5%;
	background: #fff;
	border-radius: 10px;
	box-shadow: -1px -1px 10px rgba(0, 0, 0, 0.18);
	border: 1px solid rgba(0, 0, 0, 0.18);
	width: 20%;
	padding: 1% 0;
	box-sizing: border-box;
	z-index: 2;
`;
const StyledLink = styled(Link)`
	padding: 5%;

	&:hover {
		background: lightgray;
	}
`;

const StyledBtnWrapper = styled.div`
	display: flex;
	flex-direction: column;
`;
const StyledBtn = styled.button`
	background: none;
	border: none;
	padding: 5%;
	font-size: 1rem;
	width: 100%;
	text-align: left;

	&:hover {
		background: lightgray;
	}
`;

const StyledLogout = styled.div`
	&::before {
		content: '';
		display: block;
		height: 1px;
		width: 100%;
		background: lightgray;
		margin: 5px 0px;
	}
`;
const LogoContainer = styled.div`
	cursor: pointer;
`;
const LogoName = styled.span`
	vertical-align: middle;
`;
const LogoImg = styled.img`
	width: 4rem;
	height: 3rem;
`;
const beforeLoginList = [
	{
		id: 1,
		name: '로그인',
		path: '/login',
	},
	{
		id: 2,
		name: '회원가입',
		path: '/register',
	},
];

const afterLoginList = [
	{
		id: 3,
		name: '내정보관리',
		path: '/mypage',
	},
	{
		id: 4,
		name: '예약조회',
		path: '/register',
	},
	{
		id: 5,
		name: '나의후기',
		path: '/register',
	},
	{
		id: 6,
		name: '찜목록',
		path: '/favorite',
	},
];

const farmerLoginList = [
	{
		id: 7,
		name: '농장정보관리',
		path: '/farm',
	},
	{
		id: 8,
		name: '체험시간표관리',
		path: '/farm/timetable',
	},
	{
		id: 9,
		name: '예약관리',
		path: '/farm/reservation',
	},
	{
		id: 10,
		name: '후기 관리',
		path: '/farm',
	},
];

const Header = ({ setLoginIsOpen, setRegisterIsOpen }) => {
	const loginModalState = useSelector((state) => state.modal.loginModal);
	const optionState = useSelector((state) => state.option);
	const dispatch = useDispatch();

	const [isOpenSearchBar, setIsOpenSearchBar] = useState(false); // 검색 바 상태
	const [searchOption, setSearchOption] = useState('location'); // 지역, 과일 선택
	const [option, setOption] = useState(null); // 검색 세부 옵션

	const [toggleMenu, setToggleMenu] = useState(false);
	const token = getToken();
	const userType = getUserType();
	const navigate = useNavigate();
	const params = useParams();
	const ref = useRef();

	const searchRef = useRef(); // 검색 바 참조

	const handleToggleMenu = () => {
		setToggleMenu((prev) => !prev);
	};

	const handleClickOutSide = (e) => {
		if (toggleMenu && !ref.current.contains(e.target)) {
			setToggleMenu(false);
		}
		if (isOpenSearchBar && !searchRef.current.contains(e.target)) {
			setIsOpenSearchBar(false); // 검색 바 원복
			setOption(false); // 검색 세부 옵션 원복
		}
	};

	useEffect(() => {
		if (toggleMenu) document.addEventListener('mousedown', handleClickOutSide);
		if (isOpenSearchBar)
			document.addEventListener('mousedown', handleClickOutSide); // 이벤트 등록
		return () => {
			document.removeEventListener('mousedown', handleClickOutSide); // 이벤트 제거
		};
	});

	useEffect(() => {
		setToggleMenu(false);
	}, [params]);

	const handleSearchBar = () => {
		// 검색 바 핸들러
		if (!isOpenSearchBar) setIsOpenSearchBar(true);
	};

	const handleSearchOption = (e) => {
		// 검색 옵션 핸들러
		setSearchOption(e.target.name);
		dispatch(reset());
	};

	const handleSearchMenu = (e) => {
		// 검색 세부 옵션 핸들러
		setOption(e.target.id);
	};

	return (
		<StyledHeader>
			<LogoContainer onClick={()=>navigate('/')}>
				<LogoImg src={Logo} alt="logo"/>
				<LogoName>나도 땀</LogoName>
			</LogoContainer>
			{isOpenSearchBar && (
				<ActiveSearchBar toggle={isOpenSearchBar} ref={searchRef}>
					<div>
						<button name="location" onClick={(e) => handleSearchOption(e)}>
							지역
						</button>
						<button name="fruit" onClick={(e) => handleSearchOption(e)}>
							과일
						</button>
					</div>
					<SearchOption>
						{searchOption === 'location' ? (
							<div id="location" onClick={(e) => handleSearchMenu(e)}>
								장소
							</div>
						) : (
							<div id="fruit" onClick={(e) => handleSearchMenu(e)}>
								과일
							</div>
						)}
						<div id="date" onClick={(e) => handleSearchMenu(e)}>
							날짜
						</div>
					</SearchOption>
					{(option === 'location' && searchOption === 'location' && (
						<SearchMenu children={<Selector searchType={option} />} />
					)) ||
						(option === 'date' && (
							<SearchMenu children={<TableDatePicker />} />
						)) ||
						(option === 'fruit' && searchOption === 'fruit' && (
							<SearchMenu children={<Selector searchType={option} />} />
						))}
				</ActiveSearchBar>
			)}
			<StyledSearchBar toggle={isOpenSearchBar} onClick={handleSearchBar}>
				<AiOutlineSearch size={25} />
			</StyledSearchBar>

			<div ref={ref}>
				<StyledNav toggle={toggleMenu} ref={ref}>
					<button onClick={() => setToggleMenu((prev) => !prev)}>
						<HiMenu size={25} />
						<HiUserCircle size={30} />
					</button>
				</StyledNav>
				<StyledMenu toggle={toggleMenu} ref={ref}>
					{token === null ? (
						<StyledBtnWrapper>
							<StyledBtn
								onClick={() => {
									dispatch(showLogin());
									setToggleMenu(false);
								}}
							>
								로그인
							</StyledBtn>
							<StyledBtn
								onClick={() => {
									dispatch(showRegister());
									setToggleMenu(false);
								}}
							>
								회원가입
							</StyledBtn>
						</StyledBtnWrapper>
					) : (userType==="farmer" ? (
						<div>
							{farmerLoginList.map((item) => (
								<StyledLink to={item.path} key={item.id}>
									{item.name}
								</StyledLink>
							))}
							<StyledLogout>
								<StyledBtn
									onClick={() => {
										setToggleMenu(false);
										logout();
									}}
								>
									로그아웃
								</StyledBtn>
							</StyledLogout>
						</div>
						
						):(
						<div>
							{afterLoginList.map((item) => (
								<StyledLink to={item.path} key={item.id}>
									{item.name}
								</StyledLink>
							))}
							<StyledLogout>
								<StyledBtn
									onClick={() => {
										setToggleMenu(false);
										logout();
									}}
								>
									로그아웃
								</StyledBtn>
							</StyledLogout>
						</div>
					))}
				</StyledMenu>
			</div>
		</StyledHeader>
	);
};

export default React.memo(Header);
