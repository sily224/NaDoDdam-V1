import { FarmList } from '../components/ItemList';
import React, { useState, useEffect, useCallback } from 'react';

import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { IoConstructOutline } from 'react-icons/io5';

const getFavorite = async () => {
	const token = localStorage.getItem('token');
	const header = {
		headers: {
			authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
	};

	const result = await axios
		.get('http://localhost:3500/api/like', header)
		.then((res) => res.data)
		.then((data) => {
			return data.map((x) => x.id);
		});

	return result;
};

const Home = React.memo(() => {
	const option = useSelector((state) => state.option.search);
	const [favorite, setFavorite] = useState([]); // 찜 목록 상태
	const setInitialFavorite = async () => {
		const data = await getFavorite(); // 찜 목록 가져오기

		setFavorite(data);
	};

	// DB에서 찜 목록 가져오기
	useEffect(() => {
		if (localStorage.getItem('token')) setInitialFavorite(); // 찜 목록 초기화
	}, []);

	useEffect(() => {
		console.log('찜 목록 상태 변화', favorite); // 찜 목록 변화 시 출력
	}, [favorite]);

	const [contents, setContents] = useState([]);
	const [page, setPage] = useState(0);
  const length = 10;
  const last = length*(page+1);
  let toggle = true;

	// 최초 렌더링 시 전체 데이터 조회
	useEffect(() => {
		setPage(0);
    setContents([]);
    console.log(option);
		getFarmData(option, last);
    setPage(1);
	}, [option]);

	const getFarmData = useCallback(
		async ({ location, fruit }, last) => {

      console.log(location, fruit)

			const header = {
				headers: {
					'Content-Type':'application/json;charset=UTF-8',
				},
        params:{'location':location}
			};

			let url = `http://localhost:3500/api/farms?limit=${last}`; // default 전체 조회

			if (location) {
				url = `http://localhost:3500/api/farms`; // 지역 조회
			} else if (fruit) {
				url = `http://localhost:3500/api/farms`; // 과일 조회
			}

			console.log(url);
			await axios.get(url, {
        headers: {
					'Content-Type':'application/json;charset=UTF-8',
        },
        params: {
          location:location, type:fruit
        }
      })
				.then((res) => {
					const data = res.data;
          console.log('page =', page);
          const d = data.slice(length*page, length*(page+1));
          console.log('배열 길이', d.length);
					console.log('가져온 데이터', data.slice(length*page, length*(page+1)));
          if (d.length === 0) {
            console.log('데이터 없다.');
            toggle = false;
            return;
          }
          setContents(contents.concat(d));
          setPage(page + 1);
				});
		},
	);

	//   const getData = useCallback( async (options) => {
	// // /api/farm/location?address/:page
	//     const optionKey = Object.keys(options);

	//     if (optionKey.includes('location')) {
	//       const location = options.location;

	//       await axios.get(`/api/farm/location?search=${location}/${page}`)
	//       .then(res=>res.data)
	//       .then(async data=>{
	//         setContents(contents.concat(data));
	//         setPage(page + 1);

	//       });

	//     } else{
	//       console.log('전체 조회 api 실행');
	//       await axios.get(`/api/farms/${page}`).then(res=>{
	//         return res.data;
	//       }).then(data=>{

	//         setContents(contents.concat(data));
	//         setPage(page + 1);

	//         return data;
	//       })
	//     }
	//   });

	return (
		// <FarmList contents={contents}/>
		<InfiniteScroll
			dataLength={contents.length}
			next={() => {
        if (toggle) getFarmData(option, last);
			}}
			hasMore={true}
			scrollThreshold="1000px"
		>
			<FarmList
				contents={contents}
				favorite={favorite}
				setFavorite={setFavorite}
			/>
		</InfiniteScroll>
		// <FarmList contents={contents} favorite={favorite} setFavorite={setFavorite}/>
	);
});

export default Home;
