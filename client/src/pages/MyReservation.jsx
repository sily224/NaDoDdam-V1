import styled from "styled-components";
import { useState } from 'react';
import { useEffect } from 'react';
import MyReservationEdit from "../components/MyReservationEdit";
import { getToken } from '../utils/utils';
import * as userApi from "../lib/userApi";


const MyReservation = () => {
  return (
      <MyReservationEdit/>
    )
}

export default MyReservation;