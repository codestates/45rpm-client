import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  closeModal,
  inquiryModal,
  alertAnswerTrueModal,
} from '../../modules/modal';
import {
  questionAddReq,
  questionListReq,
  questionDeleteReq,
} from '../../modules/question';
import InquiryModal from '../auth/InquiryModal';
import CommonTable from '../table/CommonTable';
import InquiryTable from './InquiryTable';
import styled from 'styled-components';
import AlertModal from '../../components/common/AlertModal';
import palette from '../../lib/styles/palette';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 94.9vh;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    border-radius: 6px;
    background: #ffffff;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 6px;
  }
`;
const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${palette.side};
  border: 1px solid ${palette.mainBorder};
  width: 70%;
  padding: 3rem 0rem 1rem 0rem;
  margin-top: 3rem;
  .small {
    font-size: 1rem;
    padding-top: 1rem;
    font-family: 'Noto Sans KR', sans-serif;
    font-weight: 700;
    color: ${palette.sideBack};
  }
  @media screen and (max-width: 768px) {
    padding: 7rem 0;
    margin-top: 2rem;
    width: 90%;
    height: 10%;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding-right: 2rem;
  button {
    cursor: pointer;
    height: 3rem;
    width: 10rem;
    border-radius: 3px;
    border: 0;
    outline: 0;
    background-color: ${palette.mainHover};
    color: #e1eaf8;
    font-size: 1rem;
    &:hover {
      background-color: ${palette.mainHover};
      transition: all ease 0.3s;
      color: gray;
    }
  }
  @media screen and (max-width: 768px) {
    padding-right: 1rem;
    padding-top: 1rem;
  }
`;

const Button = styled.button`
  width: calc(10vw + 6px);
  height: calc(3vw + 6px);
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
    width: calc(18vw + 6px);
    height: calc(5vw + 6px);
    font-size: 1rem;
  }
`;

const InquiryIntro = styled.div`
  font-size: 2rem;
  padding-bottom: 5px;
  background: ${palette.side};
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 700;
  color: ${palette.sideBack};

  @media screen and (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const Inquires = () => {
  const dispatch = useDispatch();
  const { checkModal, token, questionList, isType, alertCheck, admin } =
    useSelector(({ modal, user, question }) => ({
      checkModal: modal.checkModal,
      isType: modal.isType,
      alertCheck: modal.alertCheck,
      token: user.token,
      questionList: question.questionList,
      admin: user.admin,
    }));

  useEffect(() => {
    dispatch(questionListReq(token));
  }, [token, dispatch]);

  useEffect(() => {
    if (questionList) {
      setLnquireList(questionList);
    }
  }, [questionList]);

  const [lnquireList, setLnquireList] = useState({ data: [{}] });

  const shutModal = () => {
    dispatch(closeModal());
  };

  const openInquiryModal = () => {
    if (admin) {
      dispatch(alertAnswerTrueModal());
    }
    if (!admin) {
      dispatch(inquiryModal());
    }
  };

  const onSubmitHand = (data, category) => {
    const { title, content } = data;
    const content1 = content.replace('<p>', '');
    const contents = content1.replace('</p>', '');
    dispatch(questionAddReq(title, contents, category.value, token));
    shutModal();
  };

  const handleRemove = (data) => {
    dispatch(questionDeleteReq(token, data));
    const newList = lnquireList.data.filter((el) => el._id !== data);
    setLnquireList({ data: newList });
  };

  return (
    <Container>
      <HeaderWrapper>
        <InquiryIntro>??????????????? ???????????? ??????????</InquiryIntro>
        <InquiryIntro className="small">
          45rpm??? ???????????? ????????? ??????????????? 24???????????? ??????????????????
        </InquiryIntro>
        <InquiryIntro className="small">
          ????????? ????????? ??????????????? ????????? ??? ????????????
        </InquiryIntro>
        <ButtonWrapper>
          <Button onClick={openInquiryModal}>????????????</Button>
        </ButtonWrapper>
      </HeaderWrapper>
      <CommonTable
        headersName={[
          '?????????',
          '????????????',
          '??????',
          '?????? ??????',
          '?????????',
          '??????',
        ]}
      >
        <InquiryTable lnquireList={lnquireList} handleRemove={handleRemove} />
      </CommonTable>
      {isType === 'alertAnswer' && (
        <AlertModal
          openHandle={alertCheck}
          closeHandle={shutModal}
          comment={'????????? ????????? ???????????????.'}
        />
      )}
      {isType === 'alertAnswerFalse' && (
        <AlertModal
          openHandle={alertCheck}
          closeHandle={shutModal}
          comment={'????????????, ?????? ????????? ???????????????.'}
        />
      )}
      {isType === 'alertAnswerTrue' && (
        <AlertModal
          openHandle={alertCheck}
          closeHandle={shutModal}
          comment={'???????????? ????????? ????????? ??? ????????????.'}
        />
      )}
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
