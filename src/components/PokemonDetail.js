import _ from "lodash";
import React, {useState, useEffect} from "react";
import { getId } from "../helpers/pokemonUtils";
import styled from 'styled-components'
import HomeButton from "./HomeButton";
import Icon from "../img/icons/index"
import ListItemLoader from "./ListItemLoader";

const Container = styled.div`
    position:relative;
    background: rgba(222,199,223,1);
    background: -moz-linear-gradient(top, rgba(222,199,223,1) 0%, rgba(255,255,255,1) 100%);
    background: -webkit-gradient(left top, left bottom, color-stop(0%, rgba(222,199,223,1)), color-stop(100%, rgba(255,255,255,1)));
    background: -webkit-linear-gradient(top, rgba(222,199,223,1) 0%, rgba(255,255,255,1) 100%);
    background: -o-linear-gradient(top, rgba(222,199,223,1) 0%, rgba(255,255,255,1) 100%);
    background: -ms-linear-gradient(top, rgba(222,199,223,1) 0%, rgba(255,255,255,1) 100%);
    background: linear-gradient(to bottom, rgba(222,199,223,1) 0%, rgba(255,255,255,1) 100%);    width: 100%;
    height: 100vh;
    color:#000;
`

const ImageContainer = styled.div`
    width: 200px;
    height: 200px;
    position: absolute;
    right:20%;
    top:20%;
`

const ImageContainerMobile = styled.div`
    width: 150px;
    height: 150px;
    position: absolute;
    right:0%;
    top:20%;
`

const PokemonImage = styled.img`
    width:100%;
`

const PokemonName = styled.h6`
    margin-left:10%;
    font-size:120px;
    color:#934594;
    font-weight:bold;
`

const PokemonNameMobile = styled.h6`
    margin-left:10%;
    font-size:40px;
    color:#934594;
    font-weight:bold;
`

const PokemonId = styled.h6`
    margin-left:10%;
    padding-top:5%;
    margin-bottom:-20px;
    font-size:36px;
    color:#6C6272;
    font-weight:bold;
`
const PokemonIdMobile = styled.h6`
    margin-left:10%;
    padding-top:20%;
    margin-bottom:-10px;
    font-size:24px;
    color:#6C6272;
    font-weight:bold;
`

const IconContainer = styled.div`
    margin-left:10%;
`

const DetailContainer = styled.div`
    position:relative;
    left:7%;
    width:80vw;
    margin-top:3%;
    margin-bottom:3%;
    background-color: #fff;
    border-radius:20px;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    display:flex;
    flex-direction:column;
    overflow:auto; 
`
const AboutContainer = styled.div`
    position:relative;
    top:0%;
    padding-top:20%;
    padding-left:10%;
`

const StatsContainer = styled.div`
    position:relative;
    top:0%;
    padding:10%;
`

const PokemonXP = styled.h6`
    position:absolute;
    margin-left:10%;
    margin-bottom:-20px;
    font-size:36px;
    color:#6C6272;
    font-weight:bold;
`
const PokemonXPMobile = styled.h6`
    margin-bottom:-40px;
    margin-left:10%;
    padding-top:5%;
    font-size:24px;
    color:#6C6272;
    font-weight:bold;
`

const AbilitiesContainer = styled.div`
    position:relative; 
    padding-left:3%;
`

const AbilitiesContainerMobile = styled.div`
    position:relative; 
    padding-left:10%;
`

const Ability = styled.div`
    position:relative;
    width:90%;
    height:100%;
    padding:10px;
    margin-bottom:10px;
    background-color: #fff;
    border-radius:20px;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    flex:1;
     box-sizing: border-box;

`

const AbilityName = styled.li`
    color:#934594;
    font-weight:bold;
`

const Title = styled.h6`
    font-weight:bold;
    padding-bottom:20px;
`

function getPokemonDetail(id){
    return fetch("https://pokeapi.co/api/v2/pokemon/"+id)
      .then(data => data.json())
      .catch(error=>console.log(error.response))
  }

function getAbilityDetail(id){
    return fetch("https://pokeapi.co/api/v2/ability/"+id)
      .then(data => data.json()) //returning data from fetch
  }

const PokemonDetail = ({ id, name }) => {
    const [pokemonDetail, setPokemonDetail] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState()


    useEffect(()=>{
        const pokemonPathId = getId(window.location.pathname)
        getPokemonDetail(pokemonPathId).then((response)=>{
            setPokemonDetail(response)}
            )
      },[])

    const [abilities, setAbilities] = useState([])

    useEffect(()=>{
        console.log(pokemonDetail)
    },[pokemonDetail])
    useEffect(()=>{
        console.log(error)
  },[error])

    useEffect(()=>{
          if(pokemonDetail.abilities!==undefined){
              for(var i =0; i < pokemonDetail.abilities.length; i++){
                getAbilityDetail(getId(pokemonDetail.abilities[i].ability.url)).then((response)=>setAbilities(oldArray => [...oldArray,response]))
              }
              setIsLoading(false);
          }
    },[pokemonDetail])


    if (_.isEmpty(pokemonDetail) && isLoading) return (<div className="text-center">
    <div
    className="spinner-border text-success"
    style={{ width: "4rem", height: "4rem", position:"absolute", top:"50%"}}
    role="status"
        >
        <span className="sr-only">Loading...</span>
    </div>
    </div>);
    if (error) return <p>Error</p>;

  return (
        <Container className="container-fluid text-center">
           
            <HomeButton />
            <PokemonId className="d-none d-md-block text-left">{pokemonDetail.id<100?'0':null}{pokemonDetail.id<10?'0':null}{pokemonDetail.id}</PokemonId>
            <PokemonIdMobile className="d-md-none text-left">{pokemonDetail.id<100?'0':null}{pokemonDetail.id<10?'0':null}{pokemonDetail.id}</PokemonIdMobile>
            <PokemonName className="d-none d-md-block text-left">{_.capitalize(pokemonDetail.name)}</PokemonName>
            <PokemonNameMobile className="d-md-none text-left">{_.capitalize(pokemonDetail.name)}</PokemonNameMobile>
            <IconContainer className="text-left">
                {pokemonDetail.types!==undefined? pokemonDetail.types.map((type)=><Icon key={type.slot} name={type.type.name} />):null}
            </IconContainer>
            <DetailContainer>
                <div className="container-fluid">
                    <div className="row">
                        
                        <div className="col-12 col-md-4">
                            
                        <PokemonXP className="d-none d-md-block text-left"> {pokemonDetail.types!==undefined? "XP: "+pokemonDetail.base_experience:null} </PokemonXP>
                            <PokemonXPMobile className="d-md-none text-left">  {pokemonDetail.types!==undefined? "XP: "+pokemonDetail.base_experience:null}  </PokemonXPMobile>
                            <AboutContainer className="container-fluid text-left">
                                
                                <Title >About</Title>
                                <div className="row">
                                    <div className="col-4">
                                        <p>Name</p>
                                        <p>Height</p>
                                        <p>Weight</p>
                                        <p>Type</p>

                                    </div>
                                    
                                    <div className="col-8">
                                        <p><i>{_.capitalize(pokemonDetail.name)}</i></p>
                                        <p>{pokemonDetail.height/10+' Mts.'}</p>
                                        <p>{pokemonDetail.weight/10+' Kgs.'}</p>
                                        <div>{pokemonDetail.types!==undefined? pokemonDetail.types.map((type)=>(<p key={type.slot}>
                                                <Icon name={type.type.name}/>
                                                {_.capitalize(type.type.name)}
                                            </p>
                                        )):null}</div>
                                    </div>
                                </div>
                            </AboutContainer>
                        </div>
                        <div className="col-12 col-md-8">
                            <StatsContainer className="container-fluid text-left">
                                <Title>Basic Stats</Title>
                                <div className="row">
                                    
                                    
                                    <div className="col-12">

                                                   
                            {pokemonDetail.stats!==undefined? pokemonDetail.stats.map((stat, index, array)=>{
                                let IdInArray = index
                                var statValue = stat.base_stat;
                                var progressBarColor = '';
                                if(statValue<50){
                                    progressBarColor = 'progress-bar bg-danger'
                                }
                                else if(statValue>=50 && statValue<75){
                                    progressBarColor = 'progress-bar bg-warning'
                                }
                                else{
                                    progressBarColor = 'progress-bar bg-success'
                                }
                                return(
                                <React.Fragment key={IdInArray}>
                                    <div className="container-fluid">
                                        <div className="row">
                                            <div className="col-md-2">
                                            <span className="progress_title">{_.capitalize(stat.stat.name.replace('-',' '))}</span>
                                            </div>
                                            <div className="col-md-10 align-self-center">
                                            <span className="progress">
                                                <span className={progressBarColor} role="progressbar" style={{width: stat.base_stat+"%"}} aria-valuenow={stat.base_stat} aria-valuemin="0" aria-valuemax="100">
                                                    {stat.base_stat}
                                                </span>
                                                </span>
                                            </div>
                                            
                                        </div>  
                                        </div>
                                </React.Fragment>
                                )}):null}

                                    </div>
                                </div>                        
                            </StatsContainer>
                        </div>
                    </div>
                    <div className="row">
                    <div className="col-12">

                        <AbilitiesContainer className="d-none d-md-block text-left">
                            <Title>Abilities</Title>
                            
                        </AbilitiesContainer>
                        <AbilitiesContainerMobile className="d-md-none text-left">
                            <Title>Abilities</Title>
                            
                        </AbilitiesContainerMobile>
                        <div className="d-flex flex-column justify-content-center" style={{
                            display:'flex',
                            alignItems:'center'}}>
                                   
                            {pokemonDetail.abilities!==undefined? pokemonDetail.abilities.map((ability, index, array)=>{
                                let IdInArray = index
                                return(
                                <React.Fragment key={IdInArray}>
                                    <Ability className="text-left" >
                                        <AbilityName>{_.capitalize(ability.ability.name)}
                                        </AbilityName>
                                        <p>
                                            <strong>Effect:</strong> {(abilities[IdInArray]!==undefined)?abilities[IdInArray].effect_entries[0].effect:null}
                                        </p>
                                        <p>
                                            <strong>Short Effect:</strong> {(abilities[IdInArray]!==undefined)?abilities[IdInArray].effect_entries[0].short_effect:null}
                                        </p>
                                    </Ability>
                                </React.Fragment>
                                )}):null}

                                    
                        </div>
                    </div>
                </div>
                </div>
            </DetailContainer>
            

            <ImageContainer className="d-none d-md-block ">
                    <PokemonImage src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonDetail.id}.png`} alt={name} />
            </ImageContainer>
            <ImageContainerMobile className="d-md-none">
                    <PokemonImage src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonDetail.id}.png`} alt={name} />
            </ImageContainerMobile>

        
        </Container>    
  );
};

export default PokemonDetail;