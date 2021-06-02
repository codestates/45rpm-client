const SHOW_MODAL = 'SHOW_MODAL';
const LOGIN_MODAL = 'LOGIN_MODAL';
const REGISTER_MODAL = 'REGISTER_MODAL';
const CLOSE_MODAL = 'CLOSE_MODAL';
const ALBUM_DETAIL_MODAL = 'ALBUM_DETAIL_MODAL';
const INFO_MODAL = 'INFO_MODAL';
const INQUIRY_MODAL = 'INQUIRY_MODAL';

const ALERT_MODAL_SUCCESS = 'ALERT_MODAL_SUCCESS';
const ALERT_MODAL_FAILURE = 'ALERT_MODAL_FAILURE';
const ALERT_MODAL_LOGIN = 'ALERT_MODAL_LOGIN';
const ALERT_MODAL_REGISTER = 'ALERT_MODAL_REGISTER';
const ALERT_MODAL_LOGOUT = 'ALERT_MODAL_LOGOUT';
const ALERT_MODAL_UPDATE = 'ALERT_MODAL_UPDATE';
const ALERT_MODAL_WITHDRAWAL = 'ALERT_MODAL_WITHDRAWAL';
const ALERT_MODAL_ORDER = 'ALERT_MODAL_ORDER';

const ALERT_MODAL_SONGLIST = 'ALERT_MODAL_SONGLIST';
const ALERT_MODAL_NOFULLDATA = 'ALERT_MODAL_NOFULLDATA';
const ALERT_MODAL_LIMITDATA = 'ALERT_MODAL_LIMITDATA';

const ALERT_MODAL_ANSWER = 'ALERT_MODAL_ANSWER';
const ALERT_MODAL_ANSWER_FALSE = 'ALERT_MODAL_ANSWER_FALSE';
const ALERT_MODAL_ANSWER_TRUE = 'ALERT_MODAL_ANSWER_TRUE';
const ALERT_MODAL_ANSWER_UPDATE = 'ALERT_MODAL_ANSWER_UPDATE';
const ALERT_MODAL_ANSWER_REPLY = 'ALERT_MODAL_ANSWER_REPLY';

export const showModal = () => ({ type: SHOW_MODAL });
export const loginModal = () => ({ type: LOGIN_MODAL });
export const registerModal = () => ({ type: REGISTER_MODAL });
export const albumDetailModal = () => ({ type: ALBUM_DETAIL_MODAL });
export const infoModal = () => ({ type: INFO_MODAL });
export const inquiryModal = () => ({ type: INQUIRY_MODAL });
export const closeModal = () => ({ type: CLOSE_MODAL });

export const alertOpenModal = () => ({ type: ALERT_MODAL_SUCCESS });
export const alertCloseModal = () => ({ type: ALERT_MODAL_FAILURE });
export const alertLoginModal = () => ({ type: ALERT_MODAL_LOGIN });
export const alertRegisterModal = () => ({ type: ALERT_MODAL_REGISTER });
export const alertLogoutModal = () => ({ type: ALERT_MODAL_LOGOUT });
export const alertUpdateModal = () => ({ type: ALERT_MODAL_UPDATE });
export const alertWithdrawalModal = () => ({ type: ALERT_MODAL_WITHDRAWAL });
export const alertOrderModal = () => ({ type: ALERT_MODAL_ORDER });

export const alertSonglistModal = () => ({ type: ALERT_MODAL_SONGLIST });
export const alertNoFullData = () => ({ type: ALERT_MODAL_NOFULLDATA });
export const alertLimitData = () => ({ type: ALERT_MODAL_LIMITDATA });
export const alertAnswerModal = () => ({ type: ALERT_MODAL_ANSWER });
export const alertAnswerFalseModal = () => ({ type: ALERT_MODAL_ANSWER_FALSE });
export const alertAnswerTrueModal = () => ({ type: ALERT_MODAL_ANSWER_TRUE });
export const alertAnswerUpdateModal = () => ({
  type: ALERT_MODAL_ANSWER_UPDATE,
});
export const alertAnswerReplyModal = () => ({
  type: ALERT_MODAL_ANSWER_REPLY,
});

const initialState = {
  checkModal: false,
  isType: null,
  alertCheck: false,
};

export default function modal(state = initialState, action) {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        checkModal: true,
        isType: null,
      };
    case LOGIN_MODAL:
      return {
        checkModal: true,
        isType: 'login',
      };
    case REGISTER_MODAL:
      return {
        checkModal: true,
        isType: 'register',
      };
    case ALBUM_DETAIL_MODAL:
      return {
        checkModal: true,
        isType: 'detail',
      };
    case INFO_MODAL:
      return {
        checkModal: true,
        isType: 'info',
      };
    case INQUIRY_MODAL:
      return {
        checkModal: true,
        isType: 'inquiry',
      };
    case CLOSE_MODAL:
      return {
        checkModal: false,
        alertCheck: false,
        isType: null,
      };
    case ALERT_MODAL_SUCCESS:
      return {
        checkModal: false,
        alertCheck: true,
        isType: 'alert',
      };
    case ALERT_MODAL_LOGIN:
      return {
        checkModal: false,
        alertCheck: true,
        isType: 'alertLogin',
      };
    case ALERT_MODAL_REGISTER:
      return {
        checkModal: false,
        alertCheck: true,
        isType: 'alertRegister',
      };
    case ALERT_MODAL_LOGOUT:
      return {
        checkModal: false,
        alertCheck: true,
        isType: 'alertLogout',
      };
    case ALERT_MODAL_UPDATE:
      return {
        checkModal: false,
        alertCheck: true,
        isType: 'alertUpdate',
      };
    case ALERT_MODAL_WITHDRAWAL:
      return {
        checkModal: false,
        alertCheck: true,
        isType: 'alertWithdrawal',
      };
    case ALERT_MODAL_ORDER:
      return {
        checkModal: false,
        alertCheck: true,
        isType: 'alertOrder',
      };
    case ALERT_MODAL_SONGLIST:
      return {
        checkModal: false,
        alertCheck: true,
        isType: 'songList',
      };
    case ALERT_MODAL_NOFULLDATA:
      return {
        cheeckModal: false,
        alertCheck: true,
        isType: 'noFullData',
      };
    case ALERT_MODAL_LIMITDATA:
      return {
        checkModal: false,
        alertCheck: true,
        isType: 'limitData',
      };
    case ALERT_MODAL_ANSWER:
      return {
        checkModal: false,
        alertCheck: true,
        isType: 'alertAnswer',
      };
    case ALERT_MODAL_ANSWER_FALSE:
      return {
        checkModal: false,
        alertCheck: true,
        isType: 'alertAnswerFalse',
      };
    case ALERT_MODAL_ANSWER_TRUE:
      return {
        checkModal: false,
        alertCheck: true,
        isType: 'alertAnswerTrue',
      };
    case ALERT_MODAL_ANSWER_UPDATE:
      return {
        checkModal: false,
        alertCheck: true,
        isType: 'alertAnswerUpdate',
      };
    case ALERT_MODAL_ANSWER_REPLY:
      return {
        checkModal: false,
        alertCheck: true,
        isType: 'alertAnswerReply',
      };
    case ALERT_MODAL_FAILURE:
      return {
        checkModal: false,
        alertCheck: false,
      };
    default:
      return state;
  }
}
