import { ThemeList } from 'src/pages/theme';
import { LoaderFunctionArgs, RouterProvider } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import { TodoItems, TodoItemsList } from 'src/pages/todo';
import { store } from './providers/StoreProvider';
import { fetchTodos } from 'src/pages/todo/model/services/fetchTodos';
import { fetchNameTheme } from 'src/pages/todo/model/services/fetchNameTheme';

function App() {
  const routes = createBrowserRouter([
    {
      path: '/',
      element: <ThemeList />,
    },
    {
      path: '/todos/:id',
      element: <TodoItems />,
      loader: ({ params }: LoaderFunctionArgs) => {
        store.dispatch(fetchTodos({ themeId: Number(params.id) }));
        store.dispatch(fetchNameTheme({ themeId: Number(params.id) }));
        return null;
      },
      children: [{ index: true, element: <TodoItemsList /> }],
    },
  ]);

  return <RouterProvider router={routes} />;
}

export default App;
