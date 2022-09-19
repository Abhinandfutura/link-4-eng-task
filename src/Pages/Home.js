import React, { useState } from "react";
import styled from "styled-components/macro";
import IconButton from "@mui/material/IconButton";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import RemoveIcon from "@mui/icons-material/Remove";

import Slider from "@mui/material/Slider";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";

import axios from "axios";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import CarList from "./CarList";
import { useEffect } from "react";

function Home() {
  const [names, setName] = useState();
  const [filteredData, setFilterdData] = useState([]);
  const [year, setYear] = useState([
    1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001,
    2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013,

    2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022,
  ]);

  const [state, setState] = useState({
    callSuper: false,
    datas: [],
    todate: "",
    fromdate: "",
    checkedItems: [],
  });
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(false);
  const [checkList, setCheckList] = useState({
    label: [
      {
        carName: "Toyota",
      },
      {
        carName: "Nissan",
      },
      {
        carName: "Jeep",
      },
      {
        carName: "BMW",
      },
    ],
  });
  const [expanded, setExpanded] = useState(false);
  const [values, setValues] = useState(500);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const rangehandle = (newValue) => {
    setValues(newValue);
  };

  useEffect(() => {
    Fetch();
  }, []);

  const Fetch = async () => {
    setLoading(true);
    await axios.get("https://myfakeapi.com/api/cars/").then((res) => {
      setState((prevState) => {
        return {
          ...prevState,
          datas: res.data.cars,
          callSuper: true,
        };
      });
    });

    setLoading(false);
  };

  const changeYear = (e) => {
    console.log(e.target.name);
    setState({
      ...state,
      [e.target.name]: e.target.value,
      callSuper: true,
    });
  };
  // =======================================================
  useEffect(() => {
    let updatedList = state.checkedItems;

    if (state.callSuper) {
      setLoading(true);
      let filterDatas = state.datas;
      console.log("ooooooooooooooo", filterDatas);
      if (state.fromdate && state.todate) {
        filterDatas = filterDatas.filter(
          (t) =>
            state.fromdate <= t.car_model_year &&
            state.todate >= t.car_model_year
        );
      }

      if (search) {
        filterDatas = filterDatas.filter((t) =>
          t.car.toLowerCase().includes(search.toLowerCase())
        );
      }

      // ========================================brand

      console.log("uvaos", updatedList, "======", names);
      if (updatedList.includes(names)) {
        updatedList = updatedList.filter((i) => i != names);
      } else {
        updatedList.push(names);
      }
      if (updatedList.length) {
        filterDatas = filterDatas.filter((val) =>
          updatedList.includes(val.car)
        );
      }
      if (filterDatas.length > 50) {
        filterDatas = filterDatas
          .sort((a, b) => a.car_model_year - b.car_model_year)
          .slice(0, 50);
      } else {
        filterDatas = filterDatas.sort(
          (a, b) => a.car_model_year - b.car_model_year
        );
      }

      setFilterdData(filterDatas);
    }
    setState((prevState) => {
      return {
        ...prevState,
        callSuper: false,
        checkedItems: updatedList,
      };
    });

    setLoading(false);
  }, [state.callSuper]);

  const checkhandle = (name) => {
    setName(name);
    setState((prevState) => {
      return {
        ...prevState,
        callSuper: true,
      };
    });
  };
  return (
    <Container>
      <Sidebar>
        <SmallContainer>
          <ModalTxt>Model </ModalTxt>
          <InputContainer>
            <InputBase1
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search"
              inputProps={{ "aria-label": "search google maps" }}
              onChange={(e) => {
                setSearch(e.target.value);
                setState((prevState) => {
                  return {
                    ...prevState,
                    callSuper: true,
                  };
                });
              }}
            />
            <IconButton type="button" sx={{ p: "5px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </InputContainer>
        </SmallContainer>
        <Accordion1
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <Summary
            expandIcon={
              expanded === "panel1" ? <RemoveButton /> : <AddButton />
            }
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography1
              sx={{ width: "100%", flexShrink: 0, fontSize: "12px" }}
            >
              Budget
            </Typography1>
          </Summary>
          <AccordionDetails>
            <Typography>
              <AmountBox>
                <span>$</span>
                <span>{values}</span>
              </AmountBox>

              <Slider
                style={{ color: "#31689f" }}
                size="small"
                onChange={rangehandle}
                min={500}
                max={5000}
                aria-label="Small"
                valueLabelDisplay="auto"
              />

              <RangeBox>
                <span>$500</span>
                <Amount>5000</Amount>
              </RangeBox>
            </Typography>
          </AccordionDetails>
        </Accordion1>
        <Accordion1
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
        >
          <Summary
            expandIcon={
              expanded === "panel2" ? <RemoveButton /> : <AddButton />
            }
            aria-controls="panel2bh-content"
            id="panel2bh-header"
          >
            <Typography1
              sx={{ width: "100%", flexShrink: 0, fontSize: "12px" }}
            >
              Year
            </Typography1>
          </Summary>
          <AccordionDetails>
            <Typography>
              <DateContainer>
                <InputBox>
                  <DateInput>
                    <Select
                      name="fromdate"
                      onChange={(e) => {
                        changeYear(e);
                      }}
                    >
                      <option>From</option>
                      {year.map((i) => (
                        <option>{i}</option>
                      ))}
                    </Select>
                  </DateInput>
                </InputBox>

                <InputBox>
                  <DateInput>
                    <Select
                      name="todate"
                      onChange={(e) => {
                        changeYear(e);
                      }}
                    >
                      <option>To</option>
                      {year.map((i) => (
                        <option>{i}</option>
                      ))}
                    </Select>
                  </DateInput>
                </InputBox>
              </DateContainer>
            </Typography>
          </AccordionDetails>
        </Accordion1>
        <Accordion1
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
        >
          <Summary
            expandIcon={
              expanded === "panel3" ? <RemoveButton /> : <AddButton />
            }
            aria-controls="panel3bh-content"
            id="panel3bh-header"
          >
            <Typography1 sx={{ width: "100%", flexShrink: 0 }}>
              Brand
            </Typography1>
          </Summary>
          <AccordionDetails>
            <CheckboxGroup>
              {checkList.label.map((i) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      name={i.carName.toLowerCase()}
                      onChange={() => checkhandle(i.carName)}
                    />
                  }
                  label={i.carName}
                />
              ))}
            </CheckboxGroup>
          </AccordionDetails>
        </Accordion1>
        <Accordion1
          expanded={expanded === "panel4"}
          onChange={handleChange("panel4")}
        >
          <Summary
            expandIcon={
              expanded === "panel4" ? <RemoveButton /> : <AddButton />
            }
            aria-controls="panel4bh-content"
            id="panel4bh-header"
          >
            <Typography1 sx={{ width: "100%", flexShrink: 0 }}>
              Body Type
            </Typography1>
          </Summary>
          <AccordionDetails>
            <CheckboxGroup>
              <FormControlLabel control={<Checkbox />} label="SUV" />
              <FormControlLabel control={<Checkbox />} label="Sedan" />
              <FormControlLabel control={<Checkbox />} label="Hatchback" />
              <FormControlLabel control={<Checkbox />} label="MUV" />
              <FormControlLabel control={<Checkbox />} label="Convertible" />
            </CheckboxGroup>
          </AccordionDetails>
        </Accordion1>{" "}
        <Accordion1
          expanded={expanded === "panel5"}
          onChange={handleChange("panel5")}
        >
          <Summary
            expandIcon={
              expanded === "panel5" ? <RemoveButton /> : <AddButton />
            }
            aria-controls="panel4bh-content"
            id="panel4bh-header"
          >
            <Typography1 sx={{ width: "100%", flexShrink: 0 }}>
              Body Type
            </Typography1>
          </Summary>
          <AccordionDetails>No filter</AccordionDetails>
        </Accordion1>{" "}
        <Accordion1
          expanded={expanded === "panel6"}
          onChange={handleChange("panel6")}
        >
          <Summary
            expandIcon={
              expanded === "panel6" ? <RemoveButton /> : <AddButton />
            }
            aria-controls="panel4bh-content"
            id="panel4bh-header"
          >
            <Typography1 sx={{ width: "100%", flexShrink: 0 }}>
              Color
            </Typography1>
          </Summary>
          <AccordionDetails>
            <CheckboxGroup>
              <FormControlLabel control={<Checkbox />} label="Black" />
              <FormControlLabel control={<Checkbox />} label="Grey" />
              <FormControlLabel control={<Checkbox />} label="Red" />
              <FormControlLabel control={<Checkbox />} label="Blue" />
              <FormControlLabel control={<Checkbox />} label="Violet" />
            </CheckboxGroup>
          </AccordionDetails>
        </Accordion1>{" "}
        <Accordion1
          expanded={expanded === "panel7"}
          onChange={handleChange("panel7")}
        >
          <Summary
            expandIcon={
              expanded === "panel7" ? <RemoveButton /> : <AddButton />
            }
            aria-controls="panel4bh-content"
            id="panel4bh-header"
          >
            <Typography1 sx={{ width: "100%", flexShrink: 0 }}>
              Fuel Type
            </Typography1>
          </Summary>
          <AccordionDetails>No filter</AccordionDetails>
        </Accordion1>
      </Sidebar>

      <Right>
        <CarList
          loading={loading}
          setLoading={setLoading}
          filteredData={filteredData}
        />
      </Right>
    </Container>
  );
}

export default Home;

const Select = styled.select`
  outline: none;
  width: 100%;
`;
const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;

  span {
    font-family: "poppins", sans-serif !important;
    font-size: 12px;
    color: black;
  }
  svg {
    font-size: 1rem;
    color: black;
  }
  align-items: flex-start;
`;
const InputBox = styled.div`
  display: block;
`;

const Label = styled.label`
  font-size: 10px;
`;
const DateContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
`;
const DateInput = styled.div`
  width: 8.5vw;

  outline: none;
  font-size: 11px;
`;
const Hyphon = styled.span`
  margin-bottom: 3px;
  align-self: end;
`;
const Typography1 = styled(Typography)`
  && {
    font-size: 12px;
    font-family: "poppins", sans-serif;
    font-weight: 600;
  }
`;

const Summary = styled(AccordionSummary)`
  && {
    min-height: 45px;
    .MuiAccordionSummary-content {
      margin: 0;
    }
  }
`;
const RemoveButton = styled(RemoveIcon)`
  && {
    font-size: 1rem;
  }
`;
const AddButton = styled(AddIcon)`
  && {
    font-size: 1rem;
  }
`;
const RangeBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 11px;
`;
const Amount = styled.span`
  color: #31689f;
`;
const AmountBox = styled.span`
  padding: 5px;
  margin-left: auto;
  border: 1px solid #0000002e;
  font-size: 11px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 100px;
  border-radius: 2px; ;
`;
const InputBase1 = styled(InputBase)`
  && {
    width: 80%;
    color: black;
    font-size: 12px;
    ::placeholder {
      font-size: 12px;
    }
  }
`;

const Accordion1 = styled(Accordion)`
  && {
    width: 100%;

    margin: 0.5px 0px !important;
    div[role="button"] {
      min-height: 35px !important;
    }
  }
`;
const InputContainer = styled.div`
  border: 1px solid #0000002e;
  min-width: 242px;
  width: 18vw;
  border-radius: 4px;
  /* margin-top: 10px ; */
`;

const SmallContainer = styled.div`
  margin: 10px auto;
`;

const ModalTxt = styled.label`
  font-size: 13px;
  font-weight: 500;
`;
const Container = styled.div``;

const Right = styled.div`
  width: 79%;
  margin-left: auto;
  height: 100%;
`;
const Sidebar = styled.div`
  width: 20%;
  height: 100%;
  background-color: white;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  position: fixed;
  left: 5px;
  top: 66px;
  border-radius: 2px; ;
`;
