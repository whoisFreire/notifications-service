import { Content } from './content';
import { Notification } from './notification';

describe('Notification', () => {
  it('should be able to create a notification', () => {
    const notification = new Notification({
      content: new Content('nova solicitacao'),
      category: 'social',
      recipientId: 'example',
    });

    expect(notification).toBeTruthy();
  });
});
