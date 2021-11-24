// LIBRARY
import React from "react";
import moment from "moment";
import { useSelector } from "react-redux";

// ELEMENTS
import { Grid, Text, Image } from "../../elements";
import { flexBox } from "../../shared/style";

// ICON
import { Eye, MessageCircle } from "react-feather";
import FavoriteIcon from "@material-ui/icons/Favorite";

// STYLE
import { css } from "styled-components";

// REDUX
import { history } from "../../redux/configureStore";

const Diary = ({ diary, location }) => {
  const catDetailId = diary.catDetailId;
  const CreatedAt = diary.createdAt
    ? moment(diary.createdAt).format("YYYY-M-D hh:mm")
    : "";

  const { userProfile, nickname, username } = useSelector((state) => ({
    userProfile: state.mypage.userInfo.profileImageUrl,
    nickname: state.mypage.userInfo.nickname,
    username: state.mypage.userInfo.username,
  }));

  return (
    <Grid
      bgColor="diaryColor"
      padding="10px 15px"
      width="95%"
      margin="5px auto"
      cursor="pointer"
      clickEvent={() =>
        history.push(`/catdetailinfo/${location}/${catDetailId}`)
      }
    >
      <Grid
        addstyle={() => {
          return css`
            margin-bottom: 10px;
            ${flexBox("space-between")}
          `;
        }}
      >
        <Grid display="flex" alignItems="center" width="auto">
          <Image
            src={userProfile}
            width="30px"
            height="30px"
            margin="0 5px 0 0"
            borderRadius="50%"
          />
          <Text fontWeight="bold" size="16px">
            {nickname ? nickname : username}
          </Text>
        </Grid>
        <Text fontWeight="bold" size="14px">
          {CreatedAt}
        </Text>
      </Grid>

      <Text
        size="14px"
        addstyle={() => {
          return css`
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            margin-bottom: 10px;
          `;
        }}
      >
        {diary.diary}
      </Text>

      <Grid
        bgColor="diaryColor"
        addstyle={() => {
          return css`
            ${flexBox("flex-end")}
          `;
        }}
      >
        <Grid bgColor="diaryColor" width="auto" display="flex">
          <Eye size="18" style={{ margin: "3px " }} />
          {diary.viewCnt}
        </Grid>
        <Grid bgColor="diaryColor" width="auto" display="flex" margin="0px 5px">
          <MessageCircle size="18" style={{ margin: "3px" }} />
          {diary.commentCnt}
        </Grid>

        <Grid bgColor="diaryColor" width="auto" display="flex">
          <FavoriteIcon
            style={{ fontSize: "18", color: "red", margin: "3px" }}
          />

          {diary.likeCnt}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Diary;
