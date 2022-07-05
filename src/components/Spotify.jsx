import React,{useEffect, useRef, useState} from 'react'
import styled from 'styled-components'
import SideBar from './Siderbar.jsx'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import Body from './Body.jsx'
import { useStateProvider } from '../utilities/State.jsx'
import { reducerCases } from '../utilities/const.js'
import axios from 'axios'

function Spotify() {

  const [{ token }, dispatch] = useStateProvider();
  const [navBackground, setNavBackground] = useState(false);
  const [headerBackground, setHeaderBackground] = useState(false);
  const bodyRef = useRef();
  const bodyScrolled = () => {
    bodyRef.current.scrollTop >= 30
      ? setNavBackground(true)
      : setNavBackground(false);
    bodyRef.current.scrollTop >= 268
      ? setHeaderBackground(true)
      : setHeaderBackground(false);
  };

  useEffect(() => {
    const getUserInfo = async () => {
      const { data } = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      const userInfo = {
        userId: data.id,
        name: data.display_name,
      };
      dispatch({ type: reducerCases.SET_USER, userInfo});
    };
    getUserInfo();
  }, [dispatch, token]);

  return (
    <Container>
        <div className='S_body'>
            <SideBar/>
            <div className='body'>
                <Navbar/>
                <div className='B_contents'> 
                    <Body/>
                </div>
            </div>
        </div>
        <div className='S_footer'><Footer/></div>
    </Container>
  )
}
export default Spotify;
const Container = styled.div`
    max-width: 100vw;
    max-height: 100vh;
    overflow: hidden;
    display: grid;
    grid-template-rows: 85vh 15vh;

    .S_body{
        display: grid;
        grid-template-columns: 15vw 85vw;
        height: 100%;
        width: 100%;
        background: linear-gradient(transparent, rgb(0, 0, 0, 1)); 
        background-color: rgb(32, 87, 100);
        .body{
            height: 100%;
            width: 100%; 
            overflow: auto;
            &::-webkit-scrollbar {
                width: 0.7rem;
                &-thumb {
                    background-color: rgba(255, 255, 255, 0.6);
                }
            }
        } 
    }
`;