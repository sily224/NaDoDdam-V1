import {Link} from 'react-router-dom';
import styled from 'styled-components';


const Container = styled.div`
    display: flex;
`;
const Content = styled.div`
    flex: 5;
`;
const FarmNav = styled.div`
    flex: 1;
    justify-content: flex-start;
`;
const H1 = styled.h1`
    margin-bottom : 35%;
`
const FarmFormat = ({children}) =>{
    return (
        <Container>
            <FarmNav>
                <H1>농장관리</H1>    
                <nav>       
                    <h2><Link to='/farm'>농장정보 관리</Link></h2>
                    <h2><Link to='/farm/timetable'>체험시간표 관리</Link></h2>
                    <h2><Link to='/farm/reservation'>예약관리</Link></h2>
                    <h2><Link to='/farm/review'>후기관리</Link></h2>
                </nav>
            </FarmNav>
            <Content>{children}</Content>
        </Container>
    )
}

export default FarmFormat;