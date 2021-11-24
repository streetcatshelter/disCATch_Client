// LIBRARY
import React from "react";
import { useDispatch, useSelector } from "react-redux";

// COMPONENTS
import { Template, CommunityPost, SecondHeader } from "../../components";

// STYLE
import styled, { css } from "styled-components";

// ELEMENTS
import { Grid, Button } from "../../elements/index";

// ROUTE
import { useLocation } from "react-router-dom";

//ICON
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";

// FUNCTION
import InfinityScroll from "../../shared/InfinityScroll";
import {
  getCommunityDB,
  getMoreCommunityDB,
} from "../../redux/modules/community";

// REDUX
import { history } from "../../redux/configureStore";

const CommunityDetail = (props) => {
  const dispatch = useDispatch();
  const pathLocation = props.match.params.village.split("@")[0];
  let location;
  const userVillage0 = useSelector(
    (state) => state.mypage.userVillage[0]?.split("@")[0]?.split("(")[0]
  );
  const userVillageA = useSelector(
    (state) => state.mypage.userVillage[0]?.split("@")[1]?.split("(")[0]
  );

  const userVillage1 = useSelector(
    (state) => state.mypage.userVillage[1]?.split("@")[0]?.split("(")[0]
  );
  const userVillageB = useSelector(
    (state) => state.mypage.userVillage[1]?.split("@")[1]?.split("(")[0]
  );

  const userVillage2 = useSelector(
    (state) => state.mypage.userVillage[2]?.split("@")[0]?.split("(")[0]
  );
  const userVillageC = useSelector(
    (state) => state.mypage.userVillage[2]?.split("@")[1]?.split("(")[0]
  );

  if (pathLocation === userVillage0) {
    location = userVillageA;
  } else if (pathLocation === userVillage1) {
    location = userVillageB;
  } else if (pathLocation === userVillage2) {
    location = userVillageC;
  }

  const path = useLocation();
  let category = null;
  let nextPath = null;
  if (path.pathname === `/community/${pathLocation}/catinfo`) {
    category = "고양이 정보글";
    nextPath = "catinfo";
  } else if (path.pathname === `/community/${pathLocation}/gathering`) {
    category = `${pathLocation} 동네 모임`;
    nextPath = "gathering";
  } else if (path.pathname === `/community/${pathLocation}/sharing`) {
    category = `${pathLocation} 고양이 용품 나눔`;
    nextPath = "sharing";
  }

  location = location?.substring(0, location.length - 1);

  const getMoreCommunity = () => {
    dispatch(getMoreCommunityDB(category, location));
  };

  const communityList = useSelector((state) => state.community.list);

  React.useEffect(() => {
    dispatch(getCommunityDB(category, location));
  }, [category, location, dispatch]);

  return (
    <Template props={props}>
      <SecondHeader title={category} />
      <Grid
        bgColor="bgColor"
        margin="-8vh 0 0 0"
        addstyle={() => {
          return css`
            position: relative;
            top: 67px;
          `;
        }}
      >
        <CommunityDetailStyle>
          <Grid
            addstyle={() => {
              return css`
                position: relative;
                margin: 0 auto;
                font-size: 18px;
                font-weight: bold;
                top: 90px;
              `;
            }}
          ></Grid>
          <Grid
            margin="-95vh 0 0 0"
            addstyle={() => {
              return css`
                @media screen and (max-width: 375px) {
                  margin: -92.5vh 0 0 0;
                }
              `;
            }}
          >
            {communityList?.length ? (
              communityList.map((community, idx) => {
                return (
                  <InfinityScroll
                    next={getMoreCommunity}
                    index={idx}
                    length={communityList.length}
                    key={community.communityId}
                  >
                    <CommunityPost community={community} />
                  </InfinityScroll>
                );
              })
            ) : (
              <></>
            )}
          </Grid>
        </CommunityDetailStyle>
        <Button
          clickEvent={() =>
            history.push(`/community/${pathLocation}/${nextPath}/write`)
          }
          is_float="is_float"
        >
          <FontAwesomeIcon icon={faPencilAlt} style={{ width: "20px" }} />
        </Button>
      </Grid>
    </Template>
  );
};

const CommunityDetailStyle = styled.div`
  z-index: -1;
  width: 100%;
  overflow-x: hidden;
  height: 85vh;
  @media screen and (max-width: 375px) {
    height: 80vh;
    margin: -2vh 0 0;
  }
`;

export default CommunityDetail;