import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { NotificationNotFound } from './errors/notification-not-found';
import { ReadNotification } from './read-notification';

describe('Read notification', () => {
  const notificationsRepository = new InMemoryNotificationsRepository();
  const readNotification = new ReadNotification(notificationsRepository);

  it('should be able to read a notification', async () => {
    const newNotification = makeNotification();

    await notificationsRepository.create(newNotification);

    await readNotification.execute({ notificationId: newNotification.id });

    expect(notificationsRepository.notifications[0].readAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able read a non existing notification.', async () => {
    expect(() =>
      readNotification.execute({ notificationId: 'fakeId' }),
    ).rejects.toThrow(NotificationNotFound);
  });
});
