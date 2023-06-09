import React from 'react'

function Players({ player }) {
    return (
        //we can sort this list by the minutes played to get the most important players first.
        <div className="player">
            <div className='player-header'>
                <div className='name-pos'>
                    <p className="player-name">{player.player.firstname} {player.player.lastname}</p>
                    <h2 className="player-position">Position: {player.pos}</h2>
                </div>
                <img className='player-logo' src={player.team.logo} alt="Player Logo" />
            </div>
            <div className='player-stats'>
                <div className='stats-left'>
                    <div>Points: {player.points}</div>
                    <div>Min: {player.min}</div>
                    <div>FGP: {player.fgp}</div>
                    <div>Reb: {player.totReb}</div>
                    <div>Assists: {player.assists}</div>
                </div>
                <div className='stats-right'>
                    <div>Fouls: {player.pFouls}</div>
                    <div>Blocks: {player.blocks}</div>
                    <div>Steals: {player.steals}</div>
                    <div>TOV: {player.turnovers}</div>
                    <div>3P%: {player.tpp}</div>
                </div>
            </div>
            <div className='plus-minus'>{player.plusMinus}</div>
        </div>
      );
}

export default Players