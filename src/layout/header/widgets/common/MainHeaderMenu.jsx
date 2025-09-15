import { useState } from 'react';
import MenuList from './MenuList';
import { headerMenu } from '../../../../data/HeadersMenu';

const MainHeaderMenu = () => {
  const [isOpen, setIsOpen] = useState([]);
  return (
    <ul className='navbar-nav'>
      {headerMenu.map((menu, i) => (
        <MenuList menu={menu} key={i} customClass={'nav-item dropdown'}  level={0} isOpen={isOpen} setIsOpen={setIsOpen} />
      ))}
    </ul>
  );
};

export default MainHeaderMenu;
