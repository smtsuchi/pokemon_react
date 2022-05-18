import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Tilt from 'react-parallax-tilt';

export default function SinglePoke({ user }) {
    const { name } = useParams();
    const [pokemon, setPokemon] = useState(null);
    const getPokemon = async () => {
        const res = await fetch(`http://127.0.0.1:5000/api/pokemon/search/${name}`);
        const data = await res.json()
        // data.forEach(async (course) => {course.sections = await getSections(course.id)})
        if (data.status === 'ok') { setPokemon(data.pokemon) }

    };
    const [teams, setTeams] = useState([])
    const getMyTeams = async () => {
        const res = await fetch(`http://127.0.0.1:5000/api/teams/${user.id}`);
        const data = await res.json()
        console.log(data)
        // data.forEach(async (course) => {course.sections = await getSections(course.id)})
        if (data.status === 'ok') { setTeams(data.teams) }
    };
    useEffect(() => { getMyTeams() }, [user]);

    useEffect(() => { getPokemon() }, []);

    const addToTeam = async (team) => {
        if (team.pokemon.length === 5) {console.log('Your team is full.');return}
        const res = await fetch(`http://127.0.0.1:5000/api/teams/pokemon/add`, {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                team_id: team.team_id,
                team_name: team.team_name,
                poke_id: pokemon.id
            })
        });
        const data = await res.json()
        console.log(data)
        if (data.status === 'ok') { }
    };
    return pokemon ?
        (
            <>
                <div className='pokemon-container mt-5'>
                    <Tilt key={`course_${pokemon.id}`} className='course-tilt' glareEnable={true} glareBorderRadius={"15px"} perspective={800}>
                        <div className="course-card" id='single-card' >

                            <div className='course-content'>
                                <h3>{pokemon.name}</h3>
                            </div>
                            <div className='course-icon-container'>
                                <img src={pokemon.img_url_1} alt={pokemon.name} />
                            </div>
                            <ul>
                                <li>hp: {pokemon.hp}</li>
                                <li>attack: {pokemon.attack}</li>
                                <li>defense: {pokemon.defense}</li>
                            </ul>

                            <div className="d-grid my-3 col-6 mx-auto">
                                <button className="" type="button" id='catch-btn' data-bs-toggle="modal" data-bs-target="#exampleModal">Catch</button>
                            </div>
                        </div>
                    </Tilt>
                </div>

                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">{user.id?"Pick a team to add to:":"Please log in to continue."}</h5>
                                <button type="button" id='close-btn' className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <ul className="list-group list-group-flush">
                                    {Object.keys(teams).length>0?Object.entries(teams).map(([teamId, team]) => <li key={`team_id_${teamId}`} className="list-group-item"><button onClick={() => { document.getElementById('close-btn').click(); addToTeam(team) }}>{team.team_name}</button></li>):<p>First, you need to <Link onClick={() => { document.getElementById('close-btn').click()}} to='/'>create a Team</Link></p>}
                                </ul>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>



        ) : (
            <div className='container'>Loading ..</div>
        )
}
