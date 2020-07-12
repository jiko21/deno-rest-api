import {Application, Router, RouterContext} from 'https://deno.land/x/oak/mod.ts';
import TaskRepository from '../model/TaskRepository.ts';
import { Task } from '../model/task.ts';
import {NotFoundException} from '../util/NotFoundException.ts';

export const taskController = () => {
  const taskRepository = new TaskRepository();
  const getTasks = (context: RouterContext) => {
    context.response.body = taskRepository.getTasks();
    context.response.status = 200;
  }

  const getTask = (context: RouterContext) => {
    try {
      if (context.params.id === undefined) {
        throw new Error("invalid id");
      }
      const id = parseInt(context.params.id);
      const task = taskRepository.getTaskById(id);
      context.response.body = task;
      context.response.status = 200;
    } catch(e) {
      context.response.body = {
        msg: e.message,
      };
      if (e instanceof NotFoundException) {
        context.response.status = 404;
      } else{
        context.response.status = 500;
      }
    }
  }

  const addTask = async (context: RouterContext) => {
    const body = await context.request.body();
    const task: Task = body.value;
    try {
      taskRepository.addTask(task);
      context.response.body = {
        msg: 'OK',
      };
      context.response.status = 200;
    } catch(e) {
      context.response.body = {
        msg: e.message,
      };
      if (e instanceof NotFoundException) {
        context.response.status = 404;
      } else {
        context.response.status = 500;
      }
    }
  }

  const updateTask = async (context: RouterContext) => {
    try {
      if (context.params.id === undefined) {
        throw new Error("invalid id");
      }
      const id = parseInt(context.params.id);
      const body = await context.request.body();
      const task: Task = body.value;
      taskRepository.updateTask(id, task);
      context.response.status = 200;
      return;
    } catch(e) {
      console.log(e);
      context.response.body = {
        msg: e.message,
      };
      if (e instanceof NotFoundException) {
        context.response.status = 404;
      } else {
        context.response.status = 500;
      }
    }
  }

  const deleteTask = async (context: RouterContext) => {
    try {
      if (context.params.id === undefined) {
        throw new Error("invalid id");
      }
      const id = parseInt(context.params.id);
      taskRepository.deleteTask(id);
      context.response.status = 200;
    } catch(e) {
      context.response.body = {
        msg: e.message,
      };
      if (e instanceof NotFoundException) {
        context.response.status = 404;
      } else {
        context.response.status = 500;
      }
    }
  }
  return {
    getTasks,
    getTask,
    addTask,
    updateTask,
    deleteTask,
  };
}
