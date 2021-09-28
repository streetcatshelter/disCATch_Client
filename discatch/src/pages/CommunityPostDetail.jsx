import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { history } from '../redux/configureStore';

// COMPONENTS
import { Template, CommentList, EditDeleteModal, EditModalSlide } from "../components";

// STYLE
import styled, { css } from "styled-components";

// ELEMENTS
import { Grid, Text, Image } from "../elements/index";

// REDUX
import { getOneCommunityDB, deleteCommunityDB } from '../redux/modules/community';

// ROUTE
import { useLocation } from 'react-router-dom';

const CommunityPostDetail = (props) => {
  const dispatch = useDispatch();
  
  const communityId = props.match.params.communityId;
  React.useEffect(() => {
    dispatch(getOneCommunityDB(communityId));
  }, []);

  const { category, contents, imageList, location, title, username, createdAt } = useSelector((state) => ({
    categoty: state.community.list.category,
    contents: state.community.list.contents,
    imageList: state.community.list.communityImageList ? state.community.list.communityImageList : Array(1,2,3),
    location: state.community.list.location,
    title: state.community.list.title,
    username: state.community.list.username,
    createdAt: state.community.list.createdAt,
  }));

  const deleteCommunity = () => {
    dispatch(deleteCommunityDB(communityId));
  };
  
  return (
    <Template props={props}>
      <Grid
        bgColor="bgColor"
        margin="-10vh 0 0 0"
        addstyle={() => {
          return css`
            position: relative;
            top: 80px;
          `;
        }}
      >
        <Grid
          width="350px"
          addstyle={() => {
            return css`
              margin: 0 0 0 4vw;
              font-size: 18px;
              font-weight: bold;
            `;
          }}
        >
          {category}
        </Grid>
        <Grid
          margin="0 0 -35px 0"
          addstyle={() => {
            return css`
              display: flex;
              position: relative;
              top: 10px;
            `;
          }}
        >
          <Grid>
            <Image
              width="30px"
              height="30px"
              addstyle={() => {
                return css`
                  border-radius: 30px;
                  margin: 10px 13px;
                `;
              }}
            />
          </Grid>
          <Grid
            margin="10px 220px 0 0"
            addstyle={() => {
              return css`
                display: flex;
              `;
            }}
          >
            <Grid>
              <Text fontWeight="bold">
                {username}
              </Text>
              <Text size="12px">
                {location}
              </Text>
            </Grid>
            <Grid
              width="300px"
              margin="20px 0 0 0"
              addstyle={() => {
                return css`
                  display: flex;
                  position: relative;
                  right: 10px;
                `;
              }}
            >
              <Text
                fontWeight="bold"
                size="10px"
                width="140px"
                addstyle={() => {
                  return css`
                    position: relative;
                    left: -30px;
                  `;
                }}
              >
                {createdAt}
              </Text>
              <Grid
                width="30px"
                addstyle={() => {
                  return css`
                    position: relative;
                    left: -40px;
                    top: -11px;
                  `;
                }}
              >
                <EditModalSlide 
                FirstBtn={'게시글 수정'} 
                SecondBtn={'삭제'} 
                FirstClick={() => {
                      history.push({
                        pathname: `/communitypostedit/${communityId}`,
                        state: { communityId: communityId },
                    });
                  }}
                SecondClick={deleteCommunityDB}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <CommunityPostDetailStyle>
          <Grid margin="30px 0 0 0">
            <Text
              margin="-20px 4px 4px 4px"
              size="17px"
              fontWeight="bold"
              addstyle={() => {
                return css`
                  line-height: 40px;
                  padding: 4px;
                  border-top: 1px solid
                    rgb(${(props) => props.theme.palette.olive});
                `;
              }}
            >
              {title}
            </Text>
              
          </Grid>
        </CommunityPostDetailStyle>
        <Grid
          width="340px"
          margin="auto"
          addstyle={() => {
            return css`
              position: relative;
              top: 20px;
            `;
          }}
        >
              {imageList[0] &&
              <Image 
              width="286px" 
              height="286px"
              margin="10px auto"
              src={imageList[0].image}
              addstyle={() => {
                return css`
                position:relative;
                top:-20px;
                `;
              }}
              />}
              {imageList[1] &&
              <Image 
              width="286px" 
              height="286px"
              margin="10px auto"
              src={imageList[1].image}
              addstyle={() => {
                return css`
                position:relative;
                top:-20px;
                `;
              }}
              />}
              {imageList[2] &&
              <Image 
              width="286px" 
              height="286px"
              margin="10px auto"
              src={imageList[2].image}
              addstyle={() => {
                return css`
                position:relative;
                top:-20px;
                `;
              }}
              />}
              {imageList[3] &&
              <Image 
              width="286px" 
              height="286px"
              margin="10px auto"
              src={imageList[3].image}
              addstyle={() => {
                return css`
                position:relative;
                top:-20px;
                `;
              }}
              />}
              {imageList[4] &&
              <Image 
              width="286px" 
              height="286px"
              margin="10px auto"
              src={imageList[4].image}
              addstyle={() => {
                return css`
                position:relative;
                top:-20px;
                `;
              }}
              />}
              <Text
              margin="0 auto 20px"
                addstyle={() => {
                  return css`
                    position: relative;
                    width:300px;
                  `;
                }}
              >
                {contents}
              </Text>
              <Grid margin="0 0 12vh 0">
                <CommentList props={props}/>
              </Grid>
        </Grid>
      </Grid>
    </Template>
  );
};

const CommunityPostDetailStyle = styled.div`
  width: 320px;
  margin: 10px auto;
`;

export default CommunityPostDetail;
