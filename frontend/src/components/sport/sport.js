import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setSports } from '../../reducers/sports';
import { useHistory } from "react-router-dom";

const Sport = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const state = useSelector(state => {
        return {
            token: state.loginReducer.token,
            user: state.loginReducer.user,
            loggedIn: state.loginReducer.loggedIn,
            sports: state.sportReducer.sports
        }
    })
    useEffect(() => {
        setSports();
    }, []);

    const getSportByType = (e) => {
        axios.get(`http://localhost:5000/usersByRole`,
            {
                "roleId": e.target.value,
                "type": localStorage.getItem('type')
            })
            .then((result) => {
                // dispatch()
                history.push(`/${e.target.value}`);
            })
    }

    return <>
        <div>{state.sports.map((elem, i) => (
            <div key={i}>
                <div>
                    <p >Sport type:{elem.type}</p>
                    <p >Sport type:{elem.description}</p>
                </div>
                <div>
                    <img src={elem.photo} alt={elem.type} height="100" width="100" />
                </div>
                <div>
                    <video width="320" height="240" controls>
                        <source src={elem.video} type="video/mp4" />
                    </video>
                </div>
                <div>
                    <button value='4'  onClick={getSportByType}>Gym</button>
                    <button value='3' onClick={getSportByType}>Coach</button>
                </div>
            </div>
        ))}</div>
    </>
}

export default Sport;