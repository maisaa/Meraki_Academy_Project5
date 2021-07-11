import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setSports } from "../../reducers/sports";
import { useHistory } from "react-router-dom";
import "./sport.css";
import "./nicepage.css";
import "./Page-6.css";

import img from "./images/aa.jpg";
import img1 from "./images/athlete-black-and-white-boxer-boxing-290416.jpg";
import Button from "react-bootstrap/Button";
import img3 from "./images/action-activity-adult-attack-260447.jpg";
import img4 from "./images/52f8dc4b-dc0c-5220-3dbf-3ab6e4921ae6.jpg";
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
      <div className="sportsPage">
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
                    <div class="u-border-3 u-border-palette-2-base u-line u-line-horizontal u-line-1"></div>
                  </p>
                  <h2 style={{ "text-align": "" }}>
                    <span>{elem.description}</span>
                  </h2>
                  <h3 style={{ "text-align": "" }}>
                    <span>This video described all you need to know about {elem.type} :</span>
                  </h3>
                  <iframe
                    className="video-sports"
                    width="80%"
                    height="400"
                    src={elem.video}
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                </div>
              </section>

              <hr className="hr"></hr>
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
              <section class="below u-align-center u-clearfix u-valign-bottom-xl u-section-1" id="sec-7d7d">
                <div
                  class="
          u-align-center-sm
          u-align-center-xs
          u-align-left-lg
          u-align-left-md
          u-align-left-xl
          u-container-style
          u-group
          u-shape-rectangle
          u-group-1
        "
                >
                  <div class="u-container-layout u-valign-middle u-container-layout-1">
                    <h2 class="u-text u-text-1">Enhance Your Sports</h2>
                    <p class="u-text u-text-2">
                      You Can exchange your Sport by click on another card below , You can Select any type below by
                      click on cards .&nbsp;
                      <br />
                      <br />
                    </p>
                  </div>
                </div>
                <img
                  class="u-expanded-width u-image u-image-1"
                  data-image-width="1920"
                  data-image-height="972"
                  src={img4}
                />
                <div class="u-layout-grid u-list u-list-1">
                  <div class="u-repeater u-repeater-1">
                    <div class="u-align-center u-container-style u-grey-5 u-list-item u-repeater-item u-list-item-1">
                      <div class="u-container-layout u-similar-container u-valign-top u-container-layout-2">
                        <span class="u-icon u-icon-circle u-icon-1">
                          <g>
                            <path d="m457 121h-106v-35c0-24.813-20.187-45-45-45h-100c-24.813 0-45 20.187-45 45v35h-106c-30.327 0-55 24.673-55 55v240c0 30.327 24.673 55 55 55h402c30.327 0 55-24.673 55-55v-240c0-30.327-24.673-55-55-55zm-266-35c0-8.271 6.729-15 15-15h100c8.271 0 15 6.729 15 15v35h-130zm-111 355h-25c-13.785 0-25-11.215-25-25v-240c0-13.785 11.215-25 25-25h25zm322 0h-292v-290h37.783c-3.129 7.621-4.699 15.551-4.653 23.752.104 18.544 8.698 33.732 15.126 42.52l-16.05 37.573c-1.854 4.342-1.557 9.304.804 13.393l55 95.263c2.778 4.812 7.82 7.503 13.004 7.503 2.544 0 5.124-.648 7.486-2.013l69.282-40c3.445-1.989 5.959-5.266 6.989-9.108 1.029-3.842.49-7.937-1.499-11.382l-55-95.263c-2.36-4.089-6.509-6.827-11.196-7.393l-43.872-5.285c-3.813-4.973-10.012-14.771-10.075-25.976-.046-8.146 3.068-15.903 9.464-23.583h219.407zm-229.26-181.268 12.276-28.737 31.026 3.737 43.75 75.777-43.302 25zm309.26 156.268c0 13.785-11.215 25-25 25h-25v-290h25c13.785 0 25 11.215 25 25z"></path>
                            <path d="m326 271c24.813 0 45-20.187 45-45s-20.187-45-45-45-45 20.187-45 45 20.187 45 45 45zm0-60c8.271 0 15 6.729 15 15s-6.729 15-15 15-15-6.729-15-15 6.729-15 15-15z"></path>
                          </g>
                        </span>
                        <h4 class="u-text u-text-3">Traveller Tours</h4>
                        <p class="u-text u-text-4">Sample text. Click to select the text box.</p>
                      </div>
                    </div>
                    <div class="u-align-center u-container-style u-grey-5 u-list-item u-repeater-item u-video-cover">
                      <div class="u-container-layout u-similar-container u-valign-top u-container-layout-3">
                        <span class="u-icon u-icon-circle u-icon-2"></span>
                        <h4 class="u-text u-text-5">Explore The World</h4>
                        <p class="u-text u-text-6">Sample text. Click to select the text box.</p>
                      </div>
                    </div>
                    <div class="u-align-center u-container-style u-grey-5 u-list-item u-repeater-item u-video-cover">
                      <div class="u-container-layout u-similar-container u-valign-top u-container-layout-4">
                        <span class="u-icon u-icon-circle u-icon-3"></span>
                        <h4 class="u-text u-text-7">Adventure Vacations</h4>
                        <p class="u-text u-text-8">Sample text. Click to select the text box.</p>
                      </div>
                    </div>
                    <div class="u-align-center u-container-style u-grey-5 u-list-item u-repeater-item u-video-cover">
                      <div class="u-container-layout u-similar-container u-valign-top u-container-layout-5">
                        <span class="u-icon u-icon-circle u-icon-4">
                          <g>
                            <path d="m406.312 482v-384.132h-39.99v-64.972h-95.322v-32.896h-30v32.896h-95.322v64.972h-39.99v384.132h-54.4v30h409.424v-30zm-230.634-419.104h160.644v34.972h-160.644zm140.634 419.104h-45.312v-109.629h45.312zm-75.312 0h-45.312v-109.629h45.312zm105.312 0v-139.629h-180.624v139.629h-30v-354.132h240.624v354.132z"></path>
                            <path d="m165.688 158.205h30v30h-30z"></path>
                            <path d="m316.312 158.205h30v30h-30z"></path>
                            <path d="m241 158.205h30v30h-30z"></path>
                            <path d="m165.688 218.541h30v30h-30z"></path>
                            <path d="m316.312 218.541h30v30h-30z"></path>
                            <path d="m241 218.541h30v30h-30z"></path>
                            <path d="m165.688 278.878h30v30h-30z"></path>
                            <path d="m316.312 278.878h30v30h-30z"></path>
                            <path d="m241 278.878h30v30h-30z"></path>
                          </g>
                        </span>
                        <h4 class="u-text u-text-9">Luxurious Hotels</h4>
                        <p class="u-text u-text-10">Sample text. Click to select the text box.</p>
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
