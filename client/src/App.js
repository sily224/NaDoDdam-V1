import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './pages/Layout';
import Home from './pages/Home';
import Login from './pages/login';
import Register from './pages/register';
import DetailPage from './pages/DetailPage';
import Payment from './pages/Payment';
import { MyPage } from './pages/MyPage';
import Farm from './pages/Farm';
import FarmReservation from './pages/FarmReservation';
import FarmTimeTable from './pages/FarmTimeTable';
import MyReservation from './pages/MyReservation';
import Favorite from './pages/Favorite';
<<<<<<< HEAD
import FarmInfo from './pages/FarmInfo';
=======
import NotFound from './pages/NotFound';

// memo 지우: NonMemberRoute -> 비회원일 때만 페이지 전환
// MemberRoute -> 일반 회원일 때만 페이지 전화
// FarmerRoute -> 농장주일 때만 페이지 전환
import {
	NonMemberRoute,
	MemberRoute,
	FarmerRoute,
} from './components/RestrictionRoute';
>>>>>>> 4640a8a3e64c1b9b1b52b94fae621a22dc33d850

function App() {
	return (
		<div className="App">
			<Routes>
				<Route element={<Layout />}>
					<Route path="/" element={<Home />} />
					<Route
						path="/login"
						element={
							<NonMemberRoute>
								<Login />
							</NonMemberRoute>
						}
					/>
					<Route
						path="/register"
						element={
							<NonMemberRoute>
								<Register />
							</NonMemberRoute>
						}
					/>
					<Route path="/detail/:id" element={<DetailPage />} />
<<<<<<< HEAD
					<Route path="/pay" element={<Payment />} />
					<Route path="/mypage" element={<MyPage />} />
					<Route path="/farm" element={<Farm />} />
					<Route path="/farm/reservation" element={<FarmReservation />} />
					<Route path="/farm/timetable" element={<FarmTimeTable />} />
					<Route path="/myreservation" element={<MyReservation />} />
					<Route path="/farm/farminfo" element={<FarmInfo />} />
					{/* 해당부분에 라우터 넣으면 됩니다. */}
=======
					<Route
						path="/pay"
						element={
							<MemberRoute>
								<Payment />
							</MemberRoute>
						}
					/>
					<Route
						path="/mypage"
						element={
							<MemberRoute>
								<MyPage />
							</MemberRoute>
						}
					/>
					<Route
						path="/myreservation"
						element={
							<MemberRoute>
								<MyReservation />
							</MemberRoute>
						}
					/>
					<Route
						path="/favorite"
						element={
							<MemberRoute>
								<Favorite />
							</MemberRoute>
						}
					/>
					<Route
						path="/farm"
						element={
							<FarmerRoute>
								<Farm />
							</FarmerRoute>
						}
					/>
					<Route
						path="/farm/reservation"
						element={
							<FarmerRoute>
								<FarmReservation />
							</FarmerRoute>
						}
					/>
					<Route
						path="/farm/timetable"
						element={
							<FarmerRoute>
								<FarmTimeTable />
							</FarmerRoute>
						}
					/>
					<Route path="/notfound" element={<NotFound />} />
>>>>>>> 4640a8a3e64c1b9b1b52b94fae621a22dc33d850
				</Route>
			</Routes>
		</div>
	);
}

export default App;
