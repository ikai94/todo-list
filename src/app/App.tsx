import { ThemeList } from 'src/pages/theme';
import { RouterProvider } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import { TodoItems, TodoItemsList } from 'src/pages/todo';
import { store } from 'src/app/providers/StoreProvider';
import { fetchTodo } from 'src/pages/todo/model/services/fetchTodo.ts';

function App() {
  const routes = createBrowserRouter([
    {
      path: '/',
      element: <ThemeList />,
    },
    {
      path: '/todos/:id',
      element: <TodoItems />,
      loader: ({params}) => {
        store.dispatch(fetchTodo(Number(params.id)))
        return null;
      },
      children: [{ index: true, element: <TodoItemsList /> }],
    },
  ]);

  return <RouterProvider router={routes} />;
}

export default App;
