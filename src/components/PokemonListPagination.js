import React, { useState, useEffect } from 'react';
import styled  from 'styled-components'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loadPokemonList, displayMorePokemon, pokemonListFilterSelector, pokemonListCount } from "../redux/modules/pokemonList";
import ListItemLoader from "./ListItemLoader";
import PokemonListItem from "./PokemonListItem";
import _ from "lodash";
import HomeButton from "./HomeButton";

import axios from 'axios';
import { getId } from '../helpers/pokemonUtils';

const PokemonContainer = styled.div`
    position:relative;
    top:20%;
    width: 100vw;
    height: 80vh;
    max-height:80vh;
    overflow: auto;
    background-color: #DEFAE9;
`

const PokemonListItemContainer = styled.div`
    position:relative;
    max-width:1000px;
    width: 100vw;
    height: 100vh;

`

const Pagination = ({goToNextPage, goToPrevPage}) =>{
    return(
        <div className="container-fluid">
            <div className="row">
                <div className="col-12" style={{display:'flex',justifyContent:'center'}}>
                    {goToPrevPage && <button className="btn btn-outline-secondary" onClick={goToPrevPage}>Previous</button>}
                    {goToNextPage && <button className="btn btn-outline-secondary" onClick={goToNextPage}>Next</button>}
                </div>
            </div>
        </div>
    )
}

const PokemonListPagination = props => {
    const {
      fetchActionCreator,
      displayMore,
      isLoading,
      error,
      pokemonList,
      totalPokemonCount,

    } = props;
    

    const [activePage, setActivePage] = useState(1)

    const [pokemonPag, setPokemonPag] = useState([])
    const [currentPageUrl, setCurrentPageUrl] = useState('https://pokeapi.co/api/v2/pokemon')
    const [nextPageUrl, setNextPageUrl] = useState()
    const [prevPageUrl, setPrevPageUrl] = useState()
    const [loading, setLoading] = useState(true);

    const [wantedPokemon, setWantedPokemon] = useState([])
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

      
    useEffect(() => {
        setLoading(true)
        let cancel;
        axios.get(currentPageUrl,
            {
                cancelToken: new axios.CancelToken(c=> cancel=c)
            }).then(response=>{
                setLoading(false)
            setNextPageUrl(response.data.next)
            setPrevPageUrl(response.data.previous)
            setPokemonPag(response.data.results.map(pokemon => pokemon))
        })

        return ()=> cancel()
      }, [currentPageUrl]);

    function goToNextPage(){
        setCurrentPageUrl(nextPageUrl)
    }


    function goToPrevPage(){
        setCurrentPageUrl(prevPageUrl)
    }      
    useEffect(() => {
        console.log(pokemonPag)
      }, [pokemonPag]);


    if (_.isEmpty(pokemonPag) && isLoading) return <ListItemLoader />;
    if (error) return <p>Error</p>;
    return (
        <PokemonContainer>
            
            <Pagination className="row"
                            goToNextPage = {nextPageUrl? goToNextPage : null}
                            goToPrevPage = {prevPageUrl? goToPrevPage : null}
            >
            
            </Pagination>
            <div className="container-fluid d-flex justify-content-center">
             
                  
                <PokemonListItemContainer className="row">
                {
                    (pokemonPag!==undefined)? (
                        <>
                        {props.wantedPokemon.length===0?(
                                <>
                                    {pokemonPag.map(pokemon => {
                                    const { url, name } = pokemon;
                                    const id = getId(url)
                                            return (
                                                <div key={pokemon.url} className="col-6 col-sm-4 col-md-3 d-flex justify-content-center">
                                                        <PokemonListItem className="card" id={id} name={name} />
                                                </div>
                                            );
                                    })}
                                </>)
                            :(
                                <>
                                    {props.wantedPokemon.map(pokemon => {
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
        
            {_.isEmpty(pokemonPag) && <p>No results for this search</p>}
            
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
  )(PokemonListPagination);
  