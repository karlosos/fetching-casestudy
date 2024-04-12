import { Outlet } from 'react-router-dom';
import { Sidebar } from '../ui/sidebar';
import { IconBrandRedux, IconBrandReact } from '@tabler/icons-react';
import styled from '@emotion/styled';
import { neutral200, neutral50 } from '../ui/colors';

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
  { link: 'useEffect', label: 'Naive useEffect', icon: IconBrandReact },
  { link: 'redux-thunk', label: 'Redux + Thunk', icon: IconBrandRedux },
  { link: 'createAsyncThunk', label: 'Redux + createAsyncThunk', icon: IconBrandRedux },
  { link: 'rtk-query', label: 'Redux + RTKQuery', icon: IconBrandRedux },
  { link: 'rtk-query-queryfn', label: 'Redux + RTKQuery queryfn', icon: IconBrandRedux },
  { link: 'tanstack-query', label: 'Tanstack Query', icon: IconBrandReact },
  { link: 'swr', label: 'swr', icon: IconBrandReact },
];

const AppShell = styled.div`
  display: flex;
  background-color: ${neutral50};
`;

const Main = styled.div`
  border: 1px solid ${neutral200};
  border-radius: 8px;
  margin: 8px;
  background-color: white;
  display: flex;
`;

export default App;
