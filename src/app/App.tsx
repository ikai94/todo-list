import { TodoItems, TodoItemsList } from '../components';
import { ThemeList } from 'src/pages/theme';

import { RouterProvider } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';

function App() {
  const routes = createBrowserRouter([
    {
      path: '/',
      element: <ThemeList />,
    },
    {
      path: '/todos/:id',
      element: <TodoItems />,
      children: [{ index: true, element: <TodoItemsList /> }],
    },
  ]);

  return <RouterProvider router={routes} />;
}

export default App;
