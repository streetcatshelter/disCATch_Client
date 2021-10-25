// LIBRARY
import { createSlice } from "@reduxjs/toolkit";
import { myPageApi } from "../../shared/axios";
import { userActions } from "../modules/user";

const _getUserInfo =
  () =>
  async (dispatch, getState, { history }) => {
    try {
      const { data } = await myPageApi.getUserInfo();
      dispatch(setUserInfo(data));
    } catch (e) {
      console.log(e);
      dispatch(userActions._logout());
    }
  };

const _getCalender =
  () =>
  async (dispatch, getState, { history }) => {
    try {
      const { data } = await myPageApi.getCalendar();
      dispatch(setCalendar(data));
    } catch (e) {
      console.log(e);
    }
  };

const _getLikedAllCat =
  () =>
  async (dispatch, getState, { history }) => {
    try {
      const { data } = await myPageApi.getLikedAllCat();
      dispatch(setLikedAllCat(data));
    } catch (e) {
      console.log(e);
    }
  };
const _getNotice =
  () =>
  async (dispatch, getState, { history }) => {
    try {
      const { data } = await myPageApi.getNotice();
      dispatch(setNotice(data));
    } catch (e) {
      console.log(e);
    }
  };

const _getOneNotice =
  (id) =>
  async (dispatch, getState, { history }) => {
    console.log(id);
    try {
      const { data } = await myPageApi.getOneNotice(id);
      dispatch(setOneNotice(data));
    } catch (e) {
      console.log(e);
    }
  };

const _editMyInfo =
  (NickName, Village) =>
  async (dispatch, getState, { history }) => {
    console.log(NickName, Village);
    const userInfo = {
      location: Village[0],
      location2: Village[1],
      location3: Village[2],
      nickname: NickName,
      profileUrl: "string",
    };
    console.log(userInfo);
    try {
      const { data } = await myPageApi.putUserInfo(userInfo);
      console.log(data);
      // dispatch(editMyInfo(data));
    } catch (e) {
      console.log(e);
    }
  };

const initialState = {
  noticelist: [],
  noticedetail: [],
  likedAllCat: [],
  userInfo: [],
  calendar: [],
  userVillage: [],
};

// 리듀서
const mypage = createSlice({
  name: "mypage",
  initialState,
  reducers: {
    setNotice: (state, action) => {
      state.noticelist = action.payload;
    },
    setOneNotice: (state, action) => {
      state.noticedetail = action.payload;
    },
    setLikedAllCat: (state, action) => {
      state.likedAllCat = action.payload;
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    setCalendar: (state, action) => {
      state.calendar = action.payload;
    },
    saveVillage: (state, action) => {
      const Village = action.payload;
      state.userVillage.unshift(Village);
    },
    deleteVillage: (state, action) => {
      return {
        ...state,
        userVillage: state.userVillage.filter(
          (village) => village !== action.payload
        ),
      };
    },
  },
});

export const mypageActions = {
  _getNotice,
  _getOneNotice,
  _getCalender,
  _getLikedAllCat,
  _getUserInfo,
  _editMyInfo,
};
export const {
  setNotice,
  setOneNotice,
  setLikedAllCat,
  setUserInfo,
  setCalendar,
  saveVillage,
  deleteVillage,
} = mypage.actions;
export default mypage;
