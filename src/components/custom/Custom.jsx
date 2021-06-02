import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ChromePicker } from 'react-color';
import 'semantic-ui-css/semantic.min.css';
import { Tab } from 'semantic-ui-react';
import '../common/Custom.css';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import RegisterModal from '../../components/auth/RegisterModal';
import AlertModal from '../common/AlertModal';
import {
  registerModal,
  closeModal,
  alertSonglistModal,
  alertNoFullData,
  alertLimitData,
} from '../../modules/modal';
import styled from 'styled-components';
import {
  Container,
  MainWrapper,
  CoverImg,
  Img,
  Img2,
  LpWrapper,
  Disk,
  InnerDisk,
  SongListWrapper,
  UpperWrapper,
  CustomTitle,
  SongList,
  Song,
  InputFile,
  TextInput,
  LowerWrapper,
  LogoWrapper,
  ExtraWrapper,
  TextContent,
  DomainContent,
  TabWrapper,
  ButtonWrapper,
  SubmitBtn,
  SongListTextInput,
  SongListBtn,
} from '../common/CustomStyle';

const Custom = () => {
  const history = useHistory();
  const [color, setColor] = useState('#fff');
  const [title, setTitle] = useState(sessionStorage.getItem('title'));
  const [imgBase64, setImgBase64] = useState('./images/mmmm.jpg');
  const [imgFile, setImgFile] = useState(null);
  const [imgBase, setImgBase] = useState('./images/mmmmmm.jpg');
  const [imgFile1, setImgFile1] = useState(null);
  const [songList, setSongList] = useState([]);
  const [nowSong, setNowSong] = useState('');

  useEffect(() => {
    for (let i = 0; i <= sessionStorage.length; i++) {
      sessionStorage.removeItem(`songList${i}`);
    }
    sessionStorage.removeItem('title');
  }, []);

  useEffect(() => {
    sessionStorage.setItem(`songList${songList.length}`, nowSong);
  }, [nowSong]);

  const dispatch = useDispatch();

  const { token } = useSelector(({ user }) => ({
    token: user.token,
  }));
  const { checkModal, isType, alertCheck } = useSelector(({ modal }) => ({
    checkModal: modal.checkModal,
    isType: modal.isType,
    alertCheck: modal.alertCheck,
  }));

  const openRegisterModal = () => {
    dispatch(registerModal());
  };

  const shutModal = () => {
    dispatch(closeModal());
  };

  const openSongListModal = () => {
    dispatch(alertSonglistModal());
  };

  const openNoFullDataModal = () => {
    dispatch(alertNoFullData());
  };

  const openLimitDataModal = () => {
    dispatch(alertLimitData());
  };

  const currentSong = (e) => {
    setNowSong(e.target.value);
  };

  const handleClick = () => {
    if (nowSong.length === 0) {
      openSongListModal();
      return;
    } else if (songList.length === 5) {
      openLimitDataModal();
      return;
    }
    setSongList([...songList, nowSong]);
  };

  const minusClick = (index) => {
    const newSongList = songList.filter(
      (elem) => songList.indexOf(elem) !== index,
    );
    setSongList(newSongList);
    if (newSongList) {
      for (let i = 0; i <= sessionStorage.length + 1; i++) {
        sessionStorage.removeItem(`songList${i}`);
      }
      for (let i = 0; i < newSongList.length; i++) {
        sessionStorage.setItem(`songList${i}`, newSongList[i]);
      }
    }
  };

  const handleChangeColor = (color) => {
    setColor(color.hex);
    console.log(color.hex);
  };

  const handleChangeFile = (e) => {
    let reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      if (base64) {
        setImgBase64(base64.toString());
      }
    };
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
      setImgFile(e.target.files[0]);
    }
  };

  const handleChangeTitle = (e) => {
    sessionStorage.setItem('title', e.target.value);
    setTitle(e.target.value);
  };

  const handleChangeFile1 = (e) => {
    let reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      if (base64) {
        setImgBase(base64.toString());
      }
    };
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
      setImgFile1(e.target.files[0]);
    }
  };

  const submitHandler = async () => {
    if (!color || !imgFile || !imgFile1 || !title || !songList) {
      console.log('색깔', color);
      console.log('이미지', imgFile);
      console.log('이미지 2', imgFile1);
      console.log('제목', title);
      console.log('노래', songList);
      openNoFullDataModal();
      return;
    } else if (!token) {
      openRegisterModal();
      return;
    } else {
      sessionStorage.removeItem('title');
      sessionStorage.removeItem('songList');
      const formData = new FormData();
      formData.append('color', color);
      formData.append('albumPic', imgFile);
      formData.append('recordPic', imgFile1);
      formData.append('title', title);
      formData.append('songList', songList);

      console.log('커스텀 토큰', token);
      for (let p of formData) {
        console.log('<<>F>D????D>>', p);
      }
      await axios.post(
        `${process.env.REACT_APP_SERVER_URI}/customs/add-custom`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        },
      );
      for (let i = 0; i <= songList.length; i++) {
        sessionStorage.removeItem(`songList${i}`);
      }
      history.push('/mypage');
    }
  };

  const panes = [
    {
      menuItem: 'Color',
      render: () => (
        <Tab.Pane
          style={{
            border: 'none',
            height: '270px',
            background: 'transparent',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ChromePicker color={color} onChange={handleChangeColor} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Album Cover',
      render: () => (
        <Tab.Pane
          style={{
            border: 'none',
            height: '270px',
            background: 'transparent',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <InputFile
            type="file"
            name="imgFile"
            id="imgFile"
            onChange={handleChangeFile}
          />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Center Cover',
      render: () => (
        <Tab.Pane
          style={{
            border: 'none',
            height: '270px',
            background: 'transparent',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <InputFile
            type="file"
            name="imgFile"
            id="imgFile"
            onChange={handleChangeFile1}
          />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Title',
      render: () => (
        <Tab.Pane
          style={{
            border: 'none',
            height: '270px',
            background: 'transparent',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <TextInput
            placeholder="LP 이름을 입력하세요"
            value={sessionStorage.getItem('title')}
            onChange={handleChangeTitle}
          />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Song List',
      render: () => (
        <Tab.Pane
          style={{
            border: 'none',
            height: '270px',
            background: 'transparent',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {songList.length === 0 ? (
            <div>
              <SongListTextInput
                placeholder={'추가하고 싶은 음악을 입력하세요'}
                onChange={currentSong}
              />
              <SongListBtn onClick={handleClick}>+</SongListBtn>
            </div>
          ) : (
            <div>
              {songList.map((elem, index) => {
                return (
                  <div>
                    <SongListTextInput
                      value={sessionStorage.getItem(`songList${index}`)}
                      onChange={currentSong}
                    />
                    <SongListBtn onClick={() => minusClick(index)}>
                      -
                    </SongListBtn>
                  </div>
                );
              })}
              <SongListTextInput
                placeholder={'이곳에 입력하세요'}
                onChange={currentSong}
              />
              <SongListBtn onClick={handleClick}>+</SongListBtn>
            </div>
          )}
        </Tab.Pane>
      ),
    },
  ];
  const Img1 = styled.img`
    position: relative;
    width: 100%;
    height: 100%;
    -webkit-filter: opacity(0.5) drop-shadow(0 0 0 ${color});
    filter: opacity(0.5) drop-shadow(0 0 0 ${color});
  `;

  const style = {
    width: '100%',
    height: '95vh',
    backgroundImage: 'url(./images/aaa.jpg)',
    backgroundSize: 'cover',
  };

  return (
    <Container style={style}>
      <MainWrapper>
        <CoverImg>
          <Img src={imgBase64} alt="" />
        </CoverImg>
        <LpWrapper>
          <Disk>
            <Img1
              style={{ color: color }}
              src="./images/12fix.png"
              alt=""
            ></Img1>
            <InnerDisk>
              <Img2 src={imgBase} alt="" />
            </InnerDisk>
          </Disk>
        </LpWrapper>
        <SongListWrapper>
          <UpperWrapper>
            <CustomTitle>{sessionStorage.getItem(`title`)}</CustomTitle>
            <SongList>
              {songList.map((el, index) => {
                return (
                  <Song>
                    {index + 1}. {el}
                  </Song>
                );
              })}
            </SongList>
          </UpperWrapper>
          <LowerWrapper>
            <LogoWrapper>45RPM</LogoWrapper>
            <ExtraWrapper>
              <TextContent>
                All rights of the phonogram producer and owner of the recorded
                work are reserved. Any duplication, rental, loan, public
                performance and radio broadcast of this sound carrier is
                prohibited.
              </TextContent>
              <DomainContent>www.45RPM.shop</DomainContent>
            </ExtraWrapper>
          </LowerWrapper>
        </SongListWrapper>
      </MainWrapper>
      <TabWrapper>
        <Tab
          menu={{
            inverted: true,
            color: 'black',
            fluid: true,
            tabular: true,
            className: 'wrapped',
          }}
          panes={panes}
        />
      </TabWrapper>
      <ButtonWrapper>
        <SubmitBtn onClick={submitHandler}>Submit</SubmitBtn>
      </ButtonWrapper>
      {isType === 'register' && (
        <RegisterModal open={checkModal} close={shutModal}></RegisterModal>
      )}
      {isType === 'songList' && (
        <AlertModal
          openHandle={alertCheck}
          closeHandle={shutModal}
          comment={'내용을 입력해 주세요'}
        />
      )}
      {isType === 'noFullData' && (
        <AlertModal
          openHandle={alertCheck}
          closeHandle={shutModal}
          comment={'모두 입력되어야 등록이 가능합니다'}
        />
      )}
      {isType === 'limitData' && (
        <AlertModal
          openHandle={alertCheck}
          closeHandle={shutModal}
          comment={'곡은 5개까지만 등록 가능합니다'}
        />
      )}
    </Container>
  );
};

export default Custom;
