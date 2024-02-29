import { FaBars } from 'react-icons/fa';
import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';

export const Nav = styled.nav`

font-size:12px;
padding:10px;
display: flex;
justify-content: space-between;
// padding: 0.2rem calc((100vw - 1000px) / 2);
z-index: 12;

`;

export const NavLink = styled(Link)`
color: #3E3E3E;
display: flex;
align-items: center;
text-decoration: none;
padding: 0 1rem;
height: 100%;
cursor: pointer;
position:relative;
&.hover {
	color: #F79320 !important;
}
&.active {
	color: #F79320 !important;
}
&.active::after
{
	content: '';
    position: absolute;
    background-color: #F79320;
    width: 60px;
    height: 4px;
    bottom: -28px;
    left: 16px;
    border-radius: 3px;
}
`;

export const Bars = styled(FaBars)`
display: none;
color: #808080;
@media screen and (max-width: 768px) {
	display: block;
	position: absolute;
	top: 0;
	right: 0;
	transform: translate(-100%, 75%);
	font-size: 1.8rem;
	cursor: pointer;
}
`;

export const NavMenu = styled.div`
display: flex;
align-items: center;
margin-right: -24px;
@media screen and (max-width: 768px) {
	display: none;
}
`;

