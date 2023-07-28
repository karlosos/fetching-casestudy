import { Link, Outlet } from 'react-router-dom';
import styled from 'styled-components/macro';

export function App() {
  return (
    <AppShell>
      <Sidebar>
        <Link to={`useEffect`}>
          <Item>Naive useEffect</Item>
        </Link>
        <Link to={`redux-thunk`}>
          <Item>Redux + Thunk</Item>
        </Link>
        <Link to={`createAsyncThunk`}>
          <Item>Redux + createAsyncThunk</Item>
        </Link>
        <Link to={`rtk-query`}>
          <Item>Redux + RTK Query</Item>
        </Link>
        <Link to={`rtk-query-queryfn`}>
          <Item>Redux + RTK Query queryFn</Item>
        </Link>
        <Link to={`tanstack-query`}>
          <Item>tanstack-query</Item>
        </Link>
        <Link to={`swr`}>
          <Item>swr</Item>
        </Link>
      </Sidebar>
      <Main>
        <Outlet />
      </Main>
    </AppShell>
  );
}

// TODO: based on layout from https://preview.themeforest.net/item/vuexy-vuejs-html-laravel-admin-dashboard-template/full_screen_preview/23328599
// https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/demo-2/dashboards/crm

const AppShell = styled.div`
  display: flex;
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  width: 259px;
  border-inline-end: thin solid rgba(75, 70, 92, 0.12);
  height: 100vh;
  gap: 8px;
  padding-top: 16px;
`;

const Item = styled.div`
  margin-left: 16px;
  margin-right: 16px;
  padding: 4px 8px;
  border-radius: 4px;
  background-color: #eee;

  &:hover {
    background-color: #ddd;
  }
`;

const Main = styled.div``;

export default App;
