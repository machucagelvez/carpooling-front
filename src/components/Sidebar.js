import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
import * as IoIcons from "react-icons/io";
import * as VscIcons from "react-icons/vsc";
import { IconContext } from "react-icons/lib";

const Nav = styled.div`
background: rgb(83, 83, 83);
height: 80px;
display: flex;
justify-content: flex-start;
align-items: center;
`;

const NavIcon = styled(Link)`
margin-left: 2rem;
font-size: 2rem;
height: 80px;
display: flex;
justify-content: flex-start;
align-items: center;
`;

const SidebarNav = styled.nav`
background: rgb(83, 83, 83);
width: 200px;
height: 100vh;
display: flex;
justify-content: center;
position: fixed;
top: 0;
left: ${({ sidebar }) => (sidebar ? "10" : "-100%")};
transition: 350ms;
z-index: 10;
`;

const SidebarWrap = styled.div`
width: 100%;
`;

const SidebarLink = styled(Link)`
display: flex;
color: white;
justify-content: space-between;
align-items: center;
padding: 20px;
list-style: none;
height: 60px;
text-decoration: none;
font-size: 18px;

&:hover {
	background: #252831;
	border-left: 4px solid rgb(0, 153, 255);
	cursor: pointer;
}
`;

const SidebarLabel = styled.span`
margin-left: 16px;
`;

function Sidebar() {
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);

    return (
            <>
                <IconContext.Provider value={{ color: "white" }}>
                    <Nav>
                        <NavIcon to="#">
                            <FaIcons.FaBars onClick={showSidebar} />
                        </NavIcon>
                        <div className="container">
                            <h4 style={{ textAlign: "end", marginRight:"1rem", color: "white" }}>Carpooling App</h4>
                        </div>
                    </Nav>
                    <SidebarNav sidebar={sidebar}>
                    <SidebarWrap>
                        <NavIcon to="#">
                            <AiIcons.AiOutlineClose onClick={showSidebar} />
                        </NavIcon>
                        <div className="container">
                            <h4 className="text-center text-light mt-3 mb-3">Usuario</h4>
                            <div className="row justify-content-center mb-3">
                                <button className="btn btn-primary btn-sm mr-2">
                                    Usuario
                                </button>
                                <button className="btn btn-outline-light btn-sm">
                                    Carpooler
                                </button>
                            </div>
                        </div>
                        <SidebarLink to="/routes">
                            <div>
                                <IoIcons.IoMdMap />
                                <SidebarLabel>Mis Rutas</SidebarLabel>
                            </div>                
                        </SidebarLink>
                        <SidebarLink to="/configuration">
                            <div>
                                <VscIcons.VscGear />
                                <SidebarLabel>Configuración</SidebarLabel>
                            </div>                
                        </SidebarLink>
                        <SidebarLink to="#">
                            <div>
                                <BiIcons.BiLogOut />
                                <SidebarLabel>Cerrar Sesión</SidebarLabel>
                            </div>                
                        </SidebarLink>
                    </SidebarWrap>
                    </SidebarNav>
                </IconContext.Provider>
            </>
        );
};

export default Sidebar;
