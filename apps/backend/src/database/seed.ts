import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { AppModule } from '../app/app.module';
import { User } from '../app/modules/user/entities/user.entity';
import { Category } from '../app/modules/category/entities/category.entity';
import { Task } from '../app/modules/task/entities/task.entity';
import { TaskPriority, TaskStatus } from '@task-manager/shared';
import { ensureDatabaseExists } from './ensure-database';

const seedDatabase = async () => {
  await ensureDatabaseExists();

  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: ['error', 'warn'],
  });

  try {
    const dataSource = app.get(DataSource);
    const userRepo = dataSource.getRepository(User);
    const categoryRepo = dataSource.getRepository(Category);
    const taskRepo = dataSource.getRepository(Task);

    const existingUsers = await userRepo.count();
    if (existingUsers > 0) {
      console.log('Seed skipped: users already exist.');
      return;
    }

    const [alice, bob] = await userRepo.save([
      userRepo.create({
        email: 'alice@example.com',
        username: 'alice',
        firstName: 'Alice',
        lastName: 'Johnson',
      }),
      userRepo.create({
        email: 'robert@example.com',
        username: 'robert',
        firstName: 'Robert',
        lastName: 'Smith',
      }),
    ]);

    const [workCategory, personalCategory] = await categoryRepo.save([
      categoryRepo.create({
        name: 'Work',
        description: 'Tasks related to the workplace.',
        createdBy: alice.id,
      }),
      categoryRepo.create({
        name: 'Personal',
        description: 'Personal errands and reminders.',
        createdBy: bob.id,
      }),
    ]);

    await taskRepo.save([
      taskRepo.create({
        title: 'Prepare sprint notes',
        description: 'Summarize sprint outcomes and next steps.',
        status: TaskStatus.TODO,
        priority: TaskPriority.HIGH,
        categoryId: workCategory.id,
        dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
        assignedTo: alice.id,
        createdBy: alice.id,
      }),
      taskRepo.create({
        title: 'Organize weekend trip',
        description: 'Confirm travel plans and accommodations.',
        status: TaskStatus.IN_PROGRESS,
        priority: TaskPriority.MEDIUM,
        categoryId: personalCategory.id,
        dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        assignedTo: bob.id,
        createdBy: bob.id,
      }),
      taskRepo.create({
        title: 'Review onboarding checklist',
        description: 'Ensure the new hire has access to all tools.',
        status: TaskStatus.TODO,
        priority: TaskPriority.LOW,
        categoryId: workCategory.id,
        dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 10),
        assignedTo: bob.id,
        createdBy: alice.id,
      }),
    ]);

    console.log('Seed completed.');
  } finally {
    await app.close();
  }
};

seedDatabase().catch((error) => {
  console.error('Seed failed:', error);
  process.exit(1);
});
