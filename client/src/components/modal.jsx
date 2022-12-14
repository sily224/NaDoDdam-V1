import React, { Children, useState } from "react";
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
  background-color: yellow;
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

const handleModalClose = () => {
  console.log("닫기 누름");
};

function Modal({ children }) {
  const [modalState, setModalState] = useState(true);

  if (modalState) {
    return (
      <ModalContainer>
        <DialogBox>
          <CloseButton onClick={handleModalClose}>
            <IoClose size={25} />
          </CloseButton>
          <FormContainer>{children}</FormContainer>
        </DialogBox>
      </ModalContainer>
    );
  }
}

export default Modal;
