import _ from "lodash";
import React from "react";
import styled from 'styled-components'
import { Link } from "react-router-dom";

const ItemContainer = styled(Link)`
    position:relative;
    background-color: #fff;
    width: 200px;
    height: 200px;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    margin-bottom:20px;
    color:#000;
    font-weight:bold;
    margin-left:15px;
    border-radius:20px;
    text-decoration: none;
    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    };
    &:hover{
        background-color:#ffed9e;
        color:#374d39;
    }
`
const GreyCircle = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 100%;
    background-color:#CECECE;
`

const PokemonImage = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index:10;
`

const ImageContainer = styled.div`
    width: 110px;
    height: 110px;
    position: relative;
    margin-top: 10px;
    margin-bottom: -10px;
`

const PokemonId = styled.div`
    display: inline-block;
    padding:2px;
    width: 70px;
    height: 25px;
    background-color: #CECECE;
    border-radius:30%;
    font-size: 12px;
    margin-bottom:10px;
`

const PokemonName = styled.h6`
    font-size:12px;
    font-weight:bold;
`

const PokemonListItem = ({ id, name }) => {
  return (
        <ItemContainer to={"/pokemon/"+id} className="card text-center">
            <ImageContainer className="card-img-top mx-auto d-block">
                <GreyCircle />
                <PokemonImage>
                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} alt={name} />
                </PokemonImage> 
            </ImageContainer>
            <div className="card-body">
                <PokemonId className="card-text">#{id<100?0:null}{id<10?0:null}{id}</PokemonId>
                <PokemonName className="card-text d-block d-sm-none">{_.capitalize(name)}</PokemonName>
                <h6 className="card-text d-none d-sm-block">{_.capitalize(name)}</h6>

            </div>
        </ItemContainer>    
  );
};

export default PokemonListItem;