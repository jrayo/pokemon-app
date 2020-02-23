import React from "react";
import styled from 'styled-components'
import { Link } from "react-router-dom";

const ButtonContainer = styled.div`
    position:fixed;
    display: flex;
    align-items: center;
    width:300px;
    height:50px;
    top:0;
    left:0;
    background-color:#fff;
    color:#000;
    border-bottom-right-radius: 20px;
    text-align:left;
    box-shadow: 1px 1px 8px 1px #CECECE;
    z-index:5;
    &:hover{
        background-color:#F5F5F5;
        text-decoration:none;
    }
`

const Pokeball = styled.div`
  position: relative;
  left: 5%; 
  width: 40px;
  height: 40px;
  background-image: linear-gradient(to bottom, rgb(222, 22, 2) 19px, rgb(0, 0, 0) 19px, rgb(0, 0, 0) 21px, rgb(255, 255, 255) 2px, rgb(255, 255, 255));
  border-radius: 50%;
  border: solid 2px;
  box-shadow: 0px 0px 5px 1px rgba(0,0,0,0.75);
  z-index:10;
  transform: rotate(-30deg);
  &:before{
    content: '';
    height: 6px;
    width: 6px;
    position: absolute;
    top: 15px;
    left: 15px;
    border-radius: 10px;
    border: solid 2px rgb(255, 255, 255);
    background-color: rgb(204, 204, 204);
    box-shadow: 0px 0px 0px 2px;
  }
`

const Title = styled.div`
  margin-left:40px;
  font-size:24px;
`

const HomeButton = ({ id, name }) => {
  return (
    <Link to="/">        
        <ButtonContainer className="align-middle">
                <Pokeball />
                <Title>
                    <strong>
                        Pokedex
                    </strong>
                </Title>
            </ButtonContainer>    
    </Link>
        
  );
};

export default HomeButton;