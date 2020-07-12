import { Task } from "./task.ts";
import {NotFoundException} from '../util/NotFoundException.ts';

export default class TaskRepository {
  private tasks: Task[];
  private count: number;
  constructor() {
    this.tasks = [];
    this.count = 0;
  }
  getTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: number): Task {
    const task = this.tasks.filter((item) => item.id === id);
    if(task.length) {
      return task[0];
    }
    throw new NotFoundException('no such item');
  }

  addTask(task: Task) {
    task.id = this.count++;
    this.tasks.push(task);
  }

  updateTask(id: number, task: Task) {
    const temp = this.tasks.filter((item) => item.id === id);
    for(let i = 0; i < this.tasks.length; i++) {
      if(this.tasks[i].id === id) {
        this.tasks[i] = {
          ...this.tasks[i],
          ...task,
        };
        return;
      }
    }
    throw new NotFoundException('no such item');
  }

  deleteTask(id: number) {
    const beforeLength = this.tasks.length;
    this.tasks = this.tasks.filter((item) => item.id !== id);
    if (beforeLength === this.tasks.length) {
      throw new NotFoundException('no such item');
    }
  }
}
