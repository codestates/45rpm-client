import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ModalBack, ModalBox } from '../common/ModalStyle';
import styled from 'styled-components';
import { loginReq, resetLoginMsg } from '../../modules/auth';
import { loginUser, checkUser } from '../../modules/user';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { alertLoginModal } from '../../modules/modal';
import { GrFormClose } from 'react-icons/gr';

const LoginWrapper = styled.div`
  z-index: 2;
  display: flex;
  flex-direction: column;

  h2 {
    color: #191919;
    font-weight: 700;
    font-size: 2.1rem;
    text-align: center;
    margin-bottom: 2.6rem;
  }
  ul {
    padding: 0;
  }
  li {
    list-style: none;
    margin-bottom: 0.5rem;
  }
  .deny-message {
    width: 230px;
    height: 12px;
    font-size: 15px;
    font-weight: 500;
    margin-bottom: 1.6rem;
    margin-top: 1.5rem;
    color: #f73d5c;
    word-break: keep-all;
  }
`;

const LoginLabel = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #707174;
  div {
    margin-bottom: 8px;
    padding-top: 10px;
  }
`;

const LoginInput = styled.input`
  height: 1.6rem;
  width: 21rem;
  padding: 1.4rem;
  border: 1px solid #9b9b9c;
  border-radius: 3px;
  font-size: 15.5px;
  font-weight: 500;
  color: #5f6063;
  &:focus {
    outline: none;
    border: 1px solid #313899;
    transition: all ease 0.3s;
  }
`;

const LoginCloseBtn = styled.button`
  cursor: pointer;
  position: relative;
  top: -1.4rem;
  left: 16rem;
  background: white;
  border: 0;
  outline: 0;
  font-weight: 700;
  font-size: 2.4rem;
  &:hover {
    color: #f73d5c;
    transition: all ease 0.2s;
  }
`;

const LoginSubmitBtn = styled.button`
  cursor: pointer;
  height: 3rem;
  width: 21rem;
  border-radius: 3px;
  border: 0;
  outline: 0;
  margin: 1.5rem 0rem;
  background-color: #311788;
  color: #fff;
  font-size: 1.1rem;
  font-weight: 500;
  &:hover {
    background-color: #03154e;
    transition: all ease 0.3s;
  }
`;

const LoginSocialBtn = styled.button`
  cursor: pointer;
  height: 3rem;
  width: 21rem;
  border: 0;
  outline: 0;
  border-radius: 3px;
  font-size: 1.1rem;
  font-weight: 600;
  background-color: #e8e8e8;
  margin-top: 0.5rem;

  &:hover {
    background-color: #b6b3b3;
    transition: all ease 0.3s;
  }

  & + & {
    margin-top: 0.5rem;
    margin-bottom: 4rem;
  }
`;

const LoginModal = ({
  open,
  close,
  history,
  kakaoLoginHandler,
  googleLoginHandler,
}) => {
  const dispatch = useDispatch();
  const { login, loginError } = useSelector(({ auth }) => ({
    login: auth.login,
    loginError: auth.loginError,
  }));

  const [animate, setAnimate] = useState(false);
  const [localVisible, setLocalVisible] = useState(open);

  const refID = useRef(null);
  const refPassword = useRef(null);

  const [inputID, setInputID] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [denyMessage, setDenyMessage] = useState('');

  useEffect(() => {
    if (loginError) {
      if (loginError === 'There is no user information') {
        refID.current.focus();
        setDenyMessage('해당 유저가 존재하지 않습니다.');
        return;
      }
      if (loginError === 'You wrote wrong password') {
        refPassword.current.focus();
        setDenyMessage('비밀번호를 확인해주세요.');
        return;
      }
    }
    if (login) {
      const token = document.cookie.split('=')[1];
      const payload = {
        id: login.data.id,
        email: login.data.email,
        username: login.data.username,
        token: token,
      };
      try {
        sessionStorage.setItem('id', payload.id);
      } catch (e) {
        console.log('sessionStorage is not working');
      }
      dispatch(loginUser(payload));
      dispatch(checkUser(payload.id, payload.token));
      history.push('/');
      dispatch(alertLoginModal());
      handleCloseModal();
    }
  }, [login, loginError, dispatch]);

  useEffect(() => {
    refID.current.focus();
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        handleCloseBtn();
      }
    });
  }, [open]);

  const handleMoveToPassword = (e) => {
    if (e.key === 'Enter') {
      refPassword.current.focus();
    }
  };

  const handleMoveToSignIn = (e) => {
    if (e.key === 'Enter') {
      handleSignIn();
    }
  };

  const handleCloseBtn = () => {
    setInputID('');
    setInputPassword('');
    setDenyMessage('');
    close();
  };

  const handleCloseModal = () => {
    setInputID('');
    setInputPassword('');
    setDenyMessage('');
  };

  const handleInputID = useCallback(
    (e) => {
      setInputID(e.target.value);
    },
    [inputID],
  );

  const handleInputPassword = useCallback(
    (e) => {
      setInputPassword(e.target.value);
    },
    [inputPassword],
  );

  useEffect(() => {
    if (localVisible && !open) {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 250);
    }
    setLocalVisible(open);
  }, [localVisible, open]);

  if (!animate && !localVisible) return null;

  const handleSignIn = () => {
    dispatch(resetLoginMsg());
    if (inputID === '') {
      refID.current?.focus();
      setDenyMessage('이메일을 입력하세요');
      return;
    }
    if (inputPassword === '') {
      refPassword.current?.focus();
      setDenyMessage('비밀번호를 입력하세요');
      return;
    }
    dispatch(loginReq(inputID, inputPassword));
  };

  return (
    <>
      <ModalBack disappear={!open}>
        <div className="modal_outsider" onClick={(close, handleCloseBtn)}></div>
        <ModalBox disappear={!open}>
          <LoginCloseBtn onClick={(close, handleCloseBtn)}>
            <GrFormClose />
          </LoginCloseBtn>
          <LoginWrapper>
            <h2> 로그인 </h2>
            <ul>
              <li>
                <LoginLabel>
                  <div> ID </div>
                </LoginLabel>
                <LoginInput
                  type="text"
                  value={inputID}
                  onChange={handleInputID}
                  placeholder="ID를 입력해주세요"
                  onKeyPress={handleMoveToPassword}
                  ref={refID}
                />
              </li>
              <li>
                <LoginLabel>
                  <div> 비밀번호 </div>
                </LoginLabel>
                <LoginInput
                  type="password"
                  value={inputPassword}
                  onChange={handleInputPassword}
                  placeholder="Password"
                  onKeyPress={handleMoveToSignIn}
                  ref={refPassword}
                />
              </li>
            </ul>
            <p className="deny-message"> {denyMessage} </p>
            <LoginSubmitBtn onClick={handleSignIn}> 로그인 </LoginSubmitBtn>
            <LoginSocialBtn onClick={googleLoginHandler}> 구글 </LoginSocialBtn>
            <LoginSocialBtn onClick={kakaoLoginHandler}>카카오</LoginSocialBtn>
          </LoginWrapper>
        </ModalBox>
      </ModalBack>
    </>
  );
};

export default withRouter(LoginModal);
