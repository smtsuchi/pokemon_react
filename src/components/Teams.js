import React, { useEffect, useState } from 'react';
import { GoPlus } from 'react-icons/go'
import Team from './Team';
import { DragDropContext } from 'react-beautiful-dnd';
import { reorderColumnMap } from '../reorder';

export default function Teams({ user }) {
  const [teams, setTeams] = useState({});
  const [selectedTeam, setSelectedTeam] = useState('');
  const [type, setType] = useState('')
  useEffect(() => { setType(teams[selectedTeam] ? teams[selectedTeam].team_name : '') }, [selectedTeam])
  const deleteTeam = async () => {
    const res = await fetch("http://127.0.0.1:5000/api/teams/delete", {
      method: "POST",
      headers: {
        "Content-Type": 'application/json',
        // "Authorization": `Token ${currentUser.token}`
      },
      body: JSON.stringify({
        'team_id': selectedTeam
      })
    });
    const data = await res.json();
    console.log(data)
    if (data.status === 'ok') {
      let newTeams = { ...teams }
      delete newTeams[selectedTeam]
      setTeams(newTeams)
    }
  };
  const getMyTeams = async () => {
    if (user.id) {
      const res = await fetch(`http://127.0.0.1:5000/api/teams/${user.id}`);
      const data = await res.json()
      console.log(data)
      // data.forEach(async (course) => {course.sections = await getSections(course.id)})
      if (data.status === 'ok') { setTeams(data.teams) }
    }
  };
  const updateTeam = async (reorderedMap, columnsChanged) => {
    const myReorderedMap = {}

    for (let column of columnsChanged) {
      myReorderedMap[column] = reorderedMap[column]
    }
    console.log(myReorderedMap)
    const res = await fetch("http://127.0.0.1:5000/api/teams/update", {
      method: "POST",
      headers: {
        "Content-Type": 'application/json',
        // "Authorization": `Token ${currentUser.token}`
      },
      body: JSON.stringify({
        'user_id': user.id,
        'map': myReorderedMap
      })
    });
    const data = await res.json();
    console.log(data)
  };
  const updateTeamName = async () => {
    let team_name = document.getElementById('teamNameInput').value
    const res = await fetch("http://127.0.0.1:5000/api/teams/update/name", {
      method: "POST",
      headers: {
        "Content-Type": 'application/json',
        // "Authorization": `Token ${currentUser.token}`
      },

      body: JSON.stringify({
        'team_name': team_name,
        'team_id': selectedTeam
      })
    });
    const data = await res.json();
    console.log(data)
    if (data.status === 'ok') {
      let newTeams = { ...teams }
      newTeams[data.team.team_id].team_name = data.team.team_name
      setTeams(newTeams)
    }
  };
  useEffect(() => { getMyTeams() }, [user])
  const addTeam = async () => {
    const teamName = document.getElementById('team_name').value;
    const res = await fetch(`http://127.0.0.1:5000/api/teams/add`, {
      method: "POST",
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({
        team_name: teamName,
        user_id: user.id
      })
    });
    const data = await res.json()
    console.log(data)
    if (data.status === 'ok') {
      let newTeams = { ...teams };
      console.log(newTeams)
      data.team.pokemon = []
      newTeams[data.team.team_id] = data.team
      console.log(newTeams)
      setTeams(newTeams)
    }

  }

  return (
    <div>
      <button type="button" className="" data-bs-toggle="modal" data-bs-target="#addTeam">
        <GoPlus />
      </button>


      <DragDropContext
        onDragEnd={({ destination, source }) => {
          if (!destination) { return; }
          const { reorderedMap, columnsChanged } = reorderColumnMap(teams, source, destination)
          if (reorderedMap !== teams) {
            setTeams(reorderedMap)
            updateTeam(reorderedMap, columnsChanged)
          }
        }}
      >
        {Object.entries(teams).map(([teamId, team]) => <Team
          key={`team_${team.team_id}`}
          teamId={teamId}
          team={team}
          setSelectedTeam={setSelectedTeam}
        />)}
      </DragDropContext>


      <div className="modal fade" id="editTeam" tabIndex="-1" aria-labelledby="editTeam" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editTeam">Edit Team</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className="form-floating">
                <input type="text" className="form-control" id="teamNameInput" placeholder={type} onChange={(e) => { setType(e.target.value) }} value={type} />
                <label htmlFor="teamNameInput">Team Name</label>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" id='close-btn1' data-bs-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-primary" onClick={() => { document.getElementById('close-btn1').click(); updateTeamName() }}>Update</button>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="deleteTeam" tabIndex="-1" aria-labelledby="deleteTeam" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteTeam">Delete Team</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p className='text-start'>Are you sure you want to delete team "{teams[selectedTeam] ? teams[selectedTeam].team_name : ''}"?<br />This action cannot be undone.</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" id='close-btn2' data-bs-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-primary" onClick={() => { document.getElementById('close-btn2').click(); deleteTeam() }}>Delete</button>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="addTeam" tabIndex="-1" aria-labelledby="addTeam" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addTeam">Add a team</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="form-floating mb-3">
                <input type="text" className="form-control" id="team_name" placeholder="Enter a team name." />
                <label htmlFor="floatingInput">Team Name</label>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" id='close-btn' data-bs-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-primary" onClick={() => { document.getElementById('close-btn').click(); addTeam() }}>Add</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
