import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setSports } from "../../reducers/sports";
import { useHistory } from "react-router-dom";
import "./sport.css";
import "./nicepage.css";
import img from "./images/aa.jpg";
import img1 from "./images/athlete-black-and-white-boxer-boxing-290416.jpg";
import Button from "react-bootstrap/Button";
import img3 from "./images/action-activity-adult-attack-260447.jpg";

const Sport = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      user: state.loginReducer.user,
      loggedIn: state.loginReducer.loggedIn,
      sports: state.sportReducer.sports,
    };
  });
  useEffect(() => {
    setSports();
  }, []);

  const getSportByType = (e) => {
    history.push(`/type/${e.target.value}`);
  };

  return (
    <>
      <div>
        {state.sports.map((elem, i) => {
          return (
            <div>
              <section class="u-align-left u-clearfix u-section-2" id="carousel_040f">
                <div>
                  <img src={elem.photo} height="800" width="100%"></img>
                </div>
              </section>
              <section class="u-align-left u-clearfix u-section-2" id="sec-5747">
                <div class=" u-clearfix u-sheet u-valign-middle u-sheet-1">
                  <p className="u-text u-text-default u-text-1" style={{ "text-align": "center" }}>
                    <span style={{ "line-height": "2.0" }}>- {elem.type} Sport -</span>
                  </p>
                  <h2 style={{ "text-align": "" }}>
                    <span>{elem.description}</span>
                  </h2>
                  <h3 style={{ "text-align": "" }}>
                    <span>This video described all you need to know about {elem.type} :</span>
                  </h3>
                  <video className="video-sports" width="800" height="400" controls>
                    <source src="" type="video/mp4" />
                  </video>
                </div>
              </section>
              <hr></hr>
              <section class="u-align-center u-clearfix u-section-2" id="carousel_5dcb">
                <div class="u-clearfix u-sheet u-valign-middle u-sheet-1">
                  <h3 class="u-text u-text-default u-text-1">Meet Your Trainers</h3>
                  <div class="u-list u-list-1">
                    <div class="u-repeater u-repeater-1">
                      <div class="u-align-center u-container-style u-list-item u-repeater-item">
                        <div class="u-container-layout u-similar-container u-valign-top u-container-layout-1">
                          <img
                            src={img}
                            alt=""
                            class="u-expanded-width u-image u-image-default u-image-1"
                            data-image-width="810"
                            data-image-height="1080"
                          ></img>
                          <h5 class="u-text u-text-2">Gym</h5>
                          <p class="u-text u-text-grey-40 u-text-3">
                            Sample text. Click to select the text box. Click again or double click to start editing the
                            text.
                          </p>
                          <div className="sports-buttons">
                            <Button id="button-sports" variant="dark" value="4" onClick={getSportByType}>
                              Show gyms
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div class="u-align-center u-container-style u-list-item u-repeater-item">
                        <div class="u-container-layout u-similar-container u-valign-top u-container-layout-2">
                          <img src={img1} alt="" class="u-expanded-width u-image u-image-default u-image-2"></img>
                          <h5 class="u-text u-text-4">Private Couch</h5>
                          <p class="u-text u-text-grey-40 u-text-5">
                            Sample text. Click to select the text box. Click again or double click to start editing the
                            text.
                          </p>
                          <div className="sports-buttons">
                            <Button id="button-sports" variant="dark" value="3" onClick={getSportByType}>
                              Show Private Coach
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Sport;
