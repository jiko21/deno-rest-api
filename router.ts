import {Router} from 'https://deno.land/x/oak/mod.ts';
import {taskController} from './controller/todocontroller.ts';

export const routes = (): Router => {
  const router = new Router();
  const controller = taskController();
  router
    .get('/tasks', controller.getTasks)
    .get('/tasks/:id', controller.getTask)
    .post('/tasks', controller.addTask)
    .put('/tasks/:id', controller.updateTask)
    .delete('/tasks/:id', controller.deleteTask);
  return router;
}
