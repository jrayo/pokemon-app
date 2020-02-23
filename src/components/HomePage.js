import React from 'react';
import styled, { keyframes } from 'styled-components'
import pokebolaSvg from '../img/pokebola.png'
import { Link } from "react-router-dom";

const ballAnimation = keyframes`
  0%   { background-color: #d6d6d6; }
  50%  { background-color: #ed534d; }
  100% { background-color: #d6d6d6; }
`

const Pokeball = styled.div`
  position: absolute;
  left: 50%; 
  width: 200px;
  height: 200px;
  border-radius: 100%;
  margin: 0 auto;
  margin-top: 60vh;
  background-image: linear-gradient(to bottom, 	
  rgb(237,83,77) 48%, rgb(51,51,51) 48%, rgb(51,51,51) 52%, rgb(255,255,255) 52%, rgb(255,255,255) 100%);
  transform: translateX(-50%) translateY(-50%);
  box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.75);
  z-index:1;
  &:before{
    position: absolute;
    content: "";
    display: block;
    top: 50%;
    left: 50%;
    width: 40px;
    height: 40px;
    border-radius: 100%;
    border: 10px solid #ffffff;
    -webkit-animation: ${ballAnimation} 3s infinite;
    animation: ${ballAnimation} 3s infinite;
    box-shadow: 0px 0px 0px 8px #333333;
    transform: translate(-50%, -50%);
  };
  &:hover{
        box-shadow: 0px 0px 100px 2px rgba(0,0,0,0.75);
    }
`
const Container = styled.div`
  position: absolute;  
  top:0%;
  width: 100%;
  height: 60%;
  background-color: #B96772;
  border-bottom-right-radius: 100% 30%;
  border-bottom-left-radius: 100% 30%;
  color: #fff;
  max-height: 60%;
  overflow: hidden;
`

const Title = styled.strong`
  position: absolute;
  top: 10%;
  left: 5%;
  font-size: 110px;
`
const ResponsiveTitle = styled.strong`
  position: absolute;
  top: 10%;
  left: 5%;
  font-size: 18vw;
`

const PokeballSvg = styled.img`
  position: relative;
  margin-top:5%;
  height: 600px;
  width: 600px;
  transform: rotate(30deg);
`

function HomePage() {
  return (
    <div>
        <Container className="container-fluid">
            <PokeballSvg src={pokebolaSvg} height={400} />
          <Title className="d-none d-sm-block">
            POKEMON APP
          </Title>
          <ResponsiveTitle className="d-block d-sm-none">
            POKEMON APP
          </ResponsiveTitle>
        </Container>
        <Link to="/list">        
            <Pokeball />
        </Link>
    </div>
  );
}

export default HomePage;
