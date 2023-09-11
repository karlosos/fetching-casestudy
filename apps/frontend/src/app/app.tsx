import { Outlet } from 'react-router-dom';
import { Sidebar } from '../ui/sidebar';
import {
  IconBrandRedux,
  IconBrandReact,
} from '@tabler/icons-react';
import styled from '@emotion/styled';
import { neutral200 } from '../ui/colors';

export function App() {
  return (
    <AppShell>
      <Sidebar items={data} />
      <Main>
        <Outlet />
      </Main>
    </AppShell>
  );
}

const data = [
  {link: 'useEffect', label: 'Naive useEffect', icon: IconBrandReact},
  {link: 'redux-thunk', label: 'Redux + Thunk', icon: IconBrandRedux},
  {link: 'createAsyncThunk', label: 'Redux + createAsyncThunk', icon: IconBrandRedux},
  {link: 'rtk-query', label: 'Redux + RTKQuery', icon: IconBrandRedux},
  {link: 'rtk-query-queryfn', label: 'Redux + RTKQuery queryfn', icon: IconBrandRedux},
  {link: 'tanstack-query', label: 'Tanstack Query', icon: IconBrandReact},
  {link: 'swr', label: 'swr', icon: IconBrandReact},
];


const AppShell = styled.div`
  display: flex;
`;

const Main = styled.div`
  margin: 8px;
  padding: 8px;
  border: 1px solid ${neutral200};
  border-radius: 8px;
  width: 100%;
  overflow: auto;
  height: calc(100vh - 16px);
`;

export default App;
