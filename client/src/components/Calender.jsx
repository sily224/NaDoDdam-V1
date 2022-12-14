import styled from 'styled-components';
const prevCalendar = ()=>{
    const today = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
    buildCalendar();
};
const nextCalendar = ()=> {

};
const buildCalendar = ()=> {

}

const day = () =>{
    const days = ["일","월","화","수","목","금","토"];
    return days.map( d => <Day key={`${d}`}>{d}</Day>)
}
const Calender = ()=>{
    
    return (
        <div>
            <table id="calendar">
                <tbody>
                    <tr>
                        <td><label onClick={prevCalendar}>{'<'}</label></td>
                        <td align="center" id="tbCalendarYM" colSpan="5">yyyy년 m월</td>
                        <td><label onClick={nextCalendar}>{'>'}</label></td>
                    </tr>
                    <tr>
                        {day()}
                    </tr> 
                </tbody>
            </table>
        </div>
    );
}

const Day = styled.td`
    text-align:center;
`;

export default Calender;