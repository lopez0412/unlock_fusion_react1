import React, { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

const NavigationB = (props) => {
    const [collapsed, setCollapsed] = useState(false);

  const toggleNavbar = () => setCollapsed(!collapsed);
  return (
    <div>
      <Navbar  expand="md navbar-dark">
        <NavbarBrand href="/" className="mr-auto">Unlock Fusion</NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem >
              <NavLink href="/home">Home</NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="/Marcas">Marcas</NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="/Categorias">Categorias</NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="/Capacidad">Capacidad</NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="/Venta">Ventas</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
export default NavigationB;