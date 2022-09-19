import React, { useState } from "react";
import styled from "styled-components/macro";
import Carousel from "react-material-ui-carousel";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

function CarList({ loading, filteredData }) {
  console.log(filteredData);
  const [open, setOpen] = useState(false);

  const [currentItem, setCurrentItem] = useState(0);

  var items = [
    {
      name: " https://source.unsplash.com/random/800x600",
    },
  ];

  return (
    <Container>
      <Head>
        <HomeTxt>Home</HomeTxt>
        <HomeTxt>/</HomeTxt>

        <HomeTxt2>Search Cars</HomeTxt2>
      </Head>

      <ListContainer>
        {filteredData.map((i) => (
          <Card>
            <CardHead>
              <NameTxt>{i.car}</NameTxt>
              <YearTxt>Make Year : {i.car_model_year}</YearTxt>
            </CardHead>

            <ImageContainer>
              <Slider
                timeout={0}
                index={currentItem}
                autoPlay={false}
                navButtonsAlwaysVisible
                next={(next, active) => setCurrentItem(next)}
                prev={(prev, active) => setCurrentItem(prev)}
                indicators={false}
              >
                {items.map((item, i) => (
                  <ImgDiv>
                    <Img src={item.name} />
                  </ImgDiv>
                ))}
              </Slider>
            </ImageContainer>
            <CarDetails>
              <Left>
                <Seat_container>
                  <Seat>Seat :</Seat>
                  <Seat1>6 seats</Seat1>
                </Seat_container>

                <Seat_container>
                  <Seat>Location :</Seat>
                  <Seat1>Lowa</Seat1>
                </Seat_container>
              </Left>

              <Right>
                <Seat_container>
                  <Seat>Interior Color :</Seat>
                  <Seat1>{i.car_color}</Seat1>
                </Seat_container>

                <Seat_container>
                  <Seat>Exterior Color :</Seat>
                  <Seat1>{i.car_color}</Seat1>
                </Seat_container>
              </Right>
            </CarDetails>

            <BottomContainer>
              <Rupees>{i.price}</Rupees>

              <SyledButton variant="contained">
                <Links to={`/car-detailes/${i.id}`}> View more detailes</Links>
              </SyledButton>
            </BottomContainer>
          </Card>
        ))}
      </ListContainer>

      <Loader color="secondary" loading={loading} />
    </Container>
  );
}

export default CarList;

const SyledButton = styled(Button)`
  && {
    font-family: "poppins", sans-serif;
    text-transform: capitalize;
    font-size: 11px;
    font-weight: 400;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  width: 100%;

  height: 130px;
  flex-direction: row;
`;
const Seat_container = styled.div`
  display: flex;
`;
const Rupees = styled.span`
  font-weight: 700;
  font-size: 16px;
`;
const Seat = styled.div`
  color: #000000b5;
  font-size: 9px;
`;
const Seat1 = styled(Seat)`
  margin-left: 5px;
  color: black;
`;
const CardHead = styled.div``;
const BottomContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;
const Left = styled.div``;
const Right = styled.div`
  margin-left: 20px;
`;
const CarDetails = styled.div`
  display: flex;
  align-items: center;
`;

const Slider = styled(Carousel)`
  && {
    width: 100%;
    button {
      background-color: transparent;
      &.hover {
      }
    }
  }
`;
const Img = styled.img`
  height: 100%;
  width: 100%;
  border-radius: 2px;
  object-fit: cover;
`;
const ImgDiv = styled.div`
  height: 130px;
`;

const YearTxt = styled.span`
  font-size: 11px;
  display: block;
  color: #000000b5;
`;

const NameTxt = styled.span`
  font-weight: 500;
  font-size: 12px;
`;
const Card = styled.div`
  padding: 10px;
  cursor: pointer;
  :hover {
    background-color: #e4181861;
  }
  transition: all 0.3s;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  border-radius: 2px; ;
`;
const ListContainer = styled.div`
  display: grid;
  row-gap: 10px;
  margin-top: 30px;
  overflow-y: scroll;
  height: 78vh;
  ::-webkit-scrollbar {
    display: none;
  }
  column-gap: 10px;
  grid-template-columns: 1fr 1fr 1fr;
`;

const Container = styled.div``;
const Head = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  padding-top: 20px;
`;

const HomeTxt = styled.span`
  font-size: 12px;
  color: grey;
`;

const HomeTxt2 = styled(HomeTxt)`
  font-weight: 500;

  color: black;
`;

const Loader = styled(CircularProgress)`
  && {
    display: ${({ loading }) => (loading ? "" : "none")};

    position: absolute;
    top: 50%;
    left: 60%;
    transform: translate(-50%, -50%);
  }
`;

const Links = styled(Link)`
  text-decoration: none;
  color: white;
`;
