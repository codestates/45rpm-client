import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ModalBack, ModalBox } from '../common/ModalStyle';
import styled from 'styled-components';

const RegisterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  h2 {
    color: #191919;
    font-weight: 700;
    font-size: 1.4rem;
    text-align: center;
    margin-bottom: 1.2rem;
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
    width: 220px;
    height: 12px;
    font-size: 12px;
    font-weight: 500;
    margin-bottom: 1.2rem;
    color: #f73d5c;
    word-break: keep-all;
  }
`;

const RegisterLabel = styled.label`
  font-size: 12px;
  font-weight: 600;
  color: #707174;
  margin: 0;
  margin-bottom: 4px;
`;

const RegisterInput = styled.input`
  height: 1rem;
  width: 16rem;
  padding: 1rem;
  border: 1px solid #9b9b9c;
  border-radius: 3px;
  font-size: 12px;
  color: #5f6063;
  &:focus {
    outline: none;
    border: 1px solid #f73d5c;
    transition: all ease 0.3s;
  }
`;

const RegisterCloseBtn = styled.button`
  position: relative;
  top: -2rem;
  left: 20rem;
  background: white;
  border: 0;
  outline: 0;
  font-weight: 700;
  font-size: 1rem;
  &:hover {
    color: #f73d5c;
    transition: all ease 0.2s;
  }
`;

const RegisterSubmitBtn = styled.button`
  height: 2.2rem;
  width: 16rem;
  border-radius: 3px;
  margin-top: 2rem;
  border: 0;
  outline: 0;
  margin-bottom: 0.5rem;
  background-color: #f73d5c;
  color: #fff;
  font-size: 0.8rem;
  font-weight: 400;
  &:hover {
    background-color: #b3535b;
    transition: all ease 0.3s;
  }
`;

const RegisterModal = ({ open, close }) => {
  const [animate, setAnimate] = useState(false);
  const [localVisible, setLocalVisible] = useState(open);

  const refEmail = useRef(null);
  const refUsername = useRef(null);
  const refPassword = useRef(null);
  const refPasswordCheck = useRef(null);

  const [inputEmail, setInputEmail] = useState('');
  const [inputUsername, setInputUsername] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [inputPasswordCheck, setInputPasswordCheck] = useState('');
  const [denyMessage, setDenyMessage] = useState('');

  useEffect(() => {
    refEmail.current.focus();
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        handleCloseBtn();
      }
    });
  }, [open]);

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
    setInputEmail('');
    setInputUsername('');
    setInputPassword('');
    setInputPasswordCheck('');
    setDenyMessage('');
    close();
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
      setDenyMessage('유효하지 않은 이메일입니다.');
      return false;
    },
    [inputEmail, denyMessage],
  );

  const checkValidPassword = useCallback(
    (password) => {
      if (!/^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{6,20}$/.test(password)) {
        setDenyMessage(
          '영문자 + 숫자/특수문자 조합으로 8~20자리를 사용해야 합니다.',
        );
        return false;
      }
      const check_num = password.search(/[0-9]/g);
      const check_eng = password.search(/[a-z]/gi);
      if (check_num < 0 || check_eng < 0) {
        setDenyMessage('비밀번호는 숫자와 영문자를 혼용하여야 합니다.');
        return false;
      }
      if (/(\w)\1\1\1/.test(password)) {
        setDenyMessage('비밀번호에 같은 문자를 4번 이상 사용하실 수 없습니다.');
        return false;
      }
      return true;
    },
    [inputPassword, denyMessage],
  );

  const handleCheckForm = () => {
    if (inputEmail === '') {
      refEmail.current.focus();
      setDenyMessage('E-mail을 입력하세요');
      return false;
    } else if (!checkValidEmail(inputEmail)) {
      refEmail.current.focus();
      return false;
    }
    if (inputUsername === '') {
      refUsername.current.focus();
      setDenyMessage('닉네임을 입력하세요');
      return false;
    }
    if (!checkValidPassword(inputPassword)) {
      refPassword.current.focus();
      return false;
    }
    if (inputPassword !== inputPasswordCheck) {
      refPasswordCheck.current.focus();
      setDenyMessage('비밀번호와 일치하지 않습니다');
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
    // 여기서 api 요청 보내야함 !!
    if (handleCheckForm()) {
      alert('요청을 성공적으로 보냈습니다');
    }
  };

  return (
    <>
      <ModalBack disappear={!open}>
        <div className="modal_outsider" onClick={close}></div>
        <ModalBox disappear={!open} register>
          <RegisterCloseBtn onClick={close}>X</RegisterCloseBtn>
          <RegisterWrapper>
            <h2>회원가입</h2>

            <ul>
              <li>
                <RegisterLabel>
                  <div>E-mail</div>
                </RegisterLabel>
                <RegisterInput
                  type="text"
                  value={inputEmail}
                  onChange={handleChangeEmail}
                  placeholder="사용하실 E-mail을 입력해주세요."
                  onKeyPress={handleMoveToUsername}
                  ref={refEmail}
                />
              </li>
              <li>
                <RegisterLabel>
                  <div>닉네임</div>
                </RegisterLabel>
                <RegisterInput
                  type="text"
                  value={inputUsername}
                  onChange={handleChangeUsername}
                  placeholder="사용하실 닉네임을 입력해주세요."
                  onKeyPress={handleMoveTopassword}
                  ref={refUsername}
                />
              </li>
              <li>
                <RegisterLabel>
                  <div>비밀번호</div>
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
                  <div>비밀번호 확인</div>
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
            <p className="deny-message">{denyMessage}</p>
            <RegisterSubmitBtn onClick={handleSignup}>
              회원가입
            </RegisterSubmitBtn>
          </RegisterWrapper>
        </ModalBox>
      </ModalBack>
    </>
  );
};

export default RegisterModal;
