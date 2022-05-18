import React, { useState } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import PokeBox from './PokeBox';
import '../css/MyTeam.css';
import { BsThreeDots } from 'react-icons/bs'

export default function Team({ setSelectedTeam, team, teamId }) {
    const [teamName, setTeamName] = useState('');
    const renderBoard = (dropProvided) => {
        // console.log(team, 'team in Team')
        return (
            <div style={{ display: 'flex', flexDirection: 'row', flexGrow: 1 }} ref={dropProvided.innerRef}>
                {team.pokemon.map((p, i) => (
                   
                        <Draggable key={p.pokedex_id} draggableId={p.id.toString()} index={i} >
                            {(dragProvided) => (
                                <div
                                    {...dragProvided.dragHandleProps}
                                    {...dragProvided.draggableProps}
                                    ref={dragProvided.innerRef}
                                >
                                    <PokeBox p={p} />
                                </div>
                            )}
                        </Draggable>
                    
                ))}
            </div>
        )
    };
    return (
            <Droppable direction="horizontal" droppableId={teamId}>
                {(dropProvided) => (
                    <div {...dropProvided.droppableProps} className="drag-row" key={`droppable_${teamId}`}>
                        <div>
                            <h1>{dropProvided.droppableProps['data-rbd-droppable-id'].toUpperCase()}</h1>
                            <h4>{team.team_name}</h4>
                        </div>
                        {renderBoard(dropProvided)}
                        {dropProvided.placeholder}
                        <div className="dropdown me-3">
                            <button className="btn dots" onClick={()=>setSelectedTeam(team.team_id)} type="button" id="dotsTeamDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                <BsThreeDots />
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dotsTeamDropdown">
                                <li><a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#editTeam">Edit Team Name</a></li>
                                <li><a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#deleteTeam">Delete</a></li>
                            </ul>
                        </div>
                    </div>
                )}
            </Droppable>
         
    )
}
