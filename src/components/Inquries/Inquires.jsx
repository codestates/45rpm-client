import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showModal, closeModal, inquiryModal } from '../../modules/modal';
import { questionAddReq, questionListReq } from '../../modules/question';
// import ReactHtmlParser from 'react-html-parser';
import InquiryModal from '../auth/InquiryModal';
import { InquiryDataList } from '../data/InquiryData';
import CommonTable from '../table/CommonTable';
import InquiryTable from './InquiryTable';
import styled from 'styled-components';

const Inquires = () => {
  const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
  `;

  const HeaderWrapper = styled.div`
    display: flex;
    width: inherit;
    height: inherit;
  `;

  const InquiryIntro = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: inherit;
    height: inherit;
    font-size: 2.5rem;
    background: lightgray;

    @media screen and (max-width: 768px) {
      font-size: 2rem;
      padding-top: 1rem;
      width: inherit;
      height: inherit;
    }
  `;

  const ButtonWrapper = styled.div`
    width: inherit;
    height: inherit;

    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 1.5rem;
  `;

  const Button = styled.button`
    width: calc(15vw + 6px);
    height: calc(5vw + 6px);
    margin-top: 3rem;
    font-size: 1.5rem;
    font-family: 'Jua', sans-serif;
    outline: none;
    background-color: #eee;
    cursor: pointer;
    &:hover {
      background-color: #ddd;
      transition: all ease 0.4s;
      border: none;
    }

    @media screen and (max-width: 768px) {
      width: calc(20vw + 6px);
      height: calc(7vw + 6px);
      font-size: 1rem;
      margin-top: 3rem;
    }
  `;
  const dispatch = useDispatch();
  const [dataGroup, setDataGroup] = useState([]);
  const { checkModal, token, questionList, isType } = useSelector(
    ({ modal, user, question }) => ({
      checkModal: modal.checkModal,
      isType: modal.isType,
      token: user.token,
      questionList: question.questionList,
    }),
  );

  const [lnquireList, setLnquireList] = useState([{}]);

  const openModal = () => {
    dispatch(showModal());
  };
  const shutModal = () => {
    dispatch(closeModal());
  };

  const openInquiryModal = () => {
    dispatch(inquiryModal());
  };

  useEffect(() => {
    setDataGroup(InquiryDataList);
  }, [dataGroup]);

  useEffect(() => {
    dispatch(questionListReq(token));
  }, [checkModal, dispatch]);

  useEffect(() => {
    if (questionList) {
      setLnquireList(questionList);
    }

    console.log('문의 리스트', lnquireList);
  }, [dataGroup]);

  // console.log('되냐', questionList);

  const onSubmitHand = (data, category) => {
    const { title, content } = data;
    console.log('split이니?', title, content);
    const data1 = content.split('<p>')[1];
    const contents = data1.split('</p>')[0];
    dispatch(questionAddReq(title, contents, category.value, token));
  };

  const handleRemove = (id) => {
    setDataGroup(dataGroup.filter((el) => el.id !== id));
    dataGroup.length -= 1;
  };
  return (
    <Container>
      <HeaderWrapper>
        <InquiryIntro>문의 목록</InquiryIntro>
      </HeaderWrapper>
      <CommonTable
        headersName={[
          '글 번호',
          '카테고리',
          '제목',
          '답변 상태',
          '등록일',
          '관리',
        ]}
      >
        <InquiryTable dataGroup={dataGroup} handleRemove={handleRemove} />
      </CommonTable>
      <ButtonWrapper>
        <Button onClick={openInquiryModal}>문의하기</Button>
      </ButtonWrapper>
      {isType === 'inquiry' && (
        <InquiryModal
          open={checkModal}
          close={shutModal}
          onSubmitHand={onSubmitHand}
        ></InquiryModal>
      )}
    </Container>
  );
};

export default Inquires;
