import React, { useState, useEffect } from 'react';
import styled  from 'styled-components'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loadPokemonList, displayMorePokemon, pokemonListFilterSelector, pokemonListCount } from "../redux/modules/pokemonList";
import ListItemLoader from "./ListItemLoader";
import PokemonListItem from "./PokemonListItem";
import _ from "lodash";
import HomeButton from "./HomeButton";
import PokemonListPagination from "./PokemonListPagination"

import axios from 'axios';
import { getId } from '../helpers/pokemonUtils';

const Container = styled.div`
    position:absolute;
    width: 100vw;
    height: 100vh;
    background-color: #DEFAE9;
    color: #89BD8E;
    max-height: 100vh;
`
const PokemonContainer = styled.div`
    position:relative;
    top:20%;
    width: 100vw;
    height: 80vh;
    max-height:80vh;
    overflow: auto;
    background-color: #DEFAE9;
`
const SearchContainer = styled.div`
    position:absolute;
    top:5%;
    padding:20px;
    max-width:1000px;
    width: 100vw;
    overflow: hidden;
`

const PokemonListItemContainer = styled.div`
    max-width:1000px;
    width: 100vw;
    height: 100vh;

`
const PokemonCounterContainer = styled.div`
    position:absolute;
    top:16%;
`

const SearchBar = styled.input`
    width: 100%;
    padding: 3px;
    background-color:#DEFAE9;
    border-style:groove;
    border-radius:50px;
`

const TypeOfView = styled.span`
    font-weight: bold;
    cursor: pointer;
    color: #89BD8E;
    &:hover{
        color:#000;
    }
`

const PokemonList = props => {
    const {
      fetchActionCreator,
      displayMore,
      isLoading,
      error,
      pokemonList,
      totalPokemonCount,

    } = props;
    
    const [wantedPokemon, setWantedPokemon] = useState([])

    const [activePage, setActivePage] = useState(1)

    const handleScroll = event => {
      const element = event.target;
      if ((element.scrollHeight - element.scrollTop === element.clientHeight) && (totalPokemonCount.length > pokemonList.length) &&(wantedPokemon.length===0)) {
        displayMore();
      }
    };

    const handleSearch = event => {
        if(totalPokemonCount.length!==0){
            let items = totalPokemonCount;
            items = items.filter((item)=>{
                return item.name.toLowerCase().search(event.target.value.toLowerCase())!== -1
            });
            if(items.length<=200){
                setWantedPokemon(items)
            }
            else{
                setWantedPokemon([])
            }
        }
      };
    
    const [paginated, setPaginated] = useState(false);
    
    useEffect(() => {
        fetchActionCreator();
      }, []);



    if (_.isEmpty(pokemonList) && isLoading) return <ListItemLoader />;
    if (error) return <p>Error</p>;
    return (
        <React.Fragment>
            <Container className="d-flex justify-content-center">
                   
                <HomeButton />
                <SearchContainer>
                    <h6>Search Pokemon</h6> 
                    <form>
                        <SearchBar type="text" placeholder="Search by name of pokemon" onChange={handleSearch} />
                    </form>
                </SearchContainer>
                                
                <PokemonCounterContainer className="d-flex justify-content-center">
                        <div>
                            {
                                (pokemonListCount!==undefined)? (
                                    <>
                                    {wantedPokemon.length===0?(
                                            <>
                                                <p className="text-muted ml-3">View:<TypeOfView onClick={()=>setPaginated(false)}> Infinite </TypeOfView>|<TypeOfView onClick={()=>setPaginated(true)}> Paginated </TypeOfView></p> 
                                            </>)
                                        :(
                                            <>
                                                <p className="text-muted ml-3">View:<TypeOfView onClick={()=>setPaginated(false)}> Infinite </TypeOfView>|<TypeOfView onClick={()=>setPaginated(true)}> Paginated </TypeOfView></p> 
                                            </>)
                                    }
                                    </>
                                )
                                :null
                            }
                        </div>
                                        
                </PokemonCounterContainer>
                {paginated? <PokemonListPagination wantedPokemon={wantedPokemon} />
                    : (
                        <PokemonContainer
                            onScroll={handleScroll}>
                                <div className="container-fluid d-flex justify-content-center">
                                    
                                    <PokemonListItemContainer className="row">
                                    
                                    {
                                        (pokemonList!==undefined)? (
                                            <>
                                            {wantedPokemon.length===0?(
                                                    <>
                                                        {pokemonList.map(pokemon => {
                                                        const { id, name } = pokemon;
                                                                return (
                                                                    <div key={pokemon.url} className="col-6 col-sm-4 col-md-3 d-flex justify-content-center">
                                                                            <PokemonListItem className="card" id={id} name={name} />
                                                                    </div>
                                                                );
                                                        })}
                                                    </>)
                                                :(
                                                    <>
                                                        {wantedPokemon.map(pokemon => {
                                                        const { id, name } = pokemon;
                                                        return (
                                                            <div key={pokemon.url} className="col-6 col-sm-4 col-md-3 d-flex justify-content-center">
                                                                    <PokemonListItem className="card" id={id} name={name} />
                                                            </div>
                                                                );
                                                        })}
                                                    </>)
                                            }
                                            </>
                                        )
                                        :null
                                    }
                                    
                                        
                                    </PokemonListItemContainer>
                                </div>
                            
                            {_.isEmpty(pokemonList) && <p>No results for this search</p>}
                            
                            {isLoading && (
                                <div className="text-center">
                                <div
                                    className="spinner-border"
                                    style={{ width: "4rem", height: "4rem" }}
                                    role="status"
                                >
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                            )}
                        </PokemonContainer>

                    
                    )
                }
                 
                
            </Container>
        </React.Fragment>
      )
    };
  
  const mapStateToProps = state => ({
    isLoading: state.pokemonListReducer.isLoading,
    error: state.pokemonListReducer.error,
    pokemonList: pokemonListFilterSelector(state),
    totalPokemonCount: pokemonListCount(state), // Search Bar data,
  });
  
  const mapDispatchToProps = dispatch => {
    return bindActionCreators(
      {
        fetchActionCreator: loadPokemonList,
        displayMore: displayMorePokemon,
      },
      dispatch,
    );
  };
  
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(PokemonList);
  