import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ModalBack, ModalBox } from '../common/ModalStyle';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  registerReq,
  resetRegister,
  resetRegisterMsg,
} from '../../modules/auth';
import { alertRegisterModal } from '../../modules/modal';
import { GrFormClose } from 'react-icons/gr';
import palette from '../../lib/styles/palette';

const RegisterWrapper = styled.div`
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;

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
    position: relative;
    list-style: none;
    margin-bottom: 1rem;
  }
  .deny-message {
    width: 275px;
    height: 12px;
    font-size: 15px;
    font-weight: 500;
    margin-bottom: 1rem;
    margin-top: 1rem;
    color: ${palette.mainRed};
    word-break: keep-all;
  }
`;

const RegisterLabel = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #707174;
  div {
    margin-bottom: 8px;
  }
`;

const RegisterInput = styled.input`
  height: 1.6rem;
  width: 21rem;
  padding: 1.4rem;
  border: 1px solid #9b9b9c;
  border-radius: 3px;
  font-size: 15.5px;
  color: #5f6063;
  &:focus {
    outline: none;
    border: 1px solid #313899;
    transition: all ease 0.3s;
  }
`;

const RegisterCloseBtn = styled.button`
  cursor: pointer;
  position: relative;
  top: -1.6rem;
  left: 17rem;
  background: white;
  border: 0;
  outline: 0;
  font-weight: 700;
  font-size: 2.4rem;
  &:hover {
    color: ${palette.mainRed};
    transition: all ease 0.2s;
  }
`;

const RegisterSubmitBtn = styled.button`
  cursor: pointer;
  height: 3rem;
  width: 21rem;
  border-radius: 3px;
  margin-top: 2rem;
  border: 0;
  outline: 0;
  margin-bottom: 2.2rem;
  background-color: ${palette.main};
  color: #fff;
  font-size: 1.1rem;
  font-weight: 400;
  &:hover {
    background-color: ${palette.mainHover};
    transition: all ease 0.3s;
  }
`;

const RegisterModal = ({ open, close, history }) => {
  const dispatch = useDispatch();
  const { register, registerError } = useSelector(({ auth }) => ({
    register: auth.register,
    registerError: auth.registerError,
  }));

  const [animate, setAnimate] = useState(false);
  const [localVisible, setLocalVisible] = useState(open);

  const refID = useRef(null);
  const refEmail = useRef(null);
  const refUsername = useRef(null);
  const refPassword = useRef(null);
  const refPasswordCheck = useRef(null);

  const [inputID, setInputID] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputUsername, setInputUsername] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [inputPasswordCheck, setInputPasswordCheck] = useState('');
  const [denyMessage, setDenyMessage] = useState('');

  useEffect(() => {
    if (registerError) {
      if (
        registerError === 'These ID and Email are already used on other user'
      ) {
        setDenyMessage('ID??? Email??? ?????? ??????????????????.');
        refID.current.focus();
      }
      if (registerError === 'This ID is already used on other user') {
        setDenyMessage('???????????? ID?????????.');
        refID.current.focus();
      }
      if (registerError === 'This Email is already used on other user') {
        setDenyMessage('???????????? Email?????????.');
        refEmail.current.focus();
      }
      return;
    }
    if (register) {
      history.push('/');
      dispatch(resetRegister());
      dispatch(alertRegisterModal());
      handleCloseModal();
    }
  }, [register, registerError]);

  useEffect(() => {
    refID.current.focus();
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        handleCloseBtn();
      }
    });
  }, [open]);

  const handleMoveToEmail = (e) => {
    if (e.key === 'Enter') {
      refEmail.current.focus();
    }
  };

  const handleMoveToUsername = (e) => {
    if (e.key === 'Enter') {
      refUsername.current.focus();
    }
  };

  const handleMoveTopassword = (e) => {
    if (e.key === 'Enter') {
      refPassword.current.focus();
    }
  };

  const handleMoveTopasswordCheck = (e) => {
    if (e.key === 'Enter') {
      refPasswordCheck.current.focus();
    }
  };

  const handleMoveToSignUp = (e) => {
    if (e.key === 'Enter') {
      handleSignup();
    }
  };

  const handleChangeID = useCallback(
    (e) => {
      setInputID(e.target.value);
    },
    [inputID],
  );

  const handleChangeEmail = useCallback(
    (e) => {
      setInputEmail(e.target.value);
    },
    [inputEmail],
  );

  const handleChangeUsername = useCallback(
    (e) => {
      setInputUsername(e.target.value);
    },
    [inputUsername],
  );

  const handleChangePassword = useCallback(
    (e) => {
      setInputPassword(e.target.value);
    },
    [inputPassword],
  );

  const handleChangePasswordCheck = useCallback(
    (e) => {
      setInputPasswordCheck(e.target.value);
    },
    [inputPasswordCheck],
  );

  const handleCloseBtn = () => {
    setInputID('');
    setInputEmail('');
    setInputUsername('');
    setInputPassword('');
    setInputPasswordCheck('');
    setDenyMessage('');
    dispatch(resetRegisterMsg());
    close();
  };

  const handleCloseModal = () => {
    setInputID('');
    setInputEmail('');
    setInputUsername('');
    setInputPassword('');
    setInputPasswordCheck('');
    setDenyMessage('');
    dispatch(resetRegisterMsg());
  };

  const checkValidEmail = useCallback(
    (email) => {
      if (
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          email,
        )
      ) {
        return true;
      }
      setDenyMessage('???????????? ?????? ??????????????????.');
      return false;
    },
    [inputEmail, denyMessage],
  );

  const checkValidPassword = useCallback(
    (password) => {
      if (!/^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{6,20}$/.test(password)) {
        setDenyMessage(
          '????????? + ??????/???????????? ???????????? 8~20????????? ???????????? ?????????.',
        );
        return false;
      }
      const check_num = password.search(/[0-9]/g);
      const check_eng = password.search(/[a-z]/gi);
      if (check_num < 0 || check_eng < 0) {
        setDenyMessage('??????????????? ????????? ???????????? ??????????????? ?????????.');
        return false;
      }
      if (/(\w)\1\1\1/.test(password)) {
        setDenyMessage('??????????????? ?????? ????????? 4??? ?????? ???????????? ??? ????????????.');
        return false;
      }
      return true;
    },
    [inputPassword, denyMessage],
  );

  const handleCheckForm = () => {
    if (inputID === '') {
      refID.current.focus();
      setDenyMessage('ID??? ???????????????');
      return false;
    } else if (inputID.length <= 5) {
      setDenyMessage('ID??? 6?????? ?????? ???????????? ?????????');
      refID.current.focus();
      return false;
    }
    if (inputEmail === '') {
      refEmail.current.focus();
      setDenyMessage('E-mail??? ???????????????');
      return false;
    } else if (!checkValidEmail(inputEmail)) {
      refEmail.current.focus();
      return false;
    }
    if (inputUsername === '') {
      refUsername.current.focus();
      setDenyMessage('???????????? ???????????????');
      return false;
    }
    if (!checkValidPassword(inputPassword)) {
      refPassword.current.focus();
      return false;
    }
    if (inputPassword !== inputPasswordCheck) {
      refPasswordCheck.current.focus();
      setDenyMessage('??????????????? ???????????? ????????????');
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (localVisible && !open) {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 250);
    }
    setLocalVisible(open);
  }, [localVisible, open]);

  if (!animate && !localVisible) return null;

  const handleSignup = () => {
    if (handleCheckForm()) {
      dispatch(registerReq(inputID, inputEmail, inputUsername, inputPassword));
    }
  };

  return (
    <>
      <ModalBack disappear={!open}>
        <div className="modal_outsider" onClick={(close, handleCloseBtn)}></div>
        <ModalBox disappear={!open} register>
          <RegisterCloseBtn onClick={(close, handleCloseBtn)}>
            <GrFormClose />
          </RegisterCloseBtn>
          <RegisterWrapper>
            <h2> ???????????? </h2>
            <ul>
              <li>
                <RegisterLabel>
                  <div> ID </div>
                </RegisterLabel>
                <RegisterInput
                  type="text"
                  value={inputID}
                  onChange={handleChangeID}
                  placeholder="???????????? ID??? ??????????????????."
                  onKeyPress={handleMoveToEmail}
                  ref={refID}
                />
              </li>
              <li>
                <RegisterLabel>
                  <div> E - mail </div>
                </RegisterLabel>
                <RegisterInput
                  type="text"
                  value={inputEmail}
                  onChange={handleChangeEmail}
                  placeholder="E-mail??? ??????????????????."
                  onKeyPress={handleMoveToUsername}
                  ref={refEmail}
                />
              </li>
              <li>
                <RegisterLabel>
                  <div> ?????? </div>
                </RegisterLabel>
                <RegisterInput
                  type="text"
                  value={inputUsername}
                  onChange={handleChangeUsername}
                  placeholder="????????? ??????????????????."
                  onKeyPress={handleMoveTopassword}
                  ref={refUsername}
                />
              </li>
              <li>
                <RegisterLabel>
                  <div> ???????????? </div>
                </RegisterLabel>
                <RegisterInput
                  type="password"
                  value={inputPassword}
                  onChange={handleChangePassword}
                  placeholder="Password"
                  onKeyPress={handleMoveTopasswordCheck}
                  ref={refPassword}
                />
              </li>
              <li>
                <RegisterLabel>
                  <div> ???????????? ?????? </div>
                </RegisterLabel>
                <RegisterInput
                  type="password"
                  value={inputPasswordCheck}
                  onChange={handleChangePasswordCheck}
                  placeholder="Password Check"
                  onKeyPress={handleMoveToSignUp}
                  ref={refPasswordCheck}
                />
              </li>
            </ul>
            <p className="deny-message"> {denyMessage} </p>
            <RegisterSubmitBtn onClick={handleSignup}>
              ????????????
            </RegisterSubmitBtn>
          </RegisterWrapper>
        </ModalBox>
      </ModalBack>
    </>
  );
};

export default withRouter(RegisterModal);
