import {
  TodoItems,
  TodoItemsList,
  TodoList,
  TodoThemeList,
} from './components';
import { RouterProvider } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';

function App() {
  const routes = createBrowserRouter([
    {
      path: '/',
      element: <TodoThemeList />,
      children: [
        { index: true, element: <TodoList /> },
      ],
    },
    {
      path: '/todos/:id',
      element: <TodoItems />,
      children: [{index: true, element: <TodoItemsList />}]
    },
  ]);

  return <RouterProvider router={routes} />;
}

export default App;
