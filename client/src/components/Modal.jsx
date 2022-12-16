<<<<<<< HEAD
import React, { Children, useState, useEffect, useRef } from "react";
=======
import React, { Children, useState } from "react";
>>>>>>> 6ab9594a01e054a966bb724b0e69b7b5384baf0c
import styled from "styled-components";
// 아이콘 추가
import { IoClose } from "react-icons/io5";

const ModalContainer = styled.div`
  position: fixed;
  z-index: 60;
  top: 50%;
  left: 50%;
  width: 50%;
  height: 70%;
  transform: translate(-50%, -50%);
<<<<<<< HEAD
  background-color: #f9d762;
=======
  background-color: #lightgray;
>>>>>>> 6ab9594a01e054a966bb724b0e69b7b5384baf0c
  border: solid 1px;
  padding: 3% 5%;
  box-sizing: border-box;
  overflow: hidden;
`;

const DialogBox = styled.div``;

const FormContainer = styled.div``;

const CloseButton = styled.button`
  position: absolute;
  right: 3%;
  top: 5%;
  border: none;
  background-color: inherit;
  font-size: 1rem;
  cursor: pointer;
`;

<<<<<<< HEAD
function Modal({ children, setModalOpen }) {
  let modalBox = useRef();

  // 모달창 바깥 클릭하면 닫힘
  useEffect(() => {
    window.addEventListener("click", handleModalCloseOutside);
    return () => {
      window.removeEventListener("click", handleModalCloseOutside);
    };
  }, []);

  const handleModalCloseOutside = (e) => {
    if (!modalBox.current || !modalBox.current.contains(e.target))
      setModalOpen(false);
  };

  // x 클릭했을 때 모달 닫힘
=======
function Modal({ children , setModalOpen }) {

>>>>>>> 6ab9594a01e054a966bb724b0e69b7b5384baf0c
  const handleModalClose = () => {
    setModalOpen(false);
  };
  return (
<<<<<<< HEAD
    <ModalContainer ref={modalBox}>
=======
    <ModalContainer>
>>>>>>> 6ab9594a01e054a966bb724b0e69b7b5384baf0c
      <DialogBox>
        <CloseButton onClick={handleModalClose}>
          <IoClose size={25} />
        </CloseButton>
        <FormContainer>{children}</FormContainer>
      </DialogBox>
    </ModalContainer>
  );
}

export default Modal;
