import styled from 'styled-components';

export const Container = styled.div `
  border: 3px solid blue;
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(120deg, #03154e, #311788);
  overflow: auto;
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.4);
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 6px;
  }
`;

export const TitleWrapper = styled.div `
  display: flex;
  flex-direction: column;
  padding: 4rem;
  text-align: center;

  @media screen and (max-width: 768px) {
    text-align: center;
    padding: 4rem;
  }
`;

export const H1Title = styled.h1 `
  color: #fff;
  font-size: 4.7rem;
  font-family: 'Lato', sans-serif;
  padding-bottom: 1rem;

  @media screen and (max-width: 768px) {
    font-size: 2.7rem;
  }
`;

export const SubTitle = styled.h5 `
  color: #fff;
  font-size: 2rem;

  @media screen and (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const ContentWrapper = styled.div `
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-row-gap: 2rem;

  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-left: 6rem;
  margin-bottom: 4rem;

  @media screen and (max-width: 768px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-row-gap: 1rem;
    padding-left: 2rem;
  }
`;

export const CdCaseContent = styled.div `
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
`;

export const CoverImg = styled.div `
  flex: 1;
  width: 200px;
  height: 200px;
  position: relative;
  @media screen and (max-width: 768px) {
    width: 100px;
    height: 100px;
  }
`;

export const Img = styled.img `
  width: inherit;
  height: inherit;
  position: absolute;
  z-index: 2;
`;

export const Disk = styled.div `
  flex: 1;
  width: 170px;
  height: 170px;
  position: absolute;
  top: 1rem;
  border-radius: 50%;
  border: 1px solid #fff;
  left: 35%;
  z-index: 1;
  @media screen and (max-width: 768px) {
    width: 70px;
    height: 70px;
    position: absolute;
    top: 1rem;
    left: 35%;
  }

  &:hover {
    animation: rotation 2s linear infinite;
  }

  @keyframes rotation {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const InnerDisk = styled.div `
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70px;
  height: 70px;
  border-radius: 50%;

  &::after {
    position: absolute;
    content: '';
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 10px;
    height: 10px;
    background-color: black;
    border-radius: 50%;
  }
  @media screen and (max-width: 768px) {
    width: 30px;
    height: 30px;
  }
`;

export const Img1 = styled.img `
  width: 70px;
  height: 70px;
  border-radius: 50%;

  @media screen and (max-width: 768px) {
    width: 30px;
    height: 30px;
  }
`;

export const ContinueBtn = styled.div `
  width: 100%;
  height: 10vh;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-bottom: 2rem;
  padding-right: 1rem;

  @media screen and (max-width: 768px) {
    display: flex;
    justify-content: center;
  }
`;

export const Button = styled.button `
  cursor: pointer;
  width: 10rem;
  height: 3rem;
  color: #000;
  background-color: #fff;
  border-radius: 20px;
  text-transform: uppercase;
  font-family: 'Jua', sans-serif;
  font-size: 1.5rem;
  outline: none;
  margin-bottom: 5rem;

  @media screen and (max-width: 768px) {
    width: calc(20vw + 6px);
    height: calc(7vw + 6px);
    font-size: 1rem;
    margin-bottom: 3rem;
  }
`;