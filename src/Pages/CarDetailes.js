import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";
import axios from "axios";
import { useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
function CarDetailes() {
  let { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [data1, setData] = useState({ item: [], callSuper: false });

  useEffect(() => {
    setLoading(true);
    fetch();
    if (data1.item != 0) {
      setLoading(false);
    }
  }, [data1.callSuper]);

  let fetch = () => {
    axios.get(`https://myfakeapi.com/api/cars/${id}`).then((res) => {
      setData((prevState) => {
        return {
          ...prevState,
          item: res.data.Car,
          callSuper: true,
        };
      });
    });
    console.log("ppppppppppp", data1.item.car);
  };

  return (
    <Container>
      <Head>
        <HomeTxt>Home</HomeTxt>
        <HomeTxt>/</HomeTxt>

        <HomeTxt>Search Cars</HomeTxt>
        <HomeTxt2>
          {data1.item.car_model}-{data1.item.car_vin}
        </HomeTxt2>
      </Head>

      <Card>
        <CardHead>
          <NameTxt>{data1.item.car}</NameTxt>
          <YearTxt>Make Year : {data1.item.car_model_year}</YearTxt>
        </CardHead>

        <ImgDiv>
          <Img src="https://imageio.forbes.com/specials-images/imageserve/5d35eacaf1176b0008974b54/2020-Chevrolet-Corvette-Stingray/0x0.jpg?format=jpg&crop=4560,2565,x790,y784,safe&width=960" />
        </ImgDiv>

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
              <Seat1>{data1.item.car_color}</Seat1>
            </Seat_container>

            <Seat_container>
              <Seat>Exterior Color :</Seat>
              <Seat1>{data1.item.car_color}</Seat1>
            </Seat_container>
          </Right>
        </CarDetails>

        <BottomContainer>
          <Rupees>{data1.item.price}</Rupees>
        </BottomContainer>
      </Card>
      <span>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum-----------.
      </span>
      <Loader color="secondary" loading={loading} />
    </Container>
  );
}

export default CarDetailes;

const Loader = styled(CircularProgress)`
  && {
    display: ${({ loading }) => (loading ? "" : "none")};

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const Seat = styled.div`
  color: #000000c2;
  font-size: 13px;
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

const Right = styled.div``;

const Img = styled.img`
  height: 100%;
  width: 100%;
  border-radius: 4px;
  object-fit: cover;
`;
const ImgDiv = styled.div`
  height: 200px;
  width: 400px; ;
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
const Left = styled.div``;

const CarDetails = styled.div`
  display: flex;

  flex-direction: column;
  gap: 10px;
`;

const YearTxt = styled.span`
  font-size: 13px;
  display: block;
  color: #000000b5;
`;

const NameTxt = styled.span`
  font-weight: 500;
  font-size: 15px;
`;
const Card = styled.div`
  padding: 10px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  border-radius: 2px; ;
`;
