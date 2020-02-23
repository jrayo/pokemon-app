import React from 'react';

import { ReactComponent as Bug } from './bug.svg';
import { ReactComponent as Dark }  from './dark.svg';
import { ReactComponent as Dragon }  from './dragon.svg';
import { ReactComponent as Electric }  from './electric.svg';
import { ReactComponent as Fairy }  from './fairy.svg';
import { ReactComponent as Fighting }  from './fighting.svg';
import { ReactComponent as Fire }  from './fire.svg';
import { ReactComponent as Flying }  from './flying.svg';
import { ReactComponent as Ghost } from './ghost.svg';
import { ReactComponent as Grass } from './grass.svg';
import { ReactComponent as Ground } from './ground.svg';
import { ReactComponent as Ice } from './ice.svg';
import { ReactComponent as Normal } from './normal.svg';
import { ReactComponent as Poison } from './poison.svg';
import { ReactComponent as Psychic } from './psychic.svg';
import { ReactComponent as Rock } from './rock.svg';
import { ReactComponent as Steel } from './steel.svg';
import { ReactComponent as Water } from './water.svg';


const Icon = props => {
  switch(props.name) {
    case "bug":
      return <Bug 
                title="bug" style={{padding:'10px', maxWidth:'50px', maxHeight:'50px', backgroundColor: '#93BB3A', borderRadius:'50px', height:'50px', marginRight:'10px'}} />
    case "dark":
      return <Dark 
                title="dark" style={{padding:'10px', maxWidth:'50px', maxHeight:'50px', backgroundColor: '#595761', borderRadius:'50px', height:'50px', marginRight:'10px'}} />;
    case "dragon":
        return <Dragon 
                title="dragon" style={{padding:'10px', maxWidth:'50px', maxHeight:'50px', backgroundColor: '#176CC5', borderRadius:'50px', height:'50px', marginRight:'10px'}} />
    case "electric":
        return <Electric 
                title="electric" style={{padding:'10px', maxWidth:'50px', maxHeight:'50px', backgroundColor: '#F1D85A', borderRadius:'50px', height:'50px', marginRight:'10px'}} />
    case "fairy":
        return <Fairy 
                title="fairy" style={{padding:'10px', maxWidth:'50px', maxHeight:'50px', backgroundColor: '#ED93E4', borderRadius:'50px', height:'50px', marginRight:'10px'}} />
    case "fightning":
        return <Fighting 
                title="fightning" style={{padding:'10px', maxWidth:'50px', maxHeight:'50px', backgroundColor: '#D14461', borderRadius:'50px', height:'50px', marginRight:'10px'}} />
    case "fire":
        return <Fire 
                title="fire" style={{padding:'10px', maxWidth:'50px', maxHeight:'50px', backgroundColor: '#F9A555', borderRadius:'50px', height:'50px', marginRight:'10px'}} />
    case "flying":
        return <Flying 
                title="flying" style={{padding:'10px', maxWidth:'50px', maxHeight:'50px', backgroundColor: '#A2BCEA', borderRadius:'50px', height:'50px', marginRight:'10px'}} />
    case "ghost":
        return <Ghost 
                title="ghost" style={{padding:'10px', maxWidth:'50px', maxHeight:'50px', backgroundColor: '#606FBA', borderRadius:'50px', height:'50px', marginRight:'10px'}} />
    case "grass":
        return <Grass 
                title="grass" style={{padding:'10px', maxWidth:'50px', maxHeight:'50px', backgroundColor: '#63BC5D', borderRadius:'50px', height:'50px', marginRight:'10px'}} />
    case "ground":
        return <Ground 
                title="ground" style={{padding:'10px', maxWidth:'50px', maxHeight:'50px', backgroundColor: '#D87C52', borderRadius:'50px', height:'50px', marginRight:'10px'}} />
    case "ice":
        return <Ice 
                title="ice" style={{padding:'10px', maxWidth:'50px', maxHeight:'50px', backgroundColor: '#79D0C1', borderRadius:'50px', height:'50px', marginRight:'10px'}} />
    case "normal":
        return <Normal 
                title="normal" style={{padding:'10px', maxWidth:'50px', maxHeight:'50px', backgroundColor: '#A0A29F', borderRadius:'50px', height:'50px', marginRight:'10px'}} />
    case "poison":
        return <Poison 
                title="poison" style={{padding:'10px', maxWidth:'50px', maxHeight:'50px', backgroundColor: '#B667CD', borderRadius:'50px', height:'50px', marginRight:'10px'}} />
    case "psychic":
        return <Psychic 
                title="psychic" style={{padding:'10px', maxWidth:'50px', maxHeight:'50px', backgroundColor: '#F88684', borderRadius:'50px', height:'50px', marginRight:'10px'}} />
    case "rock":
        return <Rock 
                title="rock" style={{padding:'10px', maxWidth:'50px', maxHeight:'50px', backgroundColor: '#C9BB8D', borderRadius:'50px', height:'50px', marginRight:'10px'}} />
    case "steel":
        return <Steel 
                title="steel" style={{padding:'10px', maxWidth:'50px', maxHeight:'50px', backgroundColor: '#5995A2', borderRadius:'50px', height:'50px', marginRight:'10px'}} />
    case "water":
        return <Water 
                title="water" style={{padding:'10px', maxWidth:'50px', maxHeight:'50px', backgroundColor: '#579EDD', borderRadius:'50px', height:'50px', marginRight:'10px'}} />
    default:
      return <div />;
  }
}
export default Icon;