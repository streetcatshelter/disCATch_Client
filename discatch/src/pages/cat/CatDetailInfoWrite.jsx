// LIBRARY
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { css } from "styled-components";

// COMPONENTS
import { Template } from "../../components";

// ELEMENTS
import { Grid, TextArea, Button, Input, Image, Text } from "../../elements";

// STYLE
import { flexBox } from "../../shared/style";

// ICON
import { Camera } from "react-feather";

// REDUX
import { history } from "../../redux/configureStore";
import { imgActions } from "../../redux/modules/image";
import { __createCatDetailInfo } from "../../redux/modules/cat";
import { addHashTag, deleteHashTag } from "../../redux/modules/cat";
const CatDetailInfoWrite = (props) => {
  const dispatch = useDispatch();
  const HashTags = useSelector((state) => state.cat.hashtag);
  const preview = useSelector((state) => state.image.preview);
  const catId = props.match.params.catId;
  const [fileNum, setFileNum] = useState(0);

  // S3
  const handleInputFile = (e) => {
    e.preventDefault();
    if (fileNum < 3) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      dispatch(imgActions.setPreview(imageUrl, fileNum));
      dispatch(imgActions.setFiles(file, fileNum));
      setFileNum(fileNum + 1);
    } else {
      alert("사진은 최대 3장까지 등록할 수 있어요!");
    }
  };

  const [tag, setTag] = useState("");
  const $tag = (e) => {
    setTag(e.target.value);
  };

  const [diary, setDiary] = useState("");
  const $diary = (e) => {
    setDiary(e.target.value);
  };

  const [food, setFood] = useState(false);
  const [snack, setSnack] = useState(false);
  const [water, setWater] = useState(false);

  const loaction = props.location.state.location;
  const latitude = props.location.state.latitude;
  const longitude = props.location.state.longitude;

  const createBtn = () => {
    dispatch(
      __createCatDetailInfo(
        HashTags,
        diary,
        food,
        latitude,
        longitude,
        snack,
        water,
        catId
      )
    );
    history.push(`/catdetail/${loaction}/${catId}`);
  };
  const publish = (catTag) => {
    if (catTag !== "") {
      dispatch(addHashTag(catTag));
      setTag("");
    } else {
      alert("해쉬태그를 입력해주세요");
    }
  };

  const DeleteHashTag = (hashtag) => {
    dispatch(deleteHashTag(hashtag));
  };
  return (
    <Template props={props}>
      <Grid
        width="80%"
        bgColor="yellow"
        padding="12px"
        margin="5px auto"
        radius="20px"
        addstyle={() => {
          return css`
            ${flexBox()}
            flex-direction:column;
          `;
        }}
      >
        <label htmlFor="imgFile">
          <Camera width="100%" height="80" color="white" />
        </label>
        <Text>이곳을 클릭하여 사진을 등록해주세요!</Text>
        <Input
          id="imgFile"
          name="imgFile"
          type="file"
          accept="image/png, image/jpeg"
          changeEvent={handleInputFile}
          addstyle={() => {
            return css`
              display: none;
            `;
          }}
        />
      </Grid>

      <Grid
        padding="5px 20px"
        display="flex"
        justifyContent="center"
        margin="auto"
      >
        {preview && preview[0] && (
          <Grid width="33%" margin="auto">
            <Image
              borderRadius="10px"
              src={preview[0].preview}
              width="100px"
              height="100px"
              margin="auto"
            />
          </Grid>
        )}

        {preview && preview[1] && (
          <Grid width="33%" margin="auto">
            <Image
              borderRadius="10px"
              src={preview[1].preview}
              width="100px"
              height="100px"
              margin="auto"
            />
          </Grid>
        )}

        {preview && preview[2] && (
          <Grid width="33%" margin="auto">
            <Image
              borderRadius="10px"
              src={preview[2].preview}
              width="100px"
              height="100px"
              margin="auto"
            />
          </Grid>
        )}
      </Grid>

      <Text margin="5px auto 10px auto" fontWeight="bold">
        {fileNum}/3
      </Text>

      <Grid
        display="flex"
        justifyContent="space-around"
        margin="0px auto 10px auto"
        width="90%"
      >
        <CheckGrid>
          <CheckBox
            type="checkbox"
            value="food"
            onChange={(e) => {
              setFood(e.target.checked);
            }}
          />
          <CheckText>사료</CheckText>
        </CheckGrid>

        <CheckGrid>
          <CheckBox
            type="checkbox"
            value="snack"
            onChange={(e) => {
              setSnack(e.target.checked);
            }}
          />
          <CheckText>간식</CheckText>
        </CheckGrid>
        <CheckGrid>
          <CheckBox
            type="checkbox"
            value="water"
            onChange={(e) => {
              setWater(e.target.checked);
            }}
          />
          <CheckText>급수</CheckText>
        </CheckGrid>
      </Grid>
      <Grid width="85%" margin="auto">
        <Text size="14px" fontWeight="bold">
          1. 캣 활동 다이어리
        </Text>
        <TextArea
          changeEvent={$diary}
          margin="5px auto"
          padding="5px 10px"
          width="90%"
          height="80px"
          type="text"
          placeholder="다이어리를 입력해주세요."
          addstyle={() => {
            return css`
              border: 1px solid rgb(${(props) => props.theme.palette.olive});
              border-radius: 10px;
            `;
          }}
        ></TextArea>
        <Grid width="100%" margin="auto">
          <Text size="14px" fontWeight="bold">
            2. 해쉬태그{" "}
          </Text>
          <Text margin="0px 5px" size="10px">
            "빈칸"없이 입력 후 엔터를 치세요.
            <br /> 해쉬태그를 삭제하고싶으시면 생성된 태그를 클릭해주세요!
          </Text>
          <Input
            addstyle={() => {
              return css`
                ${flexBox()}
              `;
            }}
            margin="5px auto"
            padding="5px 10px"
            width="90%"
            radius="10px"
            bgColor="#ffffff"
            placeholder="태그를 입력해주세요!"
            type="text"
            value={tag}
            changeEvent={$tag}
            onKeyPress={(e) => e.which === 13 && publish(tag)}
          />

          {HashTags ? (
            <Grid
              display="flex"
              width="95%"
              margin="10px auto"
              addstyle={() => {
                return css`
                  display: flex;
                  flex-wrap: wrap;
                `;
              }}
            >
              {HashTags.map((hashtag, idx) => {
                return (
                  <Grid
                    key={idx}
                    width="auto"
                    bgColor="yellow"
                    height="25px"
                    radius="20px"
                    margin="5px "
                    padding="0px 5px 3px 5px"
                    style={{ fontSize: "12px" }}
                    addstyle={() => {
                      return css`
                        display: flex;
                        align-items: center;
                      `;
                    }}
                    onClick={() => DeleteHashTag(hashtag)}
                  >
                    {hashtag}
                  </Grid>
                );
              })}
            </Grid>
          ) : (
            ""
          )}
        </Grid>
        <Button
          clickEvent={createBtn}
          width="120px"
          height="20px"
          margin="5px auto"
          padding="5px"
          color="#000000"
          bgColor="olive"
          fontSize="18px"
          fontWeight="800"
          radius="15px"
          addstyle={() => {
            return css`
              display: flex;
              justify-content: center;
            `;
          }}
        >
          작성하기
        </Button>
      </Grid>
    </Template>
  );
};

const CheckGrid = styled.div`
  display: flex;
  justify-content: center;
`;

const CheckText = styled.p`
  font-weight: 800;
  font-size: 16px;
  margin: 0px 5px;
`;

const CheckBox = styled.input`
  width: 20x;
  height: 20px;
`;

export default CatDetailInfoWrite;