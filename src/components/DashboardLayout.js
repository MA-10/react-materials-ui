import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { experimentalStyled } from '@material-ui/core';
import DashboardNavbar from './DashboardNavbar';
import DashboardSidebar from './DashboardSidebar';
import DashboardSidebar2 from './DashboardSidebar2';
import NotFound from 'src/pages/NotFound';

const DashboardLayoutRoot = experimentalStyled('div')(
  ({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  })
);

const DashboardLayoutWrapper = experimentalStyled('div')(
  ({ theme }) => ({
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64,
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 256
    }
  })
);

const DashboardLayoutContainer = experimentalStyled('div')({
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden'
});

const DashboardLayoutContent = experimentalStyled('div')({
  flex: '1 1 auto',
  height: '100%',
  overflow: 'auto'
});

const DashboardLayout = () => {
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const navigate = useNavigate();


  return (
    <DashboardLayoutRoot>
      <DashboardNavbar onMobileNavOpen={() => setMobileNavOpen(true)} />
     
      {(localStorage.getItem('role') == 'admin') && <DashboardSidebar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
      />
      || (localStorage.getItem('role') == 'super') && <DashboardSidebar2
      onMobileClose={() => setMobileNavOpen(false)}
      openMobile={isMobileNavOpen}
    /> || localStorage.getItem('role') == '' && <NotFound/> }
      
      <DashboardLayoutWrapper>
        <DashboardLayoutContainer>
          <DashboardLayoutContent>
            <Outlet />
          </DashboardLayoutContent>
        </DashboardLayoutContainer>
      </DashboardLayoutWrapper>
    </DashboardLayoutRoot>
  );
};

export default DashboardLayout;
